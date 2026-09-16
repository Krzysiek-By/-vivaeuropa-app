const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];

function norm(v=''){
  return String(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}

function isOrdinaryPublicStation(tags={}){
  const access=norm(tags.access);
  if(access==='private' || access==='no') return false;

  const policeType=norm(tags.police);
  if(['barracks','offices','storage','checkpoint','naval_base','training','academy'].includes(policeType)) return false;

  const hay=norm([
    tags.name,
    tags['name:de'],
    tags.official_name,
    tags.operator,
    tags.description,
    tags.police,
    tags['police:unit']
  ].filter(Boolean).join(' | '));

  const blocked=[
    'bundespolizei','federal police',
    'kriminalpolizei','kriminalamt','kriminalfach','kriminaldienst','criminal police','criminal investigation',
    'bundeskriminalamt','landeskriminalamt','bka','lka',
    'bereitschaftspolizei','riot police',
    'wasserschutzpolizei','water police','river police',
    'verkehrspolizei','traffic police',
    'autobahnpolizei','highway patrol',
    'polizeiprasidium','polizeipraesidium','police headquarters','headquarters',
    'polizeidirektion','police directorate',
    'polizeiakademie','polizeischule','police academy','police school',
    'polizeiverwaltung','police administration',
    'hundestaffel','dog unit','reiterstaffel','mounted police',
    'hubschrauberstaffel','helicopter unit','spezialeinheit','special unit','sek ','mek '
  ];
  return !blocked.some(x=>hay.includes(x));
}

async function fetchOverpass(url,q){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),10000);
  try{
    const r=await fetch(url,{
      method:'POST',
      headers:{
        'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
        'accept':'application/json',
        'user-agent':'VivaEuropa/0.90.54 (public police station search)'
      },
      body:'data='+encodeURIComponent(q),
      signal:ctrl.signal
    });
    if(!r.ok) throw new Error(`Overpass ${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=900');
  const lat=Number(req.query?.lat), lng=Number(req.query?.lng);
  const radiusKm=Math.min(30,Math.max(1,Number(req.query?.radius||5)));
  if(!Number.isFinite(lat)||!Number.isFinite(lng)) return res.status(400).json({error:'invalid_coordinates'});

  const radius=Math.round(radiusKm*1000);
  // Keep this query deliberately simple and aligned with the WC endpoint.
  // Explicit node/way/relation clauses are more portable across Overpass instances than nwr shorthand.
  const q=`[out:json][timeout:18];(node["amenity"="police"](around:${radius},${lat},${lng});way["amenity"="police"](around:${radius},${lat},${lng});relation["amenity"="police"](around:${radius},${lat},${lng}););out center tags 120;`;

  let lastError;
  for(const url of OVERPASS_ENDPOINTS){
    try{
      const data=await fetchOverpass(url,q);
      const seen=new Set();
      const items=(data.elements||[])
        .map(el=>({
          id:`${el.type}/${el.id}`,
          lat:Number(el.lat??el.center?.lat),
          lng:Number(el.lon??el.center?.lon),
          tags:el.tags||{}
        }))
        .filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng))
        .filter(x=>isOrdinaryPublicStation(x.tags))
        .filter(x=>{
          const key=`${x.lat.toFixed(5)},${x.lng.toFixed(5)}:${norm(x.tags.name||'police')}`;
          if(seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      return res.status(200).json({
        source:'OpenStreetMap/Overpass',
        license:'ODbL',
        filter:'ordinary_public_police_stations',
        items
      });
    }catch(err){
      lastError=err;
      console.error('Police Overpass endpoint failed',url,err?.message||err);
    }
  }

  console.error('Police Overpass unavailable',lastError);
  return res.status(502).json({error:'police_source_unavailable'});
}
