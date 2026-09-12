const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function send(res, status, body){
  res.statusCode=status;
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}
function cleanText(value, max=2000){
  return String(value||'').replace(/\s+/g,' ').trim().slice(0,max);
}
function languageName(code){
  return ({pl:'Polish',de:'German',en:'English',fr:'French',it:'Italian',es:'Spanish'})[code] || 'English';
}
async function openAIText(body){
  const lang=languageName(body.language);
  const isSocial=body.action==='social';
  const facts=(isSocial ? [
    `Company name: ${cleanText(body.name,160)}`,
    `Category: ${cleanText(body.category,120)}`,
    `Owner keywords/services: ${cleanText(body.currentDescription,1600)}`
  ] : [
    `Company name: ${cleanText(body.name,160)}`,
    `Category: ${cleanText(body.category,120)}`,
    `City: ${cleanText(body.city,120)}`,
    `Address: ${cleanText(body.address,180)}`,
    `Existing description: ${cleanText(body.currentDescription,1200)}`
  ]).join('\n');

  const instructions=isSocial
    ? `Write a very short profile description for this local business in ${lang}, based only on the owner's supplied services and keywords. Maximum 3 short sentences and maximum 450 characters total. Keep only the most important services. Do NOT include or repeat any street, house number, postal code, city, country, phone number, email, website, opening hours or social-media details. Do not invent services, offers, prices, awards, history or claims. Avoid exaggerated marketing language. Return only the finished profile description.`
    : `Write a concise profile description for this local business in ${lang}. Make it natural, professional and easy to understand. Use only the supplied facts. Do not invent services, prices, awards, history, opening hours or claims. Avoid exaggerated marketing language. Return only the finished description.`;

  const r=await fetch('https://api.openai.com/v1/responses',{
    method:'POST',
    headers:{'Authorization':`Bearer ${OPENAI_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'gpt-5.6-luna',instructions,input:facts,store:false})
  });

  const data=await r.json();
  if(!r.ok) throw new Error(data?.error?.message||'OPENAI_TEXT_ERROR');

  let text='';
  for(const item of data.output||[]){
    if(item.type==='message'){
      for(const content of item.content||[]){
        if(content.type==='output_text') text+=content.text||'';
      }
    }
  }
  return text.trim();
}
async function openAIEnhanceImage(body){
  const match=String(body.imageData||'').match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if(!match) throw new Error('INVALID_IMAGE');

  const mime=match[1];
  const buffer=Buffer.from(match[2],'base64');
  if(buffer.length>9_000_000) throw new Error('IMAGE_TOO_LARGE');

  const ext=mime.includes('png')?'png':'jpg';
  const form=new FormData();
  form.append('model','gpt-image-2.5-flare');
  form.append('image',new Blob([buffer],{type:mime}),`company.${ext}`);
  form.append('quality','medium');
  form.append('size','1536x1024');
  form.append('prompt',
    'Improve this real business photo for a professional local-business directory. '+
    'Preserve the exact real place, products, signage, people, architecture and objects. '+
    'Do not add, remove, redesign or invent anything. Correct only exposure, white balance, '+
    'contrast, mild sharpness, noise and framing. Keep a natural premium photographic look, '+
    'not glossy, not artificial, not overprocessed.'
  );

  const r=await fetch('https://api.openai.com/v1/images/edits',{
    method:'POST',
    headers:{'Authorization':`Bearer ${OPENAI_API_KEY}`},
    body:form
  });

  const data=await r.json();
  if(!r.ok) throw new Error(data?.error?.message||'OPENAI_IMAGE_ERROR');
  const b64=data?.data?.[0]?.b64_json;
  if(!b64) throw new Error('NO_IMAGE_RETURNED');
  return `data:image/png;base64,${b64}`;
}
module.exports = async function handler(req,res){
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  if(!OPENAI_API_KEY) return send(res,503,{code:'AI_NOT_CONFIGURED',error:'AI not configured'});

  const body=req.body || {};
  try{
    if(body.action==='description' || body.action==='social'){
      return send(res,200,{text:await openAIText(body)});
    }
    if(body.action==='enhance_image'){
      return send(res,200,{imageData:await openAIEnhanceImage(body)});
    }
    return send(res,400,{error:'Unknown action'});
  }catch(err){
    console.error('ai-company',err);
    return send(res,500,{error:'AI request failed'});
  }
};
