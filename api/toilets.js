const OVERPASS_ENDPOINTS=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter'];
async function fetchOverpass(url,q){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),5500);
  try{
    const r=await fetch(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8','accept':'application/json','user-agent':'VivaEuropa/0.90.55 (nearby toilets)'},body:'data='+encodeURIComponent(q),signal:ctrl.signal});
    if(!r.ok) throw new Error(`Overpass ${r.status}`);
    return await r.json();
  }finally{clearTimeout(timer);}
}
export default async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=900, stale-while-revalidate=3600');
  const lat=Number(req.query?.lat),lng=Number(req.query?.lng);
  const radiusKm=Math.min(5,Math.max(1,Number(req.query?.radius||5)));
  if(!Number.isFinite(lat)||!Number.isFinite(lng)) return res.status(400).json({error:'invalid_coordinates'});
  const radius=Math.round(radiusKm*1000);
  const q=`[out:json][timeout:10];(node["amenity"="toilets"](around:${radius},${lat},${lng});way["amenity"="toilets"](around:${radius},${lat},${lng});relation["amenity"="toilets"](around:${radius},${lat},${lng}););out center tags 80;`;
  let lastError;
  for(const url of OVERPASS_ENDPOINTS){
    try{
      const data=await fetchOverpass(url,q);
      const seen=new Set();
      const items=(data.elements||[]).map(el=>({id:`${el.type}/${el.id}`,lat:Number(el.lat??el.center?.lat),lng:Number(el.lon??el.center?.lon),tags:el.tags||{}}))
        .filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng)&&!['private','customers'].includes(String(x.tags.access||'').toLowerCase()))
        .filter(x=>{const key=`${x.lat.toFixed(5)},${x.lng.toFixed(5)}`;if(seen.has(key))return false;seen.add(key);return true;});
      return res.status(200).json({source:'OpenStreetMap/Overpass',license:'ODbL',items});
    }catch(e){lastError=e;console.error('Toilet endpoint failed',url,e?.message||e);}
  }
  console.error(lastError);return res.status(502).json({error:'toilet_source_unavailable'});
}
