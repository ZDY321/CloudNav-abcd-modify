const m=t=>{const o=encodeURIComponent(t.model||"gemini-2.5-flash"),e=(t.baseUrl||"https://generativelanguage.googleapis.com/v1beta").replace(/\/$/,"");if(e.includes(":generateContent")){const r=e.includes("?")?"&":"?";return`${e}${r}key=${encodeURIComponent(t.apiKey)}`}return`${e}/models/${o}:generateContent?key=${encodeURIComponent(t.apiKey)}`},h=t=>{var e,r,n;const o=(n=(r=(e=t==null?void 0:t.candidates)==null?void 0:e[0])==null?void 0:r.content)==null?void 0:n.parts;return Array.isArray(o)?o.map(s=>typeof(s==null?void 0:s.text)=="string"?s.text:"").join("").trim():""},c=async(t,o)=>{try{const e=await fetch(m(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:o}]}]})});if(!e.ok){const n=await e.text();return console.error("Gemini API Error:",n),""}const r=await e.json();return h(r)}catch(e){return console.error("Gemini Call Failed",e),""}},u=async(t,o,e)=>{var r,n,s,a;try{let i=t.baseUrl.replace(/\/$/,"");i.includes("/chat/completions")||(i.endsWith("/v1"),i+="/chat/completions");const l=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.apiKey}`},body:JSON.stringify({model:t.model,messages:[{role:"system",content:o},{role:"user",content:e}],temperature:.7})});if(!l.ok){const p=await l.text();return console.error("OpenAI API Error:",p),""}return((a=(s=(n=(r=(await l.json()).choices)==null?void 0:r[0])==null?void 0:n.message)==null?void 0:s.content)==null?void 0:a.trim())||""}catch(i){return console.error("OpenAI Call Failed",i),""}},d=async(t,o,e)=>{if(!e.apiKey)return"请在设置中配置 API Key";const r=`
      Title: ${t}
      URL: ${o}
      Please write a very short description (max 15 words) in Chinese (Simplified) that explains what this website is for. Return ONLY the description text. No quotes.
  `;try{return e.provider==="gemini"?await c(e,`I have a website bookmark. ${r}`)||"无法生成描述":await u(e,"You are a helpful assistant that summarizes website bookmarks.",r)||"生成描述失败"}catch(n){return console.error("AI generation error:",n),"生成描述失败"}},$=async(t,o,e,r)=>{if(!r.apiKey)return null;const n=e.map(a=>`${a.id}: ${a.name}`).join(`
`),s=`
        Website: "${t}" (${o})

        Available Categories:
        ${n}

        Return ONLY the 'id' of the best matching category. If unsure, return 'common'.
    `;try{return r.provider==="gemini"?await c(r,`Task: Categorize this website.
${s}`)||null:await u(r,"You are an intelligent classification assistant. You only output the category ID.",s)||null}catch(a){return console.error(a),null}};export{d as generateLinkDescription,$ as suggestCategory};
