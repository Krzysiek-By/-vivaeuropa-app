const OVERPASS_ENDPOINTS=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter'];
async function fetchOverpass(url,q){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),6500);
  try{
    const r=await fetch(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8','accept':'application/json','user-agent':'VivaEuropa/0.90.60 (quick hospitals)'},body:'data='+encodeURIComponent(q),signal:ctrl.signal});
    if(!r.ok) throw new Error(`Overpass ${r.status}`);
    return await r.json();
  }finally{clearTimeout(timer);}
}
function obviousPrivate(tags={}){
  const access=String(tags.access||'').toLowerCase();
  if(access==='private'||access==='no') return true;
  const ownership=[tags['operator:type'],tags.ownership,tags.operator,tags.name].filter(Boolean).join(' ').toLowerCase();
  return /privatklinik|private hospital|private clinic/.test(ownership);
}
export default async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  const lat=Number(req.query?.lat),lng=Number(req.query?.lng);
  const radiusKm=Math.min(50,Math.max(1,Number(req.query?.radius||10)));
  if(!Number.isFinite(lat)||!Number.isFinite(lng)) return res.status(400).json({error:'invalid_coordinates'});
  const radius=Math.round(radiusKm*1000);
  const q=`[out:json][timeout:12];(node["amenity"="hospital"](around:${radius},${lat},${lng});way["amenity"="hospital"](around:${radius},${lat},${lng});relation["amenity"="hospital"](around:${radius},${lat},${lng});node["healthcare"="hospital"](around:${radius},${lat},${lng});way["healthcare"="hospital"](around:${radius},${lat},${lng});relation["healthcare"="hospital"](around:${radius},${lat},${lng}););out center tags 100;`;
  let lastError;
  for(const url of OVERPASS_ENDPOINTS){
    try{
      const data=await fetchOverpass(url,q);
      const seen=new Set();
      const items=(data.elements||[]).map(el=>({id:`${el.type}/${el.id}`,lat:Number(el.lat??el.center?.lat),lng:Number(el.lon??el.center?.lon),tags:el.tags||{}}))
        .filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng)&&!obviousPrivate(x.tags))
        .filter(x=>{const key=`${x.lat.toFixed(5)},${x.lng.toFixed(5)}`;if(seen.has(key))return false;seen.add(key);return true;});
      return res.status(200).json({source:'OpenStreetMap/Overpass',license:'ODbL',items});
    }catch(e){lastError=e;console.error('Hospital endpoint failed',url,e?.message||e);}
  }
  console.error(lastError);return res.status(502).json({error:'hospital_source_unavailable'});
}
