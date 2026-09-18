const OVERPASS_ENDPOINTS=[
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];

async function fetchOverpass(url,q){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),6500);
  try{
    const r=await fetch(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8','accept':'application/json','user-agent':'VivaEuropa/0.90.78 (public places)'},body:'data='+encodeURIComponent(q),signal:ctrl.signal});
    if(!r.ok) throw new Error(`Overpass ${r.status}`);
    return await r.json();
  }finally{ clearTimeout(timer); }
}

function norm(v=''){ return String(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }

function getQuery(kind,lat,lng,radius){
  const around=`(around:${radius},${lat},${lng})`;
  const map={
    station:`[out:json][timeout:12];(node["railway"="station"]${around};way["railway"="station"]${around};relation["railway"="station"]${around};node["public_transport"="station"]${around};way["public_transport"="station"]${around};relation["public_transport"="station"]${around};);out center tags 100;`,
    bus:`[out:json][timeout:12];(node["amenity"="bus_station"]${around};way["amenity"="bus_station"]${around};relation["amenity"="bus_station"]${around};);out center tags 100;`,
    taxi:`[out:json][timeout:12];(node["amenity"="taxi"]${around};way["amenity"="taxi"]${around};relation["amenity"="taxi"]${around};);out center tags 100;`,
    tourist:`[out:json][timeout:12];(node["tourism"="information"]["information"="office"]${around};way["tourism"="information"]["information"="office"]${around};relation["tourism"="information"]["information"="office"]${around};);out center tags 100;`,
    cityhall:`[out:json][timeout:12];(node["amenity"="townhall"]${around};way["amenity"="townhall"]${around};relation["amenity"="townhall"]${around};node["office"="government"]${around};way["office"="government"]${around};relation["office"="government"]${around};);out center tags 100;`,
    parkride:`[out:json][timeout:12];(node["amenity"="parking"]["park_ride"]${around};way["amenity"="parking"]["park_ride"]${around};relation["amenity"="parking"]["park_ride"]${around};);out center tags 100;`
  };
  return map[kind]||null;
}

function keep(kind,tags={}){
  const access=norm(tags.access);
  if(access==='private' || access==='no') return false;

  if(kind==='station'){
    const railway=norm(tags.railway);
    const station=norm(tags.station);
    if(railway && railway!=='station' && railway!=='halt') return false;
    if(['subway','tram'].includes(station)) return false;
  }
  if(kind==='bus'){
    const name=norm(tags.name||'');
    const amenity=norm(tags.amenity);
    if(amenity!=='bus_station') return false;
    if(name.includes('haltestelle') && !name.includes('zob') && !name.includes('busbahnhof')) return false;
  }
  if(kind==='cityhall'){
    const hay=norm([tags.name,tags.office,tags.government,tags.operator].filter(Boolean).join(' | '));
    if(hay.includes('school') || hay.includes('museum')) return false;
  }
  return true;
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  const lat=Number(req.query?.lat), lng=Number(req.query?.lng);
  const radiusKm=Math.min(30,Math.max(1,Number(req.query?.radius||5)));
  const kind=String(req.query?.kind||'').toLowerCase();
  if(!Number.isFinite(lat)||!Number.isFinite(lng)) return res.status(400).json({error:'invalid_coordinates'});
  const query=getQuery(kind,lat,lng,Math.round(radiusKm*1000));
  if(!query) return res.status(400).json({error:'invalid_kind'});

  let lastError;
  for(const url of OVERPASS_ENDPOINTS){
    try{
      const data=await fetchOverpass(url,query);
      const seen=new Set();
      const items=(data.elements||[])
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
      return res.status(200).json({source:'OpenStreetMap/Overpass',license:'ODbL',kind,items});
    }catch(e){
      lastError=e;
      console.error('Public places endpoint failed',kind,url,e?.message||e);
    }
  }
  console.error('Public places unavailable',kind,lastError);
  return res.status(502).json({error:'public_places_unavailable',kind});
}
