const OVERPASS_ENDPOINTS=[
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];

function norm(v=''){
  return String(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

async function fetchOverpass(url,q){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),6500);
  try{
    const r=await fetch(url,{
      method:'POST',
      headers:{
        'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
        'accept':'application/json',
        'user-agent':'VivaEuropa/0.90.79-R1 (public institutions)'
      },
      body:'data='+encodeURIComponent(q),
      signal:ctrl.signal
    });
    if(!r.ok) throw new Error(`Overpass ${r.status}`);
    return await r.json();
  }finally{
    clearTimeout(timer);
  }
}

function getQuery(kind,lat,lng,radius){
  const around=`(around:${radius},${lat},${lng})`;
  const map={
    station:`[out:json][timeout:10];(node["railway"="station"]${around};way["railway"="station"]${around};relation["railway"="station"]${around};);out center tags 100;`,
    bus:`[out:json][timeout:10];(node["amenity"="bus_station"]${around};way["amenity"="bus_station"]${around};relation["amenity"="bus_station"]${around};);out center tags 100;`,
    taxi:`[out:json][timeout:10];(node["amenity"="taxi"]${around};way["amenity"="taxi"]${around};relation["amenity"="taxi"]${around};);out center tags 100;`,
    tourist:`[out:json][timeout:10];(node["tourism"="information"]["information"="office"]${around};way["tourism"="information"]["information"="office"]${around};relation["tourism"="information"]["information"="office"]${around};);out center tags 100;`,
    cityhall:`[out:json][timeout:10];(node["amenity"="townhall"]${around};way["amenity"="townhall"]${around};relation["amenity"="townhall"]${around};node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};);out center tags 120;`,
    parkride:`[out:json][timeout:10];(node["amenity"="parking"]["park_ride"]${around};way["amenity"="parking"]["park_ride"]${around};relation["amenity"="parking"]["park_ride"]${around};);out center tags 100;`,
    landratsamt:`[out:json][timeout:10];(node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};);out center tags 180;`,
    zulassung:`[out:json][timeout:10];(node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};);out center tags 180;`,
    fuehrerschein:`[out:json][timeout:10];(node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};);out center tags 180;`,
    auslaender:`[out:json][timeout:10];(node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};);out center tags 180;`,
    finanzamt:`[out:json][timeout:10];(node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};);out center tags 180;`,
    jobcenter:`[out:json][timeout:10];(node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};node["office"="employment_agency"]${around};way["office"="employment_agency"]${around};relation["office"="employment_agency"]${around};);out center tags 180;`
  };
  return map[kind]||null;
}

function keep(kind,tags={}){
  const access=norm(tags.access);
  if(access==='private'||access==='no') return false;
  if(kind==='station'){
    const station=norm(tags.station);
    if(['subway','tram'].includes(station)) return false;
  }
  if(kind==='bus'){
    if(norm(tags.amenity)!=='bus_station') return false;
  }
  const hay=norm([tags.name,tags['name:de'],tags.official_name,tags.operator,tags.government,tags.department].filter(Boolean).join(' | '));
  if(kind==='landratsamt' && !/(landratsamt|kreisverwaltung|landkreis)/.test(hay)) return false;
  if(kind==='zulassung' && !/(zulassungsstelle|kfz-zulassung|fahrzeugzulassung|verkehrsamt)/.test(hay)) return false;
  if(kind==='fuehrerschein' && !/(führerscheinstelle|fuehrerscheinstelle|fahrerlaubnis|führerschein|fuehrerschein)/.test(hay)) return false;
  if(kind==='auslaender' && !/(ausländerbehörde|auslaenderbehoerde|ausländeramt|auslaenderamt|migration|aufenthalt)/.test(hay)) return false;
  if(kind==='finanzamt' && !/(finanzamt|steueramt|tax office)/.test(hay)) return false;
  if(kind==='jobcenter' && !/(jobcenter|agentur für arbeit|agentur fuer arbeit|arbeitsagentur|arbeitsamt)/.test(hay) && norm(tags.office)!=='employment_agency') return false;
  return true;
}

function normalizeItems(kind,data){
  const seen=new Set();
  return (data?.elements||[])
    .map(el=>({id:`${el.type}/${el.id}`,lat:Number(el.lat??el.center?.lat),lng:Number(el.lon??el.center?.lon),tags:el.tags||{}}))
    .filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng))
    .filter(x=>keep(kind,x.tags))
    .filter(x=>{
      const label=norm(x.tags.name||x.tags.operator||kind);
      const key=`${x.lat.toFixed(5)},${x.lng.toFixed(5)}:${label}`;
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  const lat=Number(req.query?.lat), lng=Number(req.query?.lng);
  const radiusKm=Math.min(30,Math.max(1,Number(req.query?.radius||5)));
  const kind=String(req.query?.kind||'').toLowerCase();
  if(!Number.isFinite(lat)||!Number.isFinite(lng)) return res.status(400).json({error:'invalid_coordinates'});
  const q=getQuery(kind,lat,lng,Math.round(radiusKm*1000));
  if(!q) return res.status(400).json({error:'invalid_kind'});

  // Ask both mirrors at once. The previous sequential version could exceed the browser timeout
  // before the second mirror got a chance to answer.
  const tasks=OVERPASS_ENDPOINTS.map(async url=>{
    const data=await fetchOverpass(url,q);
    return {url,data,items:normalizeItems(kind,data)};
  });

  try{
    const first=await Promise.any(tasks);
    return res.status(200).json({source:'OpenStreetMap/Overpass',license:'ODbL',kind,mirror:first.url,items:first.items});
  }catch(err){
    console.error('Public places unavailable',kind,err);
    return res.status(502).json({error:'public_places_unavailable',kind});
  }
}
