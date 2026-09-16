export default async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=900');
  const lat=Number(req.query?.lat), lng=Number(req.query?.lng);
  const radiusKm=Math.min(20,Math.max(1,Number(req.query?.radius||5)));
  if(!Number.isFinite(lat)||!Number.isFinite(lng)) return res.status(400).json({error:'invalid_coordinates'});
  const radius=Math.round(radiusKm*1000);
  const q=`[out:json][timeout:18];(node["amenity"="toilets"](around:${radius},${lat},${lng});way["amenity"="toilets"](around:${radius},${lat},${lng});relation["amenity"="toilets"](around:${radius},${lat},${lng}););out center tags 120;`;
  const endpoints=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter'];
  let lastError;
  for(const url of endpoints){
    try{
      const ctrl=new AbortController();
      const timer=setTimeout(()=>ctrl.abort(),10000);
      const r=await fetch(url,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8','user-agent':'VivaEuropa/0.90.50 (prototype WC search)'},body:'data='+encodeURIComponent(q),signal:ctrl.signal});
      clearTimeout(timer);
      if(!r.ok) throw new Error('Overpass '+r.status);
      const data=await r.json();
      const items=(data.elements||[]).map(el=>({
        id:`${el.type}/${el.id}`,
        lat:Number(el.lat??el.center?.lat),
        lng:Number(el.lon??el.center?.lon),
        tags:el.tags||{}
      })).filter(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng)&&!['private','customers'].includes(String(x.tags.access||'').toLowerCase()));
      return res.status(200).json({source:'OpenStreetMap/Overpass',license:'ODbL',items});
    }catch(e){ lastError=e; }
  }
  console.error(lastError);
  return res.status(502).json({error:'toilet_source_unavailable'});
}
