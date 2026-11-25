const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/esm-D6m8ZHtb.js","assets/rolldown-runtime-BWaJ3C7D.js","assets/scan-roll-CAuPyLGP.js","assets/transcribe-B9egfNhk.js","assets/midi-import-Blh9R_MR.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={name:`drumfolio-studio`,version:`0.1.0`,private:!0,type:`module`,scripts:{dev:`vite`,build:`vite build`,sync:`npm run build && cap sync`,test:`node --test tests/*.test.js`,"test:ui":`playwright test`,"test:services":`playwright test --config=playwright.services.config.js`},dependencies:{"@capacitor/android":`^8.6.2`,"@capacitor/app":`^8.1.2`,"@capacitor/browser":`^8.0.5`,"@capacitor/core":`^8.6.2`,"@capacitor/ios":`^8.6.2`,"@fontsource-variable/dm-sans":`^5.3.0`,"@fontsource/ibm-plex-mono":`^5.3.0`,"@revenuecat/purchases-capacitor":`^14.1.2`,"@supabase/supabase-js":`^2.119.2`,"@tonejs/midi":`^2.0.28`,"@vexflow-fonts/bravura":`^1.0.2`,"@wasm-audio-decoders/flac":`0.2.12`,"fft.js":`^4.0.4`,"lucide-static":`^1.79.0`,"onnxruntime-web":`^1.22.0`},devDependencies:{"@capacitor/cli":`^8.6.2`,"@playwright/test":`^1.65.1`,vite:`^8.3.8`}};function t(e){return new Promise((t,n)=>{let r=indexedDB.open(e,1);r.onupgradeneeded=()=>{for(let e of[`scores`,`audio`,`settings`])r.result.createObjectStore(e)},r.onsuccess=()=>t(r.result),r.onerror=()=>n(r.error)})}var n=t(`drumfolio-studio`),r=n,i=null;function a(e){i=e,r=e?t(`drumfolio-studio-user-`+e):n}var o=()=>i;async function s(e,t,n,i=r){let a=await i;return new Promise((r,i)=>{let o=a.transaction(e,t),s=n(o.objectStore(e));o.oncomplete=()=>r(s.result),o.onerror=o.onabort=()=>i(o.error??Error(`Salvataggio interrotto.`))})}function c(e){return e?.bytes instanceof ArrayBuffer?new File([e.bytes],e.name,{type:e.type}):e}async function l(e){return{name:e.name,type:e.type,bytes:await e.arrayBuffer()}}async function u(e,t){let n=await s(e,`readonly`,e=>e.get(t));return e===`audio`?c(n):t===`pending-song`&&n?{...n,file:c(n.file)}:n}function d(e,t){return!i||e.id===`pocket-study`?e:{...e,revision:t?.revision??null,change:crypto.randomUUID()}}function f(e){i&&e?.id!==`pocket-study`&&window.dispatchEvent(new Event(`score-written`))}async function p(e,t){let n=await r;return new Promise((r,i)=>{let a=n.transaction(`scores`,`readwrite`),o=a.objectStore(`scores`),s=o.get(e),c,l;s.onsuccess=()=>{try{c=t(s.result),c&&o.put(c,e)}catch(e){l=e,a.abort()}},a.oncomplete=()=>r(c),a.onabort=a.onerror=()=>i(l??a.error??Error(`Salvataggio interrotto.`))})}var m=e=>e?.change??e?.revision??null;async function h(e,t,n,r){if(e===`scores`){let e=await p(t,e=>{if(r!==void 0&&m(e)!==r)throw Error(`Lo spartito è stato aggiornato. Riaprilo dal repertorio per continuare.`);return d(n,e)});return f(e),e}return e===`audio`&&(n=await l(n)),t===`pending-song`&&(n={...n,file:await l(n.file)}),s(e,`readwrite`,e=>e.put(n,t))}var g=(e,t)=>s(e,`readonly`,e=>e.count(t)).then(e=>e>0),ee=()=>s(`scores`,`readonly`,e=>e.getAll());async function _(e,t){let n=r,i=(await s(`scores`,`readonly`,e=>e.getAll(),n)).filter(({project:e})=>e&&Math.abs(e.duration-t)<.02&&(Number.isInteger(e.first_numbered_bar)||[`aligned`,`manual`,`pickup`].includes(e.bar_source)));if(!i.length)return;let a=await s(`settings`,`readonly`,e=>e.get(`active`),n);i.sort((e,t)=>Number(t.id===a)-Number(e.id===a));let o,l;for(let{id:r,project:u}of i){let i=c(await s(`audio`,`readonly`,e=>e.get(r),n));if(!i||i.size!==e.size)continue;o??=new Uint8Array(await e.arrayBuffer());let d=new Uint8Array(await i.arrayBuffer());if(!o.every((e,t)=>e===d[t]))continue;let{bpm:f,meter:p,bar_times:m,bar_source:h,first_numbered_bar:g}=u,ee={duration:t,bpm:f,meter:p,bar_times:m,bar_source:h,first_numbered_bar:g};if(r===a)return ee;if(l&&JSON.stringify(l)!==JSON.stringify(ee))return;l=ee}return l}function te(){return s(`settings`,`readwrite`,e=>e.delete(`pending-song`))}async function ne(e,t,n,i=!1){let a=await r;return new Promise((r,o)=>{let s=a.transaction([`scores`,`audio`,`settings`],`readwrite`);s.oncomplete=()=>{f(e),r(e)},s.onabort=s.onerror=()=>o(s.error??Error(`Spazio insufficiente per salvare il brano.`));try{let r=s.objectStore(`scores`),a=s.objectStore(`audio`),o=s.objectStore(`settings`);r.add(e,e.id),t&&a.put(t,e.id),n&&a.put(n,[e.id,`drums`]),i||(o.put(e.id,`active`),o.delete(`pending-song`))}catch(e){s.abort(),o(e)}})}async function re(e,t,n){let[r,i]=await Promise.all([l(t),l(n)]);return ne(d(e),r,i)}async function ie(){if(!i)return[];let[e,t]=await Promise.all([s(`scores`,`readonly`,e=>e.getAll(),n),ee()]),r=new Set(t.map(e=>e.id));return e.filter(e=>e.id!==`pocket-study`&&!r.has(e.id))}async function ae(e){if(!i)throw Error(`Accedi per associare uno spartito.`);let[t,r,a]=await Promise.all([s(`scores`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get([e,`drums`]),n)]);if(!t||e===`pocket-study`)throw Error(`Spartito ospite non disponibile.`);return ne(d({id:e,project:t.project}),r,a,!0)}async function oe(e){let t=await r;return new Promise((n,r)=>{let i=t.transaction([`scores`,`audio`],`readwrite`),a=i.objectStore(`scores`),o=i.objectStore(`audio`),s=a.get(e.id),c;s.onsuccess=()=>{let t=s.result;if(t?.revision!==e.revision){if(t?.change===e.revision)a.put({...t,revision:e.revision,change:null},e.id);else{if(t?.change){let n=crypto.randomUUID(),r=(t.project.score_title||t.project.name)+` (copia locale)`;a.add(d({id:n,project:{...t.project,name:r,score_title:r}}),n);for(let t of[!1,!0]){let r=o.get(t?[e.id,`drums`]:e.id);r.onsuccess=()=>{r.result&&o.put(r.result,t?[n,`drums`]:n)}}c=`conflict`}else c=`updated`;a.put({id:e.id,revision:e.revision,change:null,project:{...t?.project,...e.score,rests:e.score.rests,bar_times:e.score.bar_times,bar_source:e.score.bar_source,first_numbered_bar:e.score.first_numbered_bar}},e.id)}}},i.oncomplete=()=>n(c),i.onerror=i.onabort=()=>r(i.error??Error(`Salvataggio interrotto.`))})}var se=Object.assign({"/node_modules/lucide-static/icons/activity.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-activity"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
</svg>
`,"/node_modules/lucide-static/icons/arrow-left.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-arrow-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m12 19-7-7 7-7" />
  <path d="M19 12H5" />
</svg>
`,"/node_modules/lucide-static/icons/audio-lines.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-audio-lines"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 10v3" />
  <path d="M6 6v11" />
  <path d="M10 3v18" />
  <path d="M14 8v7" />
  <path d="M18 5v13" />
  <path d="M22 10v3" />
</svg>
`,"/node_modules/lucide-static/icons/book-open.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-book-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5v16" />
  <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
</svg>
`,"/node_modules/lucide-static/icons/check.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-down.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-chevron-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 9 6 6 6-6" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-left.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-right.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,"/node_modules/lucide-static/icons/chevron-up.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-chevron-up"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m18 15-6-6-6 6" />
</svg>
`,"/node_modules/lucide-static/icons/chevrons-up-down.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-chevrons-up-down"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m7 15 5 5 5-5" />
  <path d="m7 9 5-5 5 5" />
</svg>
`,"/node_modules/lucide-static/icons/circle-user-round.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-circle-user-round"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
  <circle cx="12" cy="11" r="4" />
  <circle cx="12" cy="12" r="10" />
</svg>
`,"/node_modules/lucide-static/icons/cloud-upload.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-cloud-upload"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 13v8" />
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
  <path d="m8 17 4-4 4 4" />
</svg>
`,"/node_modules/lucide-static/icons/crown.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-crown"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
  <path d="M5 21h14" />
</svg>
`,"/node_modules/lucide-static/icons/disc-3.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-disc-3"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
  <circle cx="12" cy="12" r="2" />
  <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
</svg>
`,"/node_modules/lucide-static/icons/download.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-download"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15V3" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="m7 10 5 5 5-5" />
</svg>
`,"/node_modules/lucide-static/icons/drum.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-drum"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m2 2 8 8" />
  <path d="m22 2-8 8" />
  <ellipse cx="12" cy="9" rx="10" ry="5" />
  <path d="M7 13.4v7.9" />
  <path d="M12 14v8" />
  <path d="M17 13.4v7.9" />
  <path d="M2 9v8a10 5 0 0 0 20 0V9" />
</svg>
`,"/node_modules/lucide-static/icons/ellipsis.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-ellipsis"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="1" />
  <circle cx="19" cy="12" r="1" />
  <circle cx="5" cy="12" r="1" />
</svg>
`,"/node_modules/lucide-static/icons/external-link.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-external-link"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="M10 14 21 3" />
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
</svg>
`,"/node_modules/lucide-static/icons/folder-open.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-folder-open"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
</svg>
`,"/node_modules/lucide-static/icons/headphones.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-headphones"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
</svg>
`,"/node_modules/lucide-static/icons/headset.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-headset"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
  <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
</svg>
`,"/node_modules/lucide-static/icons/history.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-history"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
  <path d="M3 3v5h5" />
  <path d="M12 7v5l4 2" />
</svg>
`,"/node_modules/lucide-static/icons/house.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-house"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
</svg>
`,"/node_modules/lucide-static/icons/link-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-link-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
  <line x1="8" x2="16" y1="12" y2="12" />
</svg>
`,"/node_modules/lucide-static/icons/list-music.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-list-music"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 5H3" />
  <path d="M11 12H3" />
  <path d="M11 19H3" />
  <path d="M21 16V5" />
  <circle cx="18" cy="16" r="3" />
</svg>
`,"/node_modules/lucide-static/icons/lock-keyhole.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-lock-keyhole"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="16" r="1" />
  <rect x="3" y="10" width="18" height="12" rx="2" />
  <path d="M7 10V7a5 5 0 0 1 10 0v3" />
</svg>
`,"/node_modules/lucide-static/icons/log-in.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-log-in"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m10 17 5-5-5-5" />
  <path d="M15 12H3" />
  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
</svg>
`,"/node_modules/lucide-static/icons/maximize-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-maximize-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="m21 3-7 7" />
  <path d="m3 21 7-7" />
  <path d="M9 21H3v-6" />
</svg>
`,"/node_modules/lucide-static/icons/mic.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-mic"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 19v3" />
  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
  <rect x="9" y="2" width="6" height="13" rx="3" />
</svg>
`,"/node_modules/lucide-static/icons/music-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-music-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m19 6-5.2-3.9a.5.5 0 0 0-.8.4V18" />
  <circle cx="9" cy="18" r="4" />
</svg>
`,"/node_modules/lucide-static/icons/panel-left.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-panel-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
  <path d="M9 3v18" />
</svg>
`,"/node_modules/lucide-static/icons/pause.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-pause"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="14" y="3" width="5" height="18" rx="1" />
  <rect x="5" y="3" width="5" height="18" rx="1" />
</svg>
`,"/node_modules/lucide-static/icons/pencil-line.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-pencil-line"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13 21h8" />
  <path d="m15 5 4 4" />
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
</svg>
`,"/node_modules/lucide-static/icons/pencil.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`,"/node_modules/lucide-static/icons/play.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-play"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
</svg>
`,"/node_modules/lucide-static/icons/plus.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,"/node_modules/lucide-static/icons/radio.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-radio"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16.247 7.761a6 6 0 0 1 0 8.478" />
  <path d="M19.075 4.933a10 10 0 0 1 0 14.134" />
  <path d="M4.925 19.067a10 10 0 0 1 0-14.134" />
  <path d="M7.753 16.239a6 6 0 0 1 0-8.478" />
  <circle cx="12" cy="12" r="2" />
</svg>
`,"/node_modules/lucide-static/icons/redo-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-redo-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 14 5-5-5-5" />
  <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
</svg>
`,"/node_modules/lucide-static/icons/repeat.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-repeat"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m17 2 4 4-4 4" />
  <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
  <path d="m7 22-4-4 4-4" />
  <path d="M21 13v1a4 4 0 0 1-4 4H3" />
</svg>
`,"/node_modules/lucide-static/icons/search.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg>
`,"/node_modules/lucide-static/icons/settings-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-settings-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 17H5" />
  <path d="M19 7h-9" />
  <circle cx="17" cy="17" r="3" />
  <circle cx="7" cy="7" r="3" />
</svg>
`,"/node_modules/lucide-static/icons/shield.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-shield"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
</svg>
`,"/node_modules/lucide-static/icons/skip-back.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-skip-back"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z" />
  <path d="M3 20V4" />
</svg>
`,"/node_modules/lucide-static/icons/sliders-horizontal.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-sliders-horizontal"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 5H3" />
  <path d="M12 19H3" />
  <path d="M14 3v4" />
  <path d="M16 17v4" />
  <path d="M21 12h-9" />
  <path d="M21 19h-5" />
  <path d="M21 5h-7" />
  <path d="M8 10v4" />
  <path d="M8 12H3" />
</svg>
`,"/node_modules/lucide-static/icons/ticket.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-ticket"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
  <path d="M13 5v2" />
  <path d="M13 17v2" />
  <path d="M13 11v2" />
</svg>
`,"/node_modules/lucide-static/icons/trash-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-trash-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,"/node_modules/lucide-static/icons/undo-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-undo-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9 14 4 9l5-5" />
  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
</svg>
`,"/node_modules/lucide-static/icons/upload.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-upload"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3v12" />
  <path d="m17 8-5-5-5 5" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
</svg>
`,"/node_modules/lucide-static/icons/volume-2.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-volume-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
  <path d="M16 9a5 5 0 0 1 0 6" />
  <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
</svg>
`,"/node_modules/lucide-static/icons/x.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`});function v(e){return se[`/node_modules/lucide-static/icons/`+e+`.svg`]??``}function y(e,t,n,r=``){return`<button id="${e}" class="icon-button ${r}" title="${t}" aria-label="${t}">${v(n)}</button>`}var ce=e=>String(e).padStart(2,`0`),le=e=>Math.floor(e/60)+`:`+ce(Math.floor(e%60)),b=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function ue(){return`<header class="top"><div class="top-inner"><a class="wordmark" href="#repertorio" aria-label="Drumfolio · Home" title="Torna alla Home"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>drumfolio<span>.</span></a>
<div class="modes" hidden aria-label="Modalità"><button id="studio">${v(`sliders-horizontal`)}Studio</button><button id="live">${v(`radio`)}Live</button></div>
<button id="home-account" hidden></button><button id="upgrade" hidden>Drumfolio Plus</button><button id="library" class="icon-button" aria-label="Repertorio" hidden>${v(`folder-open`)}</button></div></header>
<main id="workspace" hidden>
<div class="song"><div class="cover" aria-hidden="true"><i></i><b>df.</b></div><div class="song-name"><span class="eyebrow" id="artist"></span><h1 id="title"></h1><div class="spec"><span id="bpm"></span><i></i><span id="meter"></span><i></i><span id="bar-total"></span></div></div></div>
<section class="score-panel" aria-label="Spartito"><div class="sheet-tools"><div class="sheet-label">${v(`book-open`)}<h2>Spartito</h2></div><button id="score-legend" aria-haspopup="dialog" aria-controls="notation-guide" title="Legenda dello spartito">${v(`list-music`)}<span>Legenda</span></button><div class="bar-tools"><button id="first-bar" aria-pressed="false" aria-controls="bar-placement">Inizio battute</button>${y(`align-bars`,`Allinea battute`,`ellipsis`)}</div><div class="sheet-nav">${y(`previous`,`Pagina precedente`,`chevron-left`)}<span id="page" class="mono"></span>${y(`next`,`Pagina successiva`,`chevron-right`)}</div></div>
<div id="bar-placement" hidden><span role="status">Tocca il rigo dove vuoi l’uno della battuta 1.</span><button id="use-playhead">Usa cursore</button>${y(`cancel-placement`,`Annulla posizionamento`,`x`)}</div>
<div class="score-workbench">
<aside class="inspector editor" aria-label="Strumenti di modifica">
<div class="ins-head"><h3>${v(`sliders-horizontal`)}<span id="ins-title">Modifica</span></h3><button id="edit-toggle" aria-controls="note-details" aria-expanded="false">${v(`sliders-horizontal`)}<span>Modifica</span>${v(`chevron-up`)}</button>
<div class="edit-buttons">${y(`undo`,`Annulla`,`undo-2`)}${y(`redo`,`Ripristina`,`redo-2`)}${y(`remove`,`Elimina colpo`,`trash-2`)}</div></div>
<div class="timing-strip"><label class="timing-input" for="inline-bpm"><span>Tempo · BPM</span><input type="number" min="10" max="500" step="any" inputmode="decimal" id="inline-bpm" title="Tempo dello spartito in BPM"></label><label class="timing-input" for="inline-grid"><span>Griglia</span><select id="inline-grid"><option value="8">1/8</option><option value="16">1/16</option><option value="32">1/32</option></select></label><button id="tempo" aria-label="Modifica tempo in BPM"><span>Tempo</span><strong id="tempo-text"></strong></button><button id="grid"><span>Griglia</span><strong id="grid-text"></strong></button></div>
<div id="note-details" class="notation-editor">
<div class="note-fields"><div class="ins-field"><label for="instrument">Strumento</label><select id="instrument"></select></div>
<div class="ins-field" id="touch-field" hidden><label for="note-touch">Tocco</label><select id="note-touch"><option value="">Normale</option><option value="accent">Accento</option><option value="ghost">Ghost note</option></select></div>
<div class="ins-field"><label for="figure-value">Valore</label><div class="figure-control"><button id="shorter" aria-label="Dimezza il valore" title="Dimezza il valore">−</button><select id="figure-value"></select><button id="longer" aria-label="Raddoppia il valore" title="Raddoppia il valore">+</button></div></div>
<div id="move-field" class="ins-field" hidden><span id="position-title">Posizione</span><div class="step-control">${y(`earlier`,`Anticipa di un passo di griglia`,`chevron-left`)}<output id="note-beat"></output>${y(`later`,`Posticipa di un passo di griglia`,`chevron-right`)}</div></div></div>
<div class="note-actions"><button id="write-rest" aria-pressed="false">Inserisci pausa</button><button id="convert-figure" hidden></button><button id="snare-roll" hidden>Rullata 1/32</button><button id="pickup" hidden aria-label="Usa come levare del 4" title="La battuta 1 inizierà un ottavo dopo questo colpo">Levare del 4</button></div></div></aside>
<div class="paper"><div class="paper-heading"><div><div class="section-meta"><span class="section-rule"></span><span id="section-label"></span></div><h3 id="section-title"></h3></div><div id="paper-meter"></div></div><div id="bars"></div></div>
</div></section>
<div id="drag-label" role="status" hidden></div>
<div class="hint"><span class="hint-dot"></span><span id="hint"></span></div>
</main>
<footer class="transport" hidden><div class="transport-inner"><div class="track-row"><div class="source-switch" role="group" aria-label="Sorgente audio"><button id="original-source" aria-label="Canzone originale" hidden>Originale</button><button id="drums-source" aria-label="Batteria isolata" hidden>Batteria</button><button id="source" aria-label="Altre sorgenti audio">${v(`headphones`)}<span id="source-name">Spartito</span>${v(`chevron-down`)}</button></div><span class="mono"><span id="elapsed">0:00</span><em> / </em><span id="duration"></span></span></div>
<label class="seek"><span class="sr">Posizione nel brano</span><input type="range" id="seek" min="0" step=".01" value="0"></label>
<div class="transport-row"><div class="bar-now"><span class="eyebrow">Battuta</span><strong id="bar-now"></strong></div><div class="play-group">${y(`rewind`,`Torna a inizio battuta`,`skip-back`)}${y(`play`,`Riproduci`,`play`,`play`)}${y(`loop`,`Ripeti battuta`,`repeat`)}</div></div></div></footer>
<main id="section-screen"><p class="page-note" role="status">Apertura del repertorio…</p></main>
<nav id="app-nav" aria-label="Navigazione principale"><div class="nav-inner">
<button data-route="repertorio">${v(`book-open`)}<span>Repertorio</span></button>
<button data-route="supporto">${v(`headset`)}<span>Supporto</span></button>
<button id="new-action" aria-label="Nuova trascrizione"><span>${v(`plus`)}</span></button>
<button data-route="account">${v(`circle-user-round`)}<span>Account</span></button>
<button data-route="altro">${v(`ellipsis`)}<span>Altro</span></button>
</div></nav>
<dialog id="create-sheet" aria-labelledby="create-title"><div class="grip"></div><div class="dialog-head"><h2 id="create-title">Nuova trascrizione</h2>${y(`close-create`,`Chiudi`,`x`)}</div>
<label class="separation-choice" for="separation-mode">Separazione batteria<select id="separation-mode"><option value="fast">Rapida</option><option value="detailed">Approfondita · più lenta</option></select></label>
<button class="file-tile" id="pick-song">${v(`cloud-upload`)}<strong>Scegli un file</strong><small>MP3, WAV, M4A, FLAC, MP4 o MIDI</small></button>
<form id="link-form"><label for="import-url">Importa da un link</label><div class="field-action"><input required type="url" id="import-url" inputmode="url" placeholder="https://…" autocomplete="off"><button aria-label="Apri link" type="submit">${v(`chevron-right`)}</button></div><small>Link audio, YouTube, Instagram o TikTok</small></form>
<button id="record-audio" class="record-row">${v(`mic`)}<span>Registra al microfono</span></button><p id="create-status" role="status"></p>
</dialog>
<dialog id="notation-guide" aria-labelledby="guide-title"><div class="dialog-head"><h2 id="guide-title">Legenda dello spartito</h2>${y(`close-guide`,`Chiudi legenda`,`x`)}</div><div id="guide-switch" role="group" aria-label="Sezione della legenda"><button data-guide="drums">Tamburi</button><button data-guide="cymbals">Piatti</button><button data-guide="signs">Figure e segni</button></div><div id="guide-keys"></div></dialog>
<dialog id="dialog" aria-labelledby="dialog-title"><div class="dialog-head"><h2 id="dialog-title"></h2>${y(`close`,`Chiudi`,`x`)}</div><div id="dialog-body"></div></dialog>
<dialog id="import-progress" aria-labelledby="import-title"><div class="import-symbol">${v(`audio-lines`)}</div>
<span class="eyebrow">Importa brano</span><h2 id="import-title"></h2>
<p id="import-phase" role="status"></p><progress id="import-meter" max="1" value="0"></progress>
<div class="import-foot"><span id="import-detail">Analisi sul dispositivo</span><button id="cancel-import">Annulla</button></div></dialog>
<input type="file" id="song-file" accept="audio/mpeg,.mp3" hidden>
<div id="notice" role="status" aria-live="polite"></div>
<input type="file" id="project-file" accept="*/*" hidden><input type="file" id="audio-file" accept="audio/*,.mp3,.wav,.m4a" hidden>`}var de=[32,16,8,4,2,1],fe=de.flatMap(e=>e>1?[e,e*1.5]:[e]);function pe(e){let t=!de.includes(e),n=t?e/1.5:e;return{base:n,dotted:t,label:`1/`+32/n+(t?` puntato`:``)}}function me(e,t,n){let r=new Map;for(let t of e)r.has(t.tick)||r.set(t.tick,[]),r.get(t.tick).push(t);let i=[...r.keys(),t].sort((e,t)=>e-t),a=[],o=0;for(let e of i)for(;o<e;){let t=r.get(o)??[],i=t.filter(e=>e.hit).map(e=>e.hit),s=t.find(e=>e.rest)?.rest,c=e-o,l=i.length?i.find(e=>e.written)?.written:s?.written,u;l?u=l<=c?l:de.find(e=>e<=c):(u=de.find(e=>e<=c&&o%e===0),i.length&&(u=Math.min(u,n&-n))),a.push({tick:o,value:u,room:c,hits:i,rest:s}),o+=u}return a}var x={kick:[`Cassa`,1],low_tom:[`Tom basso`,3],snare:[`Rullante`,5],mid_tom:[`Tom medio`,6],high_tom:[`Tom alto`,7],ride:[`Ride`,8],hi_hat_closed:[`Hi-hat chiuso`,9],hi_hat_open:[`Hi-hat aperto`,9],crash:[`Crash`,10],unknown:[`Da assegnare`,14]},he=e=>[`hi_hat_closed`,`hi_hat_open`,`crash`,`ride`,`unknown`].includes(e),S=e=>e.instrument?he(e.instrument)?`cymbals`:`drums`:e.voice;function ge(e){if(!e||typeof e.name!=`string`||e.version!==1||!Number.isFinite(e.bpm)||e.bpm<10||e.bpm>500||!Number.isFinite(e.duration)||e.duration<=0||!/^(?:[1-9]|[12]\d|3[0-2])\/(?:2|4|8|16)$/.test(e.meter)||![8,16,32].includes(e.grid??16)||!Array.isArray(e.events)||!Array.isArray(e.automatic))throw Error(`Formato del progetto non valido.`);for(let t of[e.events,e.automatic]){let n=new Set;for(let r of t){if(!r||typeof r.id!=`string`||n.has(r.id)||!Object.hasOwn(x,r.instrument)||!Number.isFinite(r.time)||r.time<0||r.time>e.duration||!Number.isInteger(r.velocity)||r.velocity<1||r.velocity>127||r.written!==void 0&&!fe.includes(r.written)||r.touch!==void 0&&![`accent`,`ghost`].includes(r.touch))throw Error(`Il progetto contiene un colpo non valido.`);n.add(r.id)}}if(e.rests!==void 0){if(!Array.isArray(e.rests))throw Error(`Elenco delle pause non valido.`);let t=new Set(e.events.map(e=>e.id));for(let n of e.rests){if(!n||typeof n.id!=`string`||t.has(n.id)||![`drums`,`cymbals`].includes(n.voice)||!Number.isFinite(n.time)||n.time<0||n.time>=e.duration||!fe.includes(n.written))throw Error(`Il progetto contiene una pausa non valida.`);t.add(n.id)}}if(e.bar_times!==void 0&&(!Array.isArray(e.bar_times)||!e.bar_times.length||e.bar_times.some((t,n,r)=>!Number.isFinite(t)||t<0||t>=e.duration||n&&t<=r[n-1])))throw Error(`Mappa delle battute non valida.`)}function C(e){let[t,n]=e.meter.split(`/`).map(Number),r=32/n,i=t*r,a=32/(e.grid??16),o=e.bar_times??[0],s=i*60/(8*e.bpm),c=o.length>1?o[1]-o[0]:s,l=o.length>1?o.at(-1)-o.at(-2):s,u=Math.ceil(o[0]/c-1e-9),d=[],f=e=>d.push({start:e,length:i});for(let e=0;e<u;e++)f(Math.max(0,o[0]-(u-e)*c));for(o.forEach(f);d.at(-1).start+l<e.duration-1e-8;)f(d.at(-1).start+l);d.forEach((e,t)=>{e.end=d[t+1]?.start??e.start+l}),u&&(d[0].length=Math.max(1,Math.round(i*(d[0].end-d[0].start)/c)));let p=+(d[0].length<i),m=Number.isInteger(e.first_numbered_bar)&&e.first_numbered_bar>=0&&e.first_numbered_bar<d.length?e.first_numbered_bar:e.bar_source===`manual`?u:p;d.forEach((e,t)=>{e.number=t-m+1});function h(e,t){let n=e%a,r=Math.max(0,e-a);return t<=n/2?0:Math.max(0,Math.min(r,n+a*Math.round((t-n)/a)))}function g(e,t=!1){let n=0,r=d.length;for(;n+1<r;){let t=n+r>>1;d[t].start<=e?n=t:r=t}let i=d[n],o=i.length*(e-i.start)/(i.end-i.start);if(!t)return{bar:n,tick:Math.max(0,Math.min(o,i.length))};let s=Math.max(0,i.length-a);return n+1<d.length&&o>=(s+i.length)/2?{bar:n+1,tick:0}:{bar:n,tick:h(i.length,o)}}return{bars:d,at:g,seconds:(e,t)=>d[e].start+(d[e].end-d[e].start)*t/d[e].length,snapTick:h,beat:r,q:a,full:i,firstComplete:p}}function _e(e,t){if(!Number.isFinite(t)||t<10||t>500)throw Error(`Scegli un tempo tra 10 e 500 BPM.`);let n=C(e),r=n.bars.find(e=>e.number===1)?.start??n.bars[n.firstComplete]?.start??0,i={bpm:t,bar_source:`aligned`};if(e.bar_times?.length||r>0){let a=n.bars.filter(e=>e.length===n.full||e.start===r).map(n=>r+(n.start-r)*e.bpm/t).filter(t=>t>=0&&t<e.duration);i.bar_times=a.length?a:[r]}return n.bars.some(e=>e.number===1)&&(i.first_numbered_bar=C({...e,...i}).at(r).bar),i}function ve(e,t,n,r){let{bar:i,tick:a}=e.at(t,!0),o=t=>{let n=e.bars[t].length;return[...new Set(Array.from({length:n},(t,r)=>e.snapTick(n,r)))]},s=o(i),c=s.indexOf(a)+n;if(c<0||c>=s.length){if(i+=n,!e.bars[i])return null;s=o(i),c=n<0?s.length-1:0}let l=e.seconds(i,s[c]);return l<r?l:null}function ye(){let e=60/96,t=[];for(let n=0;n<12;n++){let r=(r,i,a)=>t.push({id:`pocket-`+t.length,time:(4*n+r)*e,instrument:i,velocity:a});for(let e=0;e<8;e++)r(e/2,n%4==0&&!e?`crash`:e===7&&n%3==2?`hi_hat_open`:`hi_hat_closed`,e%2?68:87);for(let e of n%2?[0,1.5,2.5]:[0,2,2.5])r(e,`kick`,104);r(1,`snare`,104),r(3,`snare`,106),n%4==3&&(r(3.5,`high_tom`,88),r(3.75,`low_tom`,96))}return{version:1,name:`Midnight Pocket`,artist:`Drumfolio Sessions`,bpm:96,meter:`4/4`,duration:48*e,grid:16,tracks:{},mode:`stem`,sections:{1:`Groove`,5:`Variazione`,9:`Ripresa`},events:t,automatic:structuredClone(t)}}function be(e,t,{firstBar:n=!1}={}){if(!Number.isFinite(t)||t<0||t>=e.duration)throw Error(`Scegli un punto prima della fine del brano.`);let r=C(e),i=r.bars.slice(r.firstComplete),a=i.length?i:r.bars;return xe(e,a,a.reduce((e,n)=>Math.abs(n.start-t)<Math.abs(e.start-t)?n:e),t,n)}function xe(e,t,n,r,i){let a=r-n.start,o={bar_times:t.map(e=>e===n?r:e.start+a).filter(t=>t>=0&&t<e.duration),bar_source:`aligned`};if(i||Number.isInteger(e.first_numbered_bar)||e.bar_source===`manual`){let t=C({...e,...o}),a=t.at(r).bar;o.first_numbered_bar=i?a:Math.max(0,Math.min(t.bars.length-1,a-n.number+1))}return o}function Se(e,t){if(e.meter!==`4/4`||!Number.isFinite(t)||t<0||t>=e.duration)throw Error(`Seleziona un colpo in una battuta di 4/4.`);let{bars:n,firstComplete:r}=C(e),i=n.slice(r),a=i.map((e,t)=>t?e.start-i[t-1].start:e.end-e.start),o=e=>Math.abs(t-(i[e].start-a[e]/8)),s=i.reduce((e,t,n)=>o(n)<o(e)?n:e,0),c=a[s],l=t+c/8;if(l-c<0){let n=i[s+1],r=n?n.start-i[s].start:240/e.bpm;c=t+r/8+r<e.duration?r:240/e.bpm,l=t+c/8}if(l>=e.duration)throw Error(`Il brano finisce prima dell’uno successivo.`);return{...xe(e,i,i[s],l,!0),bar_source:`pickup`}}function Ce(e,t){if(!Number.isInteger(e.first_numbered_bar)&&e.bar_source!==`manual`)return t;let n=C(e).bars.find(e=>e.number===1)?.start;if(n===void 0)return t;let r={...e,...t,first_numbered_bar:void 0};if(e.bar_source===`pickup`)return{...t,...be(r,n,{firstBar:!0}),bar_source:`pickup`};let{bars:i,full:a}=C(r),o=i.reduce((e,t,r)=>Math.abs(t.start-n)<Math.abs(i[e].start-n)?r:e,0);if([`manual`,`aligned`,`beat-this-aligned`].includes(e.bar_source)){let e=i.map(e=>e.start);o>0&&i[0].length<a&&e.shift();let s=e.indexOf(i[o].start);e[s]=n;let c={...t,bar_times:e,bar_source:`beat-this-aligned`};return{...c,first_numbered_bar:C({...r,...c}).at(n).bar}}return{...t,first_numbered_bar:o}}function we(e,t,n){let r=C(e).at(t).bar;if(!Number.isInteger(n)||n<1||n>r+1)throw Error(`Scegli un numero fra 1 e `+(r+1)+`.`);return r-n+1}var Te=e=>86-x[e][1]*8/2,Ee=(e,t,n,r,i=1)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="currentColor" stroke-width="${i}"/>`,w=(e,t,n,r=32)=>`<text class="musicglyph" x="${e}" y="${t}" font-size="${r}">&#x${n};</text>`,De=[`E4E3`,`E4E4`,`E4E5`,`E4E6`,`E4E7`,`E4E8`],Oe=[`E0A9`,`E0A8`,`E0A7`],ke={hi_hat_closed:Oe,hi_hat_open:[`E0B3`,`E0B2`,`E0B1`],crash:[`E0BE`,`E0BC`,`E0BB`],ride:[`E0DB`,`E0D9`,`E0D8`],unknown:Oe},Ae=[`E0A4`,`E0A3`,`E0A2`],je={kick:`Primo spazio dal basso`,low_tom:`Secondo spazio dal basso`,snare:`Terzo spazio dal basso`,mid_tom:`Quarta linea dal basso`,high_tom:`Quarto spazio dal basso`,ride:`Rombo sulla linea superiore`,hi_hat_closed:`Croce sopra il rigo`,hi_hat_open:`Croce cerchiata sopra il rigo`,crash:`Triangolo con taglio addizionale`,unknown:`Croce arancione da assegnare`};function Me(e,t,n){let r=Te(e),i=(ke[e]??Ae)[n===32?2:+(n===16)];return(e===`crash`?Ee(t-7,r,t+7,r,.75):``)+`<g class="${e===`unknown`?`uncertain`:``}">`+w(t-4.4,r,i)+`</g>`}function Ne(e){let t=(e,t,n,r)=>`<li class="legend-row"><svg viewBox="${r}" aria-hidden="true">${n}</svg><div><b>${e}</b><small>${t}</small></div></li>`,n=Array.from({length:5},(e,t)=>Ee(2,86-t*8,70,86-t*8,.65)).join(``),r=e=>t(x[e][0],je[e],n+Me(e,36,8),`0 23 72 68`),i=[[`drums`,`Tamburi`,[`kick`,`low_tom`,`snare`,`mid_tom`,`high_tom`].map(r)],[`cymbals`,`Piatti e altri segni`,[`hi_hat_closed`,`hi_hat_open`,`crash`,`ride`,`unknown`].map(r)],[`signs`,`Figure e segni`,[...[[`Ottavo · 1/8`,`Un tratto di unione o una bandierina`,`E1D7`],[`Sedicesimo · 1/16`,`Due tratti di unione o due bandierine`,`E1D9`],[`Trentaduesimo · 1/32`,`Tre tratti di unione o tre bandierine`,`E1DB`],[`Pausa di quarto`,`Un quarto di silenzio`,`E4E5`],[`Accento`,`Colpo marcato`,`E4A0`]].map(([e,n,r])=>t(e,n,w(18,33,r,26),`0 0 48 55`)),t(`Ghost note`,`Colpo leggero, indicato tra parentesi`,w(12,33,`E0F5`,26)+w(18,33,`E0A4`,26)+w(27,33,`E0F6`,26),`0 0 48 55`)]]];return(e===`signs`?``:`<p class="key-intro">Conta le linee e gli spazi dal basso verso l’alto.</p>`)+`<div class="key-groups${e?` single`:``}">`+i.filter(([t])=>!e||t===e).map(([,t,n])=>`<section>${e?``:`<h3>`+t+`</h3>`}<ul>${n.join(``)}</ul></section>`).join(``)+`</div>`}function Pe(e,t,n,r,i){let a=t.bars[e],o=a.length,s=e=>33+e*307/o,c=``,l=``,u=``,d=``;for(let e=0;e<5;e++)c+=Ee(2,86-e*8,348,86-e*8,.72);c+=Ee(2,54,2,86)+Ee(348,54,348,86),c+=w(4,70,`E069`,26);let f=[[],[]],p=[];for(let e of n)f[Number(S(e.hit??e.rest)===`cymbals`)].push(e);let m=f.filter(e=>e.length).length,h=Number(i.split(`/`)[0])*t.beat,g=m===0&&o===h;g&&(c+=w(s(o/2)-4,62,`E4E3`,28));for(let e=0;e<2&&!g;e++){if(!f[e].length&&(m||e))continue;let n=e===1,i=n?1:-1,a=me(f[e],o,t.beat),d=m<2||f[e].some(e=>e.rest||e.hit?.written),h=m<2?70:n?46:94;for(let e of a){let t=s(e.tick),{base:i,dotted:a}=pe(e.value);if((e.rest||!e.hits.length)&&(e.rest&&(p.push({x:t,y:h,rest:e.rest,value:e.value,room:e.room}),e.rest.id===r&&(c+=`<circle cx="${t}" cy="${h}" r="8.3" class="focus-note"/>`)),d&&(c+=w(t-2,h,De[de.indexOf(i)],28),a&&(c+=w(t+8,h,`E1E7`,20))),!e.hits.length))continue;let o=e.hits.map(e=>Te(e.instrument));e.stemX=t+(n?4.3:-4.2),e.top=n?Math.min(...o)-23:Math.max(...o)+22,e.start=n?Math.max(...o):Math.min(...o),e.flags=Math.max(0,Math.log2(8/i));for(let n of e.hits){let o=Te(n.instrument);p.push({x:t,y:o,hit:n,value:e.value,room:e.room}),n.id===r&&(u+=`<circle cx="${t}" cy="${o}" r="8.3" class="focus-note"/>`),u+=Me(n.instrument,t,i),a&&(u+=w(t+(n.touch===`ghost`?12:7),o,`E1E7`,20)),n.touch===`ghost`&&(u+=w(t-9,o,`E0F5`,26)+w(t+6,o,`E0F6`,26))}e.hits.some(e=>e.touch===`accent`)&&(u+=w(t-4,n?e.top-4:e.top+8,`E4A0`,22))}for(let e=0;e<a.length;){let r=a[e];if(!r.hits.length||r.value>=32){e++;continue}let o=e;for(;r.flags&&o+1<a.length&&a[o+1].flags&&Math.floor(a[o+1].tick/t.beat)===Math.floor(r.tick/t.beat);)o++;let s=a.slice(e,o+1),c=(n?Math.min:Math.max)(...s.map(e=>e.top));for(let e=0;e<s.length;e++){let t=s[e];if(l+=Ee(t.stemX,t.start,t.stemX,c,1.1),s.length===1&&t.flags)l+=w(t.stemX,c,(57920+2*(t.flags-1)+ +!n).toString(16),28);else for(let n=0;n<t.flags;n++){let r=c+i*n*3.8;s[e+1]?.flags>n?l+=Ee(t.stemX,r,s[e+1].stemX,r,2.8):s[e-1]?.flags>n||(l+=Ee(t.stemX,r,t.stemX+(e?-5:5),r,2.8))}}e=o+1}}for(let e=0;e<o;e++){let n=e+h-o;n%t.beat===0&&(d+=`<text x="${s(e)}" y="129" class="beat">${1+n/t.beat}</text>`)}return{targets:p,html:`<svg class="staff" data-bar="${e}" viewBox="0 0 350 139" role="img" aria-label="${a.number>0?`Battuta `+a.number:o<h?`Anacrusi`:`Intro`}${g?`, pausa di battuta`:``}">${c}${l}${u}${d}<g class="cursor" visibility="hidden"><line y1="20" y2="114"/><circle cy="20" r="2.8"/></g></svg>`}}var Fe;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(Fe||={});var Ie=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},Le=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,Re=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?Le(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new Ie(`"${e}" plugin is not implemented on ${c}`,Fe.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new Ie(`"${e}.${t}()" is not implemented on ${c}`,Fe.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),ee=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},_=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?ee:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=_,l.set(e,{name:e,proxy:_,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),_},n.Exception=Ie,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},ze=(e=>e.Capacitor=Re(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),Be=ze.registerPlugin,Ve=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new ze.Exception(e,Fe.Unimplemented)}unavailable(e=`not available`){return new ze.Exception(e,Fe.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},He=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ue=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),We=class extends Ve{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=Ue(n).trim(),r=Ue(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=He(e.key),n=He(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};Be(`CapacitorCookies`,{web:()=>new We});var Ge=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),Ke=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},qe=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,Je=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=Ke(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},Ye=class extends Ve{async request(e){let t=Je(e,e.webFetchExtra),n=qe(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await Ge(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};Be(`CapacitorHttp`,{web:()=>new Ye});var Xe;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(Xe||={});var Ze;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(Ze||={});var Qe=class extends Ve{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};Be(`SystemBars`,{web:()=>new Qe});var $e=`modulepreload`,et=function(e){return`/drumfolio-beta/`+e},tt={},nt=function(e){return e.pathname.endsWith(`.css`)},rt=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},T=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=et(t,n);let r=s(t),i=nt(r);return rt(tt,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:$e,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},it=Be(`App`,{web:()=>T(()=>import(`./web-Ctesplnh.js`).then(e=>new e.AppWeb),[])}),at=Be(`Browser`,{web:()=>T(()=>import(`./web-JmvF72bJ.js`).then(e=>new e.BrowserWeb),[])}),ot={BASE_URL:`/drumfolio-beta/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1,VITE_SUPABASE_PUBLISHABLE_KEY:`sb_publishable_TEyTU3tuJHc9kGNAHSJOhg_AJdzNgss`,VITE_SUPABASE_URL:`https://eskaigregmpgljwkhtph.supabase.co`},st=!!(ot.VITE_SUPABASE_URL&&ot.VITE_SUPABASE_PUBLISHABLE_KEY),ct=ze.isNativePlatform(),lt={ios:ot.VITE_RC_IOS_KEY,android:ot.VITE_RC_ANDROID_KEY}[ze.getPlatform()],ut=!!(ct&&lt),E=!ct,dt=ct?`drumfolio://auth/callback`:location.origin+location.pathname,ft,pt,mt,ht;async function gt(){if(!st)throw Error(`L’accesso online sarà disponibile dopo la configurazione del servizio.`);return pt??=T(async()=>{let{createClient:e}=await import(`./dist-DwhOg3L3.js`);return{createClient:e}},[]).then(({createClient:e})=>e(ot.VITE_SUPABASE_URL,ot.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`,detectSessionInUrl:!ct}})),ft=await pt,ft}async function _t(){return(await gt()).auth}async function vt(){if(!E||!st)return null;let{data:e,error:t}=await(await _t()).getSession();if(t)throw t;return e.session?.user??null}async function yt(e,t){if(!st)return;let n=await _t();if(n.onAuthStateChange((t,n)=>setTimeout(()=>e(n?.user??null),0)),!ct)return;async function r(e){let r=new URL(e);if(r.protocol!==`drumfolio:`||r.host!==`auth`||r.pathname!==`/callback`)return;let i=r.searchParams.get(`code`);if(i&&i!==ht){ht=i;try{let{error:e}=await n.exchangeCodeForSession(i);if(e)throw e}catch(e){ht=null,t(e)}finally{await at.close().catch(()=>{})}}}await it.addListener(`appUrlOpen`,({url:e})=>r(e).catch(t));let i=await it.getLaunchUrl();i?.url&&await r(i.url)}async function bt(e,t,n){let r=await _t();if(e===`google`||e===`apple`){let{data:t,error:n}=await r.signInWithOAuth({provider:e,options:{redirectTo:dt,skipBrowserRedirect:ct}});if(n)throw n;ct&&await at.open({url:t.url});return}let i;if(i=e===`register`?await r.signUp({email:t,password:n,options:{emailRedirectTo:dt}}):e===`password`?await r.updateUser({password:n}):await r.signInWithPassword({email:t,password:n}),i.error)throw i.error;return i.data}async function xt(){let{error:e}=await(await _t()).signOut({scope:`local`});if(e)throw e}async function St(e){if(!ut)throw Error(`Lo store non è attivo in questa versione.`);mt||=(async()=>{let e=await T(()=>import(`./esm-D6m8ZHtb.js`).then(e=>e.t),__vite__mapDeps([0,1]));return await e.Purchases.configure({apiKey:lt}),e})().catch(e=>{throw mt=null,e});let t=await mt,n=t.Purchases,r=await n.getAppUserID();return e&&r.appUserID!==e.id?await n.logIn({appUserID:e.id}):!e&&!(await n.isAnonymous()).isAnonymous&&await n.logOut(),t}async function Ct(e){if(!ut)return{active:!1,credits:null,packages:[]};let{Purchases:t}=await St(e),[{customerInfo:n},r,i]=await Promise.all([t.getCustomerInfo(),t.getOfferings(),t.getVirtualCurrencies().then(({virtualCurrencies:e})=>Object.values(e.all)).catch(()=>null)]);return{active:!!n.entitlements.active[ot.VITE_RC_ENTITLEMENT||`plus`],credits:i,packages:r.current?.availablePackages??[]}}async function wt(e,t){await(await St(e)).Purchases.purchasePackage({aPackage:t})}async function Tt(e){await(await St(e)).Purchases.restorePurchases()}async function Et(e){let{error:t}=await(await _t()).updateUser({data:{display_name:e}});if(t)throw t}async function Dt(e,t){let n=ot.VITE_MEDIA_RESOLVER_URL;if(!n||!st)return null;let r=new URL(n);if(r.protocol!==`https:`&&!(r.protocol===`http:`&&[`localhost`,`127.0.0.1`].includes(r.hostname)))throw Error(`Il servizio per i link richiede HTTPS.`);let{data:i,error:a}=await(await _t()).getSession();if(a)throw a;if(!i.session)return null;let o=await fetch(r,{method:`POST`,signal:t,redirect:`error`,credentials:`omit`,headers:{"Content-Type":`application/json`,Authorization:`Bearer `+i.session.access_token},body:JSON.stringify({url:e.href})});if(!o.ok)throw Error(`Il servizio non ha potuto leggere questo post.`);let s=decodeURIComponent(o.headers.get(`X-Audio-Title`)||`Audio dal post`);return new File([await o.blob()],s+`.m4a`,{type:`audio/mp4`})}function Ot(e){ge(e);let t=e=>typeof e==`string`?e.slice(0,500):void 0,n=e=>e.map(({id:e,time:t,instrument:n,velocity:r,written:i,touch:a})=>({id:e,time:t,instrument:n,velocity:r,written:i,touch:a}));return{version:1,name:t(e.name),score_title:t(e.score_title),artist:t(e.artist),bpm:e.bpm,meter:e.meter,duration:e.duration,grid:e.grid??16,bar_times:e.bar_times,bar_source:t(e.bar_source),first_numbered_bar:Number.isInteger(e.first_numbered_bar)?e.first_numbered_bar:void 0,sections:e.sections?Object.fromEntries(Object.entries(e.sections).filter(([e,t])=>/^\d+$/.test(e)&&typeof t==`string`).map(([e,n])=>[e,t(n)])):void 0,events:n(e.events),automatic:n(e.automatic),rests:e.rests?.map(({id:e,time:t,voice:n,written:r})=>({id:e,time:t,voice:n,written:r}))}}var kt,At=!1,jt,Mt=``;function Nt(e){Mt=e,window.dispatchEvent(new Event(`sync-status`))}function Pt(e=800){o()&&(clearTimeout(jt),jt=setTimeout(Lt,e))}function Ft(e){if(e.error)throw e.error;return e.data}async function It(){let e=o(),t=await gt(),n=()=>t.from(`drumfolio_scores`),r=await ee(),i=new Map(r.map(e=>[e.id,e])),a=new Set,s=new Map;for(let t=0;;t+=250){let r=Ft(await n().select(`id,revision`).eq(`owner_id`,e).order(`id`).range(t,t+249));for(let e of r)s.set(e.id,e.revision);if(r.length<250)break}for(let[e,t]of s){let n=i.get(e);t!==n?.revision&&t!==n?.change&&a.add(e)}for(let t of r)if(t.change&&!a.has(t.id)){if(s.get(t.id)!==t.change){let r={score:Ot(t.project),revision:t.change};if(t.revision){if(Ft(await n().update(r).eq(`owner_id`,e).eq(`id`,t.id).eq(`revision`,t.revision).select(`id`)).length===0){a.add(t.id);continue}}else{let i=await n().insert({...r,id:t.id,owner_id:e});if(i.error?.code===`23505`){a.add(t.id);continue}Ft(i)}}await p(t.id,e=>{if(e&&e.revision===t.revision)return{...e,revision:t.change,change:e.change===t.change?null:e.change}})}for(let t of a){let r=Ft(await n().select(`id,score,revision`).eq(`owner_id`,e).eq(`id`,t).single());ge(r.score);let i=await oe(r);i===`conflict`&&(At=!0,window.dispatchEvent(new Event(`score-conflict`))),i&&window.dispatchEvent(new CustomEvent(`remote-score`,{detail:t}))}}function Lt(){if(!o())return;if(kt)return At=!0,kt;let e=async()=>{do At=!1,await It();while(At);Nt(`Spartiti sincronizzati`)};return Nt(`Sincronizzazione in corso…`),kt=Promise.resolve().then(()=>navigator.locks?navigator.locks.request(`drumfolio-sync-`+o(),e):e()).catch(()=>Nt(`Sincronizzazione in attesa. Le modifiche sono salvate sul dispositivo.`)).finally(()=>{kt=null}),kt}function Rt(){o()&&(window.addEventListener(`score-written`,()=>Pt()),window.addEventListener(`online`,()=>Pt(0)),document.addEventListener(`visibilitychange`,()=>{document.hidden||Pt(0)}),setInterval(()=>{!document.hidden&&navigator.onLine&&Pt(0)},6e4),Lt())}var D=(e,t,n,r=``)=>`<button class="menu-row" data-act="${b(e)}"><i>${v(t)}</i><span><strong>${b(n)}</strong>${r?`<small>`+b(r)+`</small>`:``}</span>${v(`chevron-right`)}</button>`,zt=(e,t=``)=>`<div class="page-head"><h1>${b(e)}</h1>${t?`<p>`+b(t)+`</p>`:``}</div>`,O=(e,t)=>`<section class="section-group"><h2>${b(e)}</h2><div class="section-card">${t}</div></section>`,Bt=(e,t)=>`<button class="mint-button" data-act="${e}">${b(t)}</button>`,Vt=(e,t)=>`<details><summary>${b(e)}${v(`chevron-down`)}</summary><p>${b(t)}</p></details>`,Ht=[[`Come scrivo una rullata in trentaduesimi?`,`Durante l’importazione Drumfolio cerca le sequenze di rullante al tempo del brano e scrive i colpi riconosciuti in 1/32. Per inserire una rullata a mano, seleziona il primo colpo di rullante, tocca Rullata 1/32, indica il numero di colpi e scegli Scrivi rullata. Quattro colpi occupano un ottavo, otto occupano un quarto. Se hai la batteria isolata sul dispositivo puoi anche rilevare la sequenza e applicare la proposta. Annulla ripristina sia i colpi sia la griglia.`],[`Come importo un brano?`,`Tocca il +, scegli un file da File o Download e tieni Drumfolio in primo piano. La batteria viene separata sul dispositivo. Al termine si apre lo spartito.`],[`Come correggo un colpo?`,`In Studio tocca la nota e scegli lo strumento, oppure trascinala. Vicino al dito compare il nome e senti il suono quando cambi strumento. Per passare da hi-hat aperto a chiuso, che condividono la posizione, usa Strumento. Con un doppio tocco aggiungi un colpo. Con il cestino lo elimini.`],[`Come scrivo durate e pause?`,`Seleziona una nota e cambia Valore, oppure dimezzalo o raddoppialo con − e +. I colpi simultanei con lo stesso gambo condividono la durata. Puoi scegliere anche un valore puntato o cambiare il tocco in accento o ghost note. Per scrivere una pausa tocca Inserisci pausa, scegli il valore e tocca il rigo nella voce dei tamburi o dei piatti. Seleziona una pausa scritta per cambiarla, eliminarla o trasformarla in un colpo. Annulla e Ripristina sono sotto lo spartito.`],[`Come scelgo l’inizio della battuta 1?`,`In Studio tocca Inizio battute e poi il punto sul rigo dove senti l’uno. Per usare la posizione del player, scegli Usa cursore. Se il brano inizia sul levare del 4, seleziona quel colpo e tocca Usa come levare del 4. La battuta 1 inizierà un ottavo dopo. Con Annulla recuperi la griglia precedente.`],[`Come ascolto soltanto la batteria?`,`Nel player tocca la sorgente audio e scegli Batteria isolata. Per confrontarla con la trascrizione scegli Suoni dello spartito.`],[`Come suono con la modalità Live?`,`Apri un brano, tocca Live e avvia il player. Il cursore segue il tempo. Il pulsante con le due frecce mette in loop la battuta corrente.`],[`Dove sono i miei brani?`,`Da ospite i brani restano sul dispositivo. Nella beta web, accedendo con Google puoi sincronizzare spartiti e correzioni. Originale e batteria isolata restano sul dispositivo.`],[`Posso usare il link di un post?`,`Incolla il link nella nuova trascrizione. Per YouTube, Instagram e TikTok scegli anche il file del post. Drumfolio conserva il riferimento accanto al brano.`]],Ut=new Set([`studio`,`repertorio`,`supporto`,`account`,`altro`,`accesso`,`registrazione`,`profilo`,`plus`,`legenda`,`licenze`,`password`,`numerazione`]);function Wt(t){let n=document.getElementById(`section-screen`),r=document.getElementById(`app-nav`),i=e=>document.getElementById(e),a=`repertorio`,s=`repertorio`,c=0,l=t.user,d=null,f=null,p=!1;function m(){let e=location.hash.slice(1);return!Ut.has(e)||[`studio`,`numerazione`].includes(e)&&!t.active()?`repertorio`:e}function g(e){m()===e?he():location.hash=e}function _(e){t.notify(e?.message||`Operazione interrotta.`)}async function ne(){let e=l?`profile:`+l.id:`profile:guest`,t=await u(`settings`,e);return t||(t={id:l?.id??crypto.randomUUID(),name:``},await h(`settings`,e,t)),t}let re=()=>d?.name||l?.user_metadata?.display_name||l?.email||`Musicista ospite`;function oe(){let e=[`accesso`,`registrazione`,`profilo`,`password`,`plus`].includes(a)?`account`:[`legenda`,`licenze`,`numerazione`].includes(a)?`altro`:a;r.querySelectorAll(`[data-route]`).forEach(t=>{t.dataset.route===e?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)})}function se(e){let n=e.project,r=n.artist||n.name.split(` - `).slice(0,-1).join(` - `),i=n.score_title||n.name.split(` - `).at(-1),a=[r,le(n.duration),Math.round(n.bpm)+` BPM`].filter(Boolean).join(` · `);return`<button class="song-row" data-score="${b(e.id)}"><i class="record-disc">${v(`disc-3`)}</i><span><strong>${b(i)}</strong><small>${b(a)}</small></span>${e.id===t.active()?`<b class="open-dot" title="Spartito aperto"></b>`:v(`chevron-right`)}</button>`}async function y(){let[e,t]=await Promise.all([ee(),u(`settings`,`pending-song`)]),n=e.filter(e=>e.id!==`pocket-study`).sort((e,t)=>e.project.name.localeCompare(t.project.name,`it`)),r=`<section class="home-hero"><div class="home-hero-content"><h1>${n.length?`Nuova trascrizione`:`Il tuo primo brano`}</h1>
      <p>Importa una canzone per ottenere lo spartito modificabile della batteria.</p>
      <button class="home-upload" data-act="new">${v(`upload`)}Carica un brano</button></div></section>`,i=n.length?`<div class="section-card">${n.map(se).join(``)}</div>`:`<div class="home-empty">${v(`folder-open`)}<div><strong>Nessun brano salvato</strong><p>${l&&E?`Qui ritrovi anche gli spartiti sincronizzati.`:`I brani che importi vengono salvati su questo dispositivo.`}</p></div></div>`;return r+(t?O(`Importazione incompleta`,D(`resume`,`history`,`Riprendi importazione`,t.file.name)+D(`discard`,`trash-2`,`Scarta importazione incompleta`)):``)+`<section aria-labelledby="home-songs"><div class="catalog-title"><h2 id="home-songs">Il tuo repertorio</h2>${n.length?`<span>`+n.length+`</span>`:``}</div>${i}</section>
      <div class="home-shortcuts">${D(`project`,`folder-open`,`Apri un progetto`,`File .drums`)}${D(`demo`,`headphones`,`Prova una demo`,`Midnight Pocket`)}</div>`}function ce(){return zt(`Supporto`,`Guida a Drumfolio Studio`)+O(`Domande frequenti`,Ht.map(([e,t])=>Vt(e,t)).join(``))+D(`legenda`,`book-open`,`Legenda dello spartito`)}async function ue(){d=await ne();let e=re();return zt(`Account`)+`<div class="profile-card"><div class="avatar">${b(e.trim().slice(0,1).toUpperCase())}</div><h2>${b(e)}</h2><p>${b(l?.email||`Profilo su questo dispositivo`)}</p><small>ID · ${b(d.id)}</small>${Bt(`profilo`,`Modifica profilo`)}</div>`+(l?``:O(`Accesso`,D(`accesso`,`log-in`,`Accedi o registrati`)))+(E?``:O(`Crediti e abbonamento`,`<div id="balance" class="balance" aria-live="polite">${ut?`Caricamento saldo…`:`Trascrizione locale inclusa`}</div>`+D(`plus`,`ticket`,`Drumfolio Plus`,`Piani e ripristino acquisti`)))+(E&&l?await fe():``)+(l?O(`Gestione account`,(E?``:D(`password`,`lock-keyhole`,`Cambia password`))+D(`logout`,`log-in`,`Esci dall’account`)):``)}let de=e=>`<strong>${e.active?`Drumfolio Plus`:`Piano Studio`}</strong>${e.credits===null?`<p>Saldo crediti temporaneamente non disponibile.</p>`:e.credits.map(e=>`<p>`+b(e.name)+` · `+b(e.balance)+`</p>`).join(``)}`;async function fe(){let e=(await ie()).map(e=>D(`adopt-`+e.id,`cloud-upload`,e.project.score_title||e.project.name,`Copia nel mio account`)).join(``);return O(`Sincronizzazione`,`<p class="page-note" id="sync-status" role="status">${b(Mt||`Spartiti e correzioni nel tuo account`)}</p>`+D(`sync`,`cloud-upload`,`Sincronizza ora`,`MP3 e batteria isolata restano sul dispositivo`))+(e?O(`Scegli uno spartito ospite da copiare`,e):``)}function pe(){if(E)return`<div class="login-image"></div>`+zt(`Accedi a Drumfolio`,`Ritrova spartiti e correzioni sui tuoi dispositivi.`)+`<div class="providers"><button data-act="google" `+(st?``:`disabled`)+`>Continua con Google</button></div>`+(st?``:`<p class="page-note">Accesso Google non configurato in questa anteprima.</p>`)+`<div class="end-actions">`+Bt(`repertorio`,`Continua come ospite`)+`</div>`;let e=a===`registrazione`,t=a===`password`,n=st?``:` disabled`;return`<div class="login-image"></div>`+zt(t?`Cambia password`:e?`Crea un account`:`Accedi a Drumfolio`)+(st?``:`<div class="guest-access"><p>Il profilo ospite è disponibile su questo dispositivo. L’accesso online richiede il collegamento del servizio account.</p>`+Bt(`repertorio`,`Continua come ospite`)+`</div>`)+`<form class="account-form" id="auth-form">${t?``:`<label>Email<input name="email" type="email" autocomplete="email" required`+n+`></label>`}<label>${t?`Nuova password`:`Password`}<input name="password" type="password" autocomplete="${e||t?`new-password`:`current-password`}" ${e||t?`minlength="8"`:``} required${n}></label><button class="mint-button" ${n}>${t?`Salva password`:e?`Crea account`:`Accedi`}</button></form>`+(t?``:`<div class="providers"><button data-act="google"${n}>Continua con Google</button><button data-act="apple"${n}>Continua con Apple</button></div>`)+(t?``:`<div class="end-actions"><button data-act="${e?`accesso`:`registrazione`}">${e?`Ho già un account`:`Registrati`}</button>${st?`<button data-act="repertorio">Continua come ospite</button>`:``}</div>`)}async function me(){if(a===`repertorio`)return y();if(a===`supporto`)return ce();if(a===`account`)return ue();if([`accesso`,`registrazione`,`password`].includes(a))return pe();if(a===`profilo`)return d=await ne(),zt(`Modifica profilo`)+`<form id="profile-form" class="account-form"><label>Nome visualizzato<input name="name" required maxlength="60" value="${b(d.name||l?.user_metadata?.display_name||``)}" placeholder="Il tuo nome"></label><button class="mint-button">Salva profilo</button></form>`;if(a===`plus`&&E)return ue();if(a===`plus`)return zt(`Drumfolio Plus`)+O(`Abbonamento`,`<div id="offers" class="balance" role="status">`+(ut?`Caricamento piani…`:`Gli acquisti saranno disponibili con la distribuzione sugli store. Le trascrizioni locali sono già incluse.`)+`</div>`)+`<button class="secondary-btn" data-act="restore" ${ut?``:`disabled`}>${v(`history`)}Ripristina acquisti</button>`;if(a===`numerazione`){let e=t.barInfo();return zt(`Numera la battuta`,`Il cursore si trova nella battuta che inizia a `+e.time.toFixed(2).replace(`.`,`,`)+` s.`)+`<form id="bar-form" class="account-form"><label>Numero di battuta<input name="bar" type="number" inputmode="numeric" min="1" max="${e.max}" step="1" value="${Math.max(1,e.number)}" required></label><p class="page-note">La numerazione automatica conta anche le battute intere di pausa. Puoi scegliere qui un primo numero diverso.</p><button class="mint-button">Applica allo spartito</button></form><button class="secondary-btn reset-count" data-act="auto-bars">Conta tutte le battute intere</button>`}if(a===`legenda`)return zt(`Legenda dello spartito`)+Ne();if(a===`licenze`){let e=await fetch(`/drumfolio-beta/third-party.txt`);if(!e.ok)throw Error(`Licenze non disponibili.`);return zt(`Licenze`)+`<pre class="licenses">`+b(await e.text())+`</pre>`}let n=``;try{let e=new URL(t.sourceLink());e.protocol===`https:`&&!e.username&&!e.password&&(n=O(`Fonte del brano`,`<a class="source-link" target="_blank" rel="noopener noreferrer" href="`+b(e.href)+`">`+b(e.hostname)+` `+v(`external-link`)+`</a>`))}catch{}return zt(`Altro`)+n+O(`Studio`,(t.active()?D(`numerazione`,`list-music`,`Numera la battuta al cursore`):``)+D(`legenda`,`drum`,`Legenda dello spartito`)+D(`project`,`folder-open`,`Apri progetto .drums`)+D(`supporto`,`headset`,`Supporto`))+O(`Drumfolio`,(E?``:D(`plus`,`ticket`,`Piani e acquisti`))+D(`licenze`,`book-open`,`Licenze software`))+(E?`<p class="page-note"><a href="/drumfolio-beta/privacy.html">Privacy della beta</a></p>`:``)+`<p class="page-note">Drumfolio Studio · `+b(e.version)+`</p>`}async function x(e){try{let t=await Ct(l);if(e!==c)return;f=t,a===`account`&&(i(`balance`).innerHTML=de(t)),a===`plus`&&(i(`offers`).innerHTML=de(t)+(t.packages.length?t.packages.map((e,t)=>D(`buy-`+t,`ticket`,e.product.title,e.product.priceString)).join(``):`<p>Nessun piano disponibile nello store.</p>`))}catch{e===c&&((i(`balance`)||i(`offers`)).textContent=`Store irraggiungibile. Riapri questa sezione per riprovare.`)}}async function he(){let e=++c;a=m();let r=a===`studio`;r||t.pause(),document.body.classList.toggle(`section-open`,!r),document.body.classList.toggle(`studio-open`,r),i(`workspace`).hidden=!r,n.hidden=r,document.querySelector(`.transport`).hidden=!r,document.querySelector(`.modes`).hidden=!r;let o=a===`repertorio`;(o||r)&&(s=a),document.body.classList.toggle(`home-open`,o),i(`home-account`).hidden=!o,i(`home-account`).innerHTML=v(`circle-user-round`)+(l?`Il mio account`:`Accedi`),i(`library`).hidden=o;let u=r?`Torna alla Home`:s===`studio`?`Torna allo spartito`:`Torna al repertorio`;if(i(`library`).setAttribute(`aria-label`,u),i(`library`).title=u,i(`library`).classList.toggle(`home-link`,r),i(`library`).innerHTML=r?v(`house`)+`<span>Home</span>`:v(`arrow-left`),i(`upgrade`).hidden=E||r||a===`plus`,oe(),window.scrollTo(0,0),r)n.replaceChildren();else{n.setAttribute(`aria-busy`,`true`),n.replaceChildren();try{let t=await me();if(e!==c)return;n.innerHTML=t+`<p id="page-status" class="page-note" role="status"></p>`,ut&&[`account`,`plus`].includes(a)&&x(e)}catch(t){e===c&&(n.textContent=t.message)}finally{e===c&&n.removeAttribute(`aria-busy`)}}}let S=e=>{i(`page-status`)?i(`page-status`).textContent=e:t.notify(e)};async function ge(e){if(Ut.has(e))g(e);else if(e===`sync`)await Lt(),await he();else if(e.startsWith(`adopt-`)&&l)await ae(e.slice(6)),await he();else if(e===`auto-bars`)await t.numberBar(null);else if(e===`demo`)await t.openDemo();else if(e===`new`)t.create();else if(e===`file`)i(`song-file`).click();else if(e===`project`)i(`project-file`).click();else if(e===`resume`){let e=await u(`settings`,`pending-song`);e&&await t.resume(e)}else if(e===`discard`)await te(),await he();else if(e===`login`||e===`google`||e===`apple`)await bt(e);else if(e===`logout`)await xt(),g(`account`);else if(e===`restore`||e.startsWith(`buy-`)){if(p)return;p=!0;try{e===`restore`?await Tt(l):await wt(l,f.packages[Number(e.slice(4))]),await he(),S(e===`restore`?`Verifica acquisti completata.`:`Acquisto completato.`)}finally{p=!1}}}return r.onclick=e=>{let n=e.target.closest(`button`);n&&(n.id===`new-action`?t.create():g(n.dataset.route))},n.onclick=e=>{let n=e.target.closest(`button`);n&&(n.dataset.score?u(`scores`,n.dataset.score).then(e=>t.open(e)).catch(_):n.dataset.act&&ge(n.dataset.act).catch(e=>S(e.message)))},n.onsubmit=async e=>{if(e.preventDefault(),p)return;p=!0;let n=e.target,r=new FormData(n),i=n.querySelector(`button[type=submit],.mint-button`);i.disabled=!0;try{if(n.id===`bar-form`)await t.numberBar(Number(r.get(`bar`)));else if(n.id===`profile-form`){let e=String(r.get(`name`)).trim();if(!e)throw Error(`Inserisci un nome.`);l&&await Et(e),await h(`settings`,l?`profile:`+l.id:`profile:guest`,{...d,name:e}),g(`account`)}else{let e=a===`registrazione`,t=await bt(a===`password`?`password`:e?`register`:`login`,r.get(`email`),r.get(`password`));e&&!t?.session?S(`Controlla la tua email per confermare la registrazione.`):g(`account`)}}catch(e){S(e.message)}finally{p=!1,i.disabled=!1}},i(`upgrade`).onclick=()=>g(`plus`),i(`home-account`).onclick=()=>g(l?`account`:`accesso`),i(`library`).onclick=()=>g(a===`studio`?`repertorio`:s),window.addEventListener(`hashchange`,he),ze.getPlatform()===`android`&&it.addListener(`backButton`,()=>{let e=document.querySelector(`dialog[open]`);if(e){let t=new Event(`cancel`,{cancelable:!0});e.dispatchEvent(t)&&e.close()}else a===`repertorio`?it.minimizeApp():g([`registrazione`,`profilo`,`plus`,`password`].includes(a)?`account`:`repertorio`)}),yt(e=>{let n=l?.id!==e?.id||l?.email!==e?.email||l?.user_metadata?.display_name!==e?.user_metadata?.display_name;E&&(e?.id??null)!==o()?(document.body.inert=!0,t.pause(),location.replace(location.pathname+location.search+`#account`),location.reload()):(l=e,e&&[`accesso`,`registrazione`].includes(a)?g(`account`):n&&a!==`studio`&&he())},_).catch(_),window.addEventListener(`sync-status`,()=>{i(`sync-status`)&&(i(`sync-status`).textContent=Mt)}),window.addEventListener(`remote-score`,()=>{a===`repertorio`&&he()}),{go:g,render:he}}var Gt=`audio/*,video/mp4,.mp3,.wav,.m4a,.aac,.flac,.ogg,.webm,.mp4,.mid,.midi`;function Kt(e){return/(^|\.)(youtube\.com|youtu\.be|instagram\.com|tiktok\.com)$/.test(e.hostname.toLowerCase())}function qt(e){let t;try{t=new URL(e.trim())}catch{throw Error(`Inserisci un collegamento HTTPS completo.`)}if(t.protocol!==`https:`||t.username||t.password)throw Error(`Usa un collegamento HTTPS pubblico.`);return t}async function Jt(e,t){let n=await fetch(e,{signal:t,credentials:`omit`,referrerPolicy:`no-referrer`});if(!n.ok)throw Error(`Il link non ha restituito un file audio.`);let r=n.headers.get(`Content-Type`)?.split(`;`)[0]??``;if(r.startsWith(`text/`)||r===`application/json`)throw Error(`Il link apre una pagina. Abbina il file audio per trascriverlo.`);let i=decodeURIComponent(e.pathname.split(`/`).pop()||`Audio da link`);return new File([await n.blob()],i,{type:r})}async function Yt(){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error(`Il microfono non è accessibile. Puoi importare una registrazione dai File.`);let e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),t=()=>e.getTracks().forEach(e=>e.stop());try{let n=[`audio/mp4`,`audio/webm;codecs=opus`,`audio/ogg;codecs=opus`].find(e=>MediaRecorder.isTypeSupported(e)),r=new MediaRecorder(e,n?{mimeType:n}:{}),i=[],a=new Promise((e,a)=>{r.ondataavailable=e=>{e.data.size&&i.push(e.data)},r.onstop=()=>{t();let a=r.mimeType||i[0]?.type||n||`audio/mp4`,o=a.includes(`webm`)?`webm`:a.includes(`ogg`)?`ogg`:`m4a`,s=new Date().toISOString().slice(0,19).replace(`T`,` `).replaceAll(`:`,`-`);e(new File(i,`Registrazione `+s+`.`+o,{type:a}))},r.onerror=()=>{t(),a(Error(`La registrazione è stata interrotta.`))}});return r.start(1e3),{result:a,stop(){r.state===`inactive`?t():r.stop()}}}catch(e){throw t(),e}}function Xt({importFile:e,pause:t}){let n=e=>document.getElementById(e),r=n(`create-sheet`),i=n(`create-status`),a=n(`song-file`),o,s,c,l,u=0,d=n(`record-audio`),f=n(`pick-song`);a.accept=Gt;function p(e){n(`separation-mode`).disabled=e,f.disabled=e,n(`link-form`).querySelector(`button`).disabled=e,n(`import-url`).disabled=e}function m(){r.open&&r.close()}function h(){u++,o&&=(o.stop(),null),clearInterval(s),c?.abort(),c=null,l=null,n(`separation-mode`).value=`fast`,p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`,n(`link-form`).reset(),i.textContent=``,f.querySelector(`strong`).textContent=`Scegli un file`}function g(){r.open||(t(),h(),r.showModal())}function ee(e){i.textContent=e.name===`NotAllowedError`?`Consenti il microfono nelle impostazioni di Drumfolio.`:e.message||`Operazione interrotta.`}async function _(t,r){let i=n(`separation-mode`).value;m(),await e(t,r,i)}return r.addEventListener(`close`,h),r.onclick=e=>{if(e.target===r){let t=r.getBoundingClientRect();(e.clientY<t.top||e.clientX<t.left||e.clientX>t.right)&&m()}},n(`close-create`).onclick=m,f.onclick=()=>a.click(),a.onchange=async e=>{let t=e.target.files[0];a.value=``,t&&await _(t,l)},n(`import-url`).oninput=()=>{l=null,f.querySelector(`strong`).textContent=`Scegli un file`,i.textContent=``},n(`link-form`).onsubmit=async e=>{e.preventDefault();let t=u;try{let e=qt(n(`import-url`).value);l=e.href,p(!0),d.disabled=!0,i.textContent=`Lettura del link…`,c=new AbortController;let r=Kt(e);r&&(f.querySelector(`strong`).textContent=`Abbina il file del post`);let a=r?await Dt(e,c.signal):await Jt(e,c.signal);if(!a){i.textContent=`Collega il file audio o video del post. Il link verrà salvato insieme allo spartito.`;return}t===u&&await _(a,e.href)}catch(e){t===u&&e.name!==`AbortError`&&(i.textContent=(e instanceof TypeError?`Il sito non consente di scaricare il file da questo link.`:e.message)+` Puoi scegliere il file dal dispositivo.`)}finally{t===u&&(p(!1),d.disabled=!1)}},d.onclick=async()=>{if(o){d.disabled=!0,o.stop();return}let e=u;p(!0),d.disabled=!0;try{let t=await Yt();if(e!==u){t.stop(),await t.result;return}o=t,d.disabled=!1,d.classList.add(`recording`);let n=Date.now(),r=()=>{d.querySelector(`span`).textContent=`Termina e trascrivi · `+le((Date.now()-n)/1e3)};r(),s=setInterval(r,300),i.textContent=`Registrazione in corso`;let a=await t.result;e===u&&await _(a)}catch(t){e===u&&ee(t)}finally{e===u&&(o=null,clearInterval(s),p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`)}},g}var Zt=e=>e===`snare`||e.endsWith(`_tom`)||e===`unknown`;function Qt(e,t){let n=e.bars[e.at(t).bar];return(n.end-n.start)/n.length}function $t(e,t,n){let r=[],i=[];for(let a of e){if(i.length){let e=i.at(-1),o=Qt(t,e.time);Math.abs(a.time-e.time-o)>o*.22&&(i.length>=n&&r.push(i),i=[])}i.push(a)}return i.length>=n&&r.push(i),r}function en(e,t){return $t(e.filter(e=>e.instrument===`snare`).sort((e,t)=>e.time-t.time),t,3)}function tn(e,t,n){let r=e.events.find(e=>e.id===t&&e.instrument===`snare`);if(!r||!Number.isInteger(n)||n<2||n>32)throw Error(`Seleziona il primo rullante e scegli da 2 a 32 colpi.`);let i=C({...e,grid:32}),{bar:a,tick:o}=i.at(r.time,!0),s=r.time-i.seconds(a,o),c=[];for(let t=0;t<n;t++){if(!i.bars[a])throw Error(`La rullata supera la fine del brano.`);let t=i.seconds(a,o)+s;if(t>=e.duration)throw Error(`La rullata supera la fine del brano.`);c.push({time:t,velocity:r.velocity}),++o===i.bars[a].length&&(a++,o=0)}return rn(e,i,c,!1)}function nn(e,t){return rn(e,C({...e,grid:32}),t,!0)}function rn(e,t,n,r){let i=0,a=t.bars.map(e=>{let t=i;return i+=e.length,t}),o=e=>{let n=t.at(e,!0);return a[n.bar]+n.tick},s=new Map,c=[],l=new Set,u=new Map(e.events.map(e=>[e.id,e])),d=new Map;for(let t of[...e.events,...e.rests??[]]){if(S(t)!==`drums`)continue;let e=o(t.time);for(let n=e;n<e+(t.written||1);n++)d.has(n)||d.set(n,[]),d.get(n).push(t)}for(let i of n){let n=o(i.time);if(l.has(n))throw Error(`Due attacchi cadono nella stessa posizione. Verifica l’allineamento della battuta.`);l.add(n);let a=d.get(n)??[],f=a.find(e=>e.instrument===`snare`&&o(e.time)===n);if(!f&&r){let r=Qt(t,i.time)*.31,a=e.automatic.filter(e=>Zt(e.instrument)&&Math.abs(e.time-i.time)<r).sort((e,t)=>Math.abs(e.time-i.time)-Math.abs(t.time-i.time))[0];if(a&&(f=u.get(a.id),!f||f.instrument!==a.instrument||f.time!==a.time||o(f.time)!==n))throw Error(`Qui c’è una correzione manuale. Scegli il numero di colpi per scrivere la rullata.`)}for(let e of a){if(e.voice)throw Error(`La rullata incontra una pausa scritta. Accorciala o eliminala prima di continuare.`);if(e.written>1&&e.id!==f?.id&&!s.has(e.id))throw Error(`La rullata incontra una figura lunga nella stessa voce. Accorciala prima di continuare.`)}f?s.set(f.id,{...f,instrument:`snare`,written:1}):c.push({id:crypto.randomUUID(),instrument:`snare`,time:i.time,velocity:i.velocity,written:1})}return e.events.map(e=>s.get(e.id)??e).concat(c)}async function an(e,t){let n=await e.arrayBuffer(),r=n.byteLength>=4&&new DataView(n).getUint32(0)===1716281667;try{return await t.decodeAudioData(r?n.slice(0):n)}catch(e){if(!r)throw e}let{FLACDecoder:i}=await T(async()=>{let{FLACDecoder:e}=await import(`./flac-BqfAJ19Z.js`);return{FLACDecoder:e}},[]),a=new i;await a.ready;try{let{channelData:e,sampleRate:r,samplesDecoded:i,errors:o}=await a.decodeFile(new Uint8Array(n));if(!i||o.length)throw Error(`File FLAC incompleto.`);let s=t.createBuffer(e.length,i,r);if(e.forEach((e,t)=>s.copyToChannel(e,t)),r===t.sampleRate)return s;let c=Math.ceil(i*t.sampleRate/r),l=new OfflineAudioContext(e.length,c,t.sampleRate),u=l.createBufferSource();return u.buffer=s,u.connect(l.destination),u.start(),await l.startRendering()}finally{a.free()}}var k,on,sn,cn=0,ln=0,un=[],dn=0,fn,pn=new Set,A=()=>k&&j()?k.currentTime-cn:ln,j=()=>fn!==void 0;async function mn(e=!0){k??=new AudioContext,await k.resume(),e&&(on??=Promise.all(Object.keys(x).filter(e=>e!==`unknown`).map(async e=>{let t=await fetch(`/drumfolio-beta/sounds/`+e+`.wav`);if(!t.ok)throw Error(`Campione audio non disponibile.`);return[e,await k.decodeAudioData(await t.arrayBuffer())]})).then(Object.fromEntries).catch(e=>{throw on=null,e}),sn=await on)}function hn(e,t,n){if(!sn?.[e])return;let r=k.createBufferSource(),i=k.createGain();r.buffer=sn[e],i.gain.value=n*.7,r.connect(i).connect(k.destination),pn.add(r),r.onended=()=>{pn.delete(r),i.disconnect()},r.start(t)}var gn=0;function _n(){gn++}function vn(e){return e===`ghost`?.38:e===`accent`?1.3:1}async function yn(e,t){let n=++gn;await mn(),n===gn&&hn(e,k.currentTime,.8*vn(t))}async function bn(e){return await mn(!1),an(e,k)}function xn(){j()&&(ln=A()),fn=void 0;for(let e of pn)e.stop();pn.clear()}function Sn(e){xn(),ln=e}function Cn(e,t,n){if(xn(),ln=t,cn=k.currentTime-t,fn=n??null,un=e.filter(e=>e.time>=t-.001).sort((e,t)=>e.time-t.time),dn=0,n&&t<n.duration){let e=k.createBufferSource();e.buffer=n,e.connect(k.destination),pn.add(e),e.onended=()=>pn.delete(e),e.start(0,t)}}function wn(e){if(!j()||fn)return;let t=Math.min(e,A()+.12);for(;dn<un.length&&un[dn].time<t;){let e=un[dn++];hn(e.instrument,Math.max(k.currentTime,cn+e.time),e.velocity/127*vn(e.touch))}}var M=e=>document.getElementById(e);M(`app`).innerHTML=ue();var Tn=Object.keys(x),En=matchMedia(`(min-width:760px)`);M(`instrument`).innerHTML=Tn.map(e=>`<option value="${e}">${x[e][0]}</option>`).join(``);var Dn=null,On,N,P,F,kn,I=0,L=null,R=!1,z=null,An=null,B=``,V=!1,jn=!1,Mn=[],Nn=[],Pn=new Map,H=null,Fn=null,In,Ln=0,Rn=null,zn=!1,Bn=!1,Vn=!1,Hn=-1,Un=Promise.resolve(),Wn,Gn=new Map,Kn=matchMedia(`(max-width:759px) and (orientation:portrait) and (max-height:600px)`),qn=matchMedia(`(orientation:landscape) and (max-height:550px)`),U=()=>Kn.matches?1:R||qn.matches?2:En.matches?4:2,Jn=e=>F.bars[e].number>0?ce(F.bars[e].number):F.bars[e].length<F.full?`Lev.`:`Intro`,W=()=>N.events.find(e=>e.id===L),Yn=()=>N.rests?.find(e=>e.id===L),G=!1,Xn=0;M(`figure-value`).innerHTML=`<option value="0">Auto</option>`+[...fe].sort((e,t)=>t-e).map(e=>`<option value="${e}">${pe(e).label}</option>`).join(``);var Zn=()=>F.at(A()).bar,Qn=()=>V?An:null;function K(e){clearTimeout(In),M(`notice`).textContent=e,In=setTimeout(()=>M(`notice`).textContent=``,3800)}function q(e){K(e.message||`Operazione interrotta`)}function J(e){return(...t)=>Promise.resolve().then(()=>e(...t)).catch(q)}function $n(){F=C(N),kn=F.bars.map(()=>[]);for(let e of N.events){let t=F.at(e.time,!0);kn[t.bar].push({hit:e,tick:t.tick})}for(let e of N.rests??[]){let t=F.at(e.time,!0);kn[t.bar].push({rest:e,tick:t.tick})}}function er(e){document.querySelector(`.inspector`).classList.toggle(`expanded`,e),M(`edit-toggle`).setAttribute(`aria-expanded`,String(e))}M(`edit-toggle`).onclick=()=>er(M(`edit-toggle`).getAttribute(`aria-expanded`)!==`true`);function tr(e){for(let t of M(`guide-switch`).children)t.setAttribute(`aria-pressed`,String(e===t.dataset.guide));M(`guide-keys`).innerHTML=Ne(e)}M(`guide-switch`).onclick=e=>{let t=e.target.closest(`[data-guide]`);t&&tr(t.dataset.guide)},M(`score-legend`).onclick=()=>{X(),tr(Yn()?`signs`:W()&&S(W())===`cymbals`?`cymbals`:`drums`),M(`notation-guide`).showModal()},M(`notation-guide`).onclose=()=>M(`guide-keys`).replaceChildren(),M(`close-guide`).onclick=()=>M(`notation-guide`).close(),M(`notation-guide`).onclick=e=>{if(e.target===M(`notation-guide`)){let t=e.target.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&e.target.close()}};function Y(){let e=U(),t=Math.min(F.bars.length,I+e),n=Zn();document.body.classList.toggle(`live`,R),M(`live`).setAttribute(`aria-pressed`,String(R)),M(`studio`).setAttribute(`aria-pressed`,String(!R));let r=N.name.indexOf(` - `);M(`title`).textContent=N.score_title||(r>0?N.name.slice(r+3):N.name),M(`artist`).textContent=N.artist||(r>0?N.name.slice(0,r):`Repertorio personale`),M(`bpm`).textContent=Number(N.bpm.toFixed(1)).toLocaleString(`it`)+` BPM`,M(`meter`).textContent=N.meter,M(`bar-total`).textContent=F.bars.length-F.bars.filter(e=>e.number<=0).length+` battute`,M(`page`).textContent=Math.floor(I/e)+1+` / `+Math.ceil(F.bars.length/e),M(`previous`).disabled=I===0,M(`next`).disabled=t===F.bars.length;let i=Object.entries(N.sections??{}).filter(([e])=>Number(e)<=F.bars[I].number).sort(([e],[t])=>Number(t)-Number(e))[0];M(`section-label`).textContent=R?`MODALITÀ LIVE`:`BATTUTE `+Jn(I)+` — `+Jn(t-1),M(`section-title`).textContent=R?`Battuta `+Jn(n):i?.[1]||`Batteria`,M(`paper-meter`).textContent=N.meter,Pn=new Map;let a=[];for(let e=I;e<t;e++){let t=Pe(e,F,kn[e],R?null:L,N.meter);Pn.set(e,t.targets),a.push(`<div class="measure" data-measure="${e}"><div class="measure-meta"><span class="index">${Jn(e)}</span></div>${t.html}</div>`)}M(`bars`).innerHTML=a.join(``);for(let e of M(`bars`).querySelectorAll(`.staff`))if(!R)for(let t of Pn.get(+e.dataset.bar)){let n=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);for(let[e,r]of Object.entries({cx:t.x,cy:t.y,r:7,fill:`transparent`}))n.setAttribute(e,r);n.style.touchAction=`none`,e.append(n)}M(`duration`).textContent=le(N.duration),document.querySelector(`.bar-tools`).hidden=R,M(`original-source`).hidden=!B&&!zn,M(`drums-source`).hidden=!zn,M(`original-source`).setAttribute(`aria-pressed`,String(V&&!jn)),M(`drums-source`).setAttribute(`aria-pressed`,String(V&&jn)),document.querySelector(`.source-switch`).classList.toggle(`has-audio`,!!(B||zn)),M(`source-name`).textContent=V?jn?`Batteria isolata`:B:`Suoni dello spartito`,M(`seek`).max=N.duration,document.activeElement!==M(`inline-bpm`)&&(M(`inline-bpm`).value=Number(N.bpm.toFixed(2))),M(`inline-grid`).value=N.grid??16,M(`tempo-text`).textContent=Number(N.bpm.toFixed(1)).toLocaleString(`it`)+` BPM`,M(`grid-text`).textContent=`1/`+(N.grid??16),M(`undo`).disabled=!Mn.length,M(`redo`).disabled=!Nn.length;let o=W(),s=Yn(),c=o??s;if(M(`ins-title`).textContent=s?`Pausa`:o?`Nota selezionata`:`Modifica`,M(`move-field`).hidden=!c,c){let{bar:e,tick:t}=F.at(c.time,!0),n=1+Math.floor((F.full-F.bars[e].length+t)/F.beat),r=(F.full-F.bars[e].length+t)%F.beat,i=F.beat===8?{0:``,2:` e`,4:` &`,6:` a`}[r]:void 0;M(`position-title`).textContent=`Pos. · batt. `+Jn(e),M(`note-beat`).textContent=n+(i??(r?`+`+r+`/32`:``)),M(`note-beat`).title=`Battuta `+Jn(e)+`, movimento `+n+(r?`, più `+r+` trentaduesimi`:``),M(`earlier`).disabled=ve(F,c.time,-1,N.duration)===null,M(`later`).disabled=ve(F,c.time,1,N.duration)===null}M(`snare-roll`).hidden=R||o?.instrument!==`snare`,M(`remove`).disabled=!c,M(`remove`).setAttribute(`aria-label`,s?`Elimina pausa`:`Elimina colpo`),M(`remove`).title=s?`Elimina pausa`:`Elimina colpo`,M(`pickup`).hidden=R||!o||N.meter!==`4/4`,o&&(M(`instrument`).value=o.instrument),M(`hint`).textContent=G?`Tocca il rigo nella voce della pausa: tamburi in basso, piatti in alto.`:s?`Pausa · Scegli il valore o lo strumento da inserire.`:o?x[o.instrument][0]+` · `+je[o.instrument].toLocaleLowerCase(`it`)+` · Trascina per spostare il colpo.`:`Tocca un colpo per selezionarlo. Doppio tocco sul rigo per inserirlo.`,fr(c),M(`loop`).setAttribute(`aria-pressed`,String(z!==null)),Hn=-1,nr()}function nr(){let e=Math.min(N.duration,Math.max(0,A())),{bar:t,tick:n}=F.at(e);if(j()&&(t<I||t>=I+U())){I=Math.floor(t/U())*U(),Y();return}if(Hn!==t){M(`bar-now`).textContent=Jn(t),R&&(M(`section-title`).textContent=`Battuta `+Jn(t));for(let e of M(`bars`).querySelectorAll(`.measure`)){let n=+e.dataset.measure===t;e.classList.toggle(`current`,n),e.querySelector(`.cursor`).setAttribute(`visibility`,n?`visible`:`hidden`)}Hn=t}let r=33+n*307/F.bars[t].length;M(`bars`).querySelector(`[data-bar="${t}"] .cursor`)?.setAttribute(`transform`,`translate(`+r+` 0)`),M(`elapsed`).textContent=le(e),M(`seek`).value=e,M(`seek`).style.setProperty(`--progress`,e/N.duration*100+`%`)}function rr(){M(`play`).innerHTML=v(j()?`pause`:`play`),M(`play`).setAttribute(`aria-label`,j()?`Pausa`:`Riproduci`)}function X(){Bn=!1,Ln++,xn(),rr()}function ir(e,t=!0){Bn=!1,Ln++,e=Math.max(0,Math.min(e,N.duration));let n=j();Sn(e),z!==null&&F.at(e).bar!==z&&(z=null),t&&(I=Math.floor(F.at(e).bar/U())*U()),n&&Cn(N.events,e,Qn()),Y(),rr()}async function ar(){if(Vn&&$(!1),j()||Bn){X();return}Bn=!0;let e=++Ln;try{if(await mn(!V),e!==Ln)return;if(V&&!An){let t=await u(`audio`,jn?[P,`drums`]:P);if(e!==Ln)return;if(!t)throw Error(`Traccia audio non disponibile sul dispositivo.`);let n=await bn(t);if(e!==Ln)return;An=n}let t=A();t>=N.duration-.01&&(t=0),z!==null&&F.at(t).bar!==z&&(t=F.bars[z].start),Cn(N.events,t,Qn()),rr(),or()}finally{e===Ln&&(Bn=!1)}}function or(){if(!j())return;let e=z===null?N.duration:Math.min(F.bars[z].end,N.duration);if(A()>=e){if(z===null){X(),Sn(e),nr();return}Cn(N.events,F.bars[z].start,Qn())}wn(e),nr(),requestAnimationFrame(or)}async function sr(e){if($(!1),er(!1),G=!1,R=e,I=Math.floor(Zn()/U())*U(),L=null,Y(),e&&navigator.wakeLock)try{Wn=await navigator.wakeLock.request(`screen`)}catch{}!e&&Wn&&(await Wn.release(),Wn=null)}function cr(){return{events:N.events,rests:N.rests,grid:N.grid??16,selected:L,bpm:N.bpm,bar_times:N.bar_times,bar_source:N.bar_source,first_numbered_bar:N.first_numbered_bar}}function Z(e){let t=P,n=Un.then(()=>{if(P===t)return e()});return Un=n.catch(e=>{N&&P===t&&Y(),q(e)}),n}function Q(e,t,n=N.grid??16,r={}){let i=cr();return lr({...cr(),events:e,selected:t,grid:n,...r},()=>{Mn.push(i),Mn.length>80&&Mn.shift(),Nn=[]})}async function lr(e,t){let{selected:n,...r}=e,i={...N,...r},a=i.bar_times!==N.bar_times||i.bpm!==N.bpm,s=o()&&P===`pocket-study`?crypto.randomUUID():P,c=await h(`scores`,s,{id:s,project:i},s===P?Dn:void 0);s!==P&&(P=s,await h(`settings`,`active`,P)),Dn=m(c),t(),N=i,L=n,$n(),a&&(z=null);let l=W()??Yn();if(a||l){let e=l&&!j()?F.at(l.time,!0).bar:Zn();I=Math.floor(e/U())*U()}j()&&Cn(N.events,A(),Qn()),Y()}function ur(e=!1){if(!R)return Z(()=>{let t=e?Nn:Mn,n=e?Mn:Nn,r=cr();if(t.length)return lr(t.at(-1),()=>{n.push(r),t.pop()})})}function dr(e,t){let{bar:n,tick:r}=F.at(e.time,!0),i=S(e),a=kn[n].filter(e=>{let n=e.hit??e.rest;return n.id!==t&&S(n)===i}),o=me(a,F.bars[n].length,F.beat),s=o.find(e=>e.tick===r),c=a.reduce((e,t)=>t.tick>r?Math.min(t.tick,e):e,F.bars[n].length),l=o.some(e=>e.tick<r&&e.tick+e.value>r&&(e.rest||e.hits.some(e=>e.written)));return{tick:r,value:s?.value??F.q,hits:s?.hits??[],rest:s?.rest,room:c-r,blocked:l}}function fr(e){let t=e?dr(e):null,n=!!e?.voice,r=e?e.written??t.hits.find(e=>e.written)?.written??0:Xn,i=t?.value??(Xn||F.q),a=t?.room??F.full;for(let e of M(`figure-value`).options){let t=Number(e.value);e.disabled=t===0?n:t>a}M(`figure-value`).options[0].textContent=e&&!r?`Auto · `+pe(i).label:`Auto`,M(`figure-value`).value=r,M(`shorter`).disabled=!fe.includes(i/2),M(`longer`).disabled=!fe.includes(i*2)||i*2>a,M(`touch-field`).hidden=!e?.instrument,M(`note-touch`).value=e?.touch??``,M(`convert-figure`).hidden=!e,M(`convert-figure`).textContent=n?`Trasforma in colpo`:t?.hits.length>1?`Accordo in pausa`:`Trasforma in pausa`,M(`write-rest`).setAttribute(`aria-pressed`,String(G)),M(`write-rest`).textContent=G?`Annulla inserimento pausa`:`Inserisci pausa`}function pr(e){let t=L;t?Z(()=>{let n=N.events.find(e=>e.id===t)??N.rests?.find(e=>e.id===t);if(!n)return;let r=dr(n);if(e>r.room)throw Error(`Il valore supera il prossimo colpo, la pausa o la fine della battuta.`);if(n.voice)return!e||e===n.written?void 0:Q(N.events,t,N.grid,{rests:N.rests.map(n=>n.id===t?{...n,written:e}:n)});let i=new Set(r.hits.map(e=>e.id));return Q(N.events.map(t=>i.has(t.id)?{...t,written:e||void 0}:t),t)}):(Xn=e,Y())}function mr(e,t){if(t.blocked||t.rest)throw Error(`Qui c’è già una figura scritta. Accorciala o eliminala per inserire il colpo o la pausa.`);if(e.written>t.room)throw Error(`Scegli un valore più breve per lo spazio disponibile in questa voce.`)}function hr(e,t){return Z(async()=>{if(e>=N.duration)throw Error(`Scegli un punto prima della fine del brano.`);let n={id:crypto.randomUUID(),time:e,voice:S({instrument:t})},r=dr(n);if(r.hits.length)throw Error(`Seleziona il colpo e usa il comando per trasformarlo in pausa.`);n.written=Xn||Math.min(F.q,2**Math.floor(Math.log2(r.room))),mr(n,r),await Q(N.events,n.id,N.grid,{rests:[...N.rests??[],n]}),G=!1,Y()})}function gr(){let e=L,t=M(`instrument`).value;Z(()=>{let n=N.events.find(t=>t.id===e),r=N.rests?.find(t=>t.id===e);if(n){if(n.time>=N.duration)throw Error(`Scegli un colpo prima della fine del brano.`);let{hits:t,value:r}=dr(n),i=new Set(t.map(e=>e.id)),a={id:e,time:n.time,voice:S(n),written:r};return Q(N.events.filter(e=>!i.has(e.id)),e,N.grid,{rests:[...N.rests??[],a]})}if(r){let n={id:e,time:r.time,instrument:t,velocity:96,written:r.written},i=dr(n,e);if(mr(n,i),i.hits.some(e=>e.instrument===t))throw Error(`Questo colpo è già presente.`);return n.written=i.hits.find(e=>e.written)?.written??n.written,yn(t).catch(q),Q([...N.events,n],e,N.grid,{rests:N.rests.filter(t=>t.id!==e)})}})}function _r(){if(R||!L)return;let e=L;return Z(()=>{if(N.events.some(t=>t.id===e))return Q(N.events.filter(t=>t.id!==e),null);if(N.rests?.some(t=>t.id===e))return Q(N.events,null,N.grid,{rests:N.rests.filter(t=>t.id!==e)})})}function vr(e,t,n){return Z(()=>{let r=N.events.find(t=>t.id===e.id);if(!r)return;let i=n??r.time;if(N.events.some(n=>n.id!==e.id&&n.instrument===t&&Math.abs(n.time-i)<5e-4)){Y(),K(`Questo colpo è già presente.`);return}let a={...r,instrument:t,time:i},o=dr(a,e.id);if(S(a)!==S(r)||i!==r.time){if(mr(a,o),o.hits.some(e=>e.instrument===t))throw Error(`Questo colpo è già presente sulla griglia.`);o.hits.length&&(a.written=o.hits[0].written)}return Q(N.events.map(t=>t.id===e.id?a:t),e.id)})}function yr(e,t){let n=e.getBoundingClientRect(),r=350/n.width;return{x:(t.clientX-n.left)*r,y:(t.clientY-n.top)*r}}function $(e){Vn=e,e&&(G=!1,fr(W()??Yn())),Tr(),H=null,Fn=null,M(`first-bar`).setAttribute(`aria-pressed`,String(e)),M(`bar-placement`).hidden=!e,M(`bars`).classList.toggle(`placing`,e),M(`bars`).querySelector(`.start-preview`)?.remove()}function br(e,t){let n=Number(e.dataset.bar),r=Math.max(33,Math.min(340,yr(e,t).x));return{x:r,t:F.seconds(n,(r-33)*F.bars[n].length/307)}}function xr(e,t){let n=M(`bars`).querySelector(`.start-preview`);if(!e){n?.remove();return}let{x:r,t:i}=br(e,t);i>=N.duration?n?.remove():(n||(n=document.createElementNS(`http://www.w3.org/2000/svg`,`path`),n.setAttribute(`class`,`start-preview`),n.setAttribute(`d`,`M -4 16 H 4 L 0 21 Z M 0 21 V 115`)),n.parentNode!==e&&e.append(n),n.setAttribute(`transform`,`translate(`+r+` 0)`))}function Sr(e){e>=N.duration?K(`Scegli un punto prima della fine del brano.`):($(!1),ir(e),Z(async()=>{await Q(N.events,null,N.grid??16,be(N,e,{firstBar:!0})),K(`Battuta 1 impostata a `+e.toLocaleString(`it`,{maximumFractionDigits:2})+` s`)}))}function Cr(e,t){let n=+e.dataset.bar,{x:r,y:i}=yr(e,t),a=F.bars[n],o=F.snapTick(a.length,(r-33)*a.length/307),s=F.seconds(n,o),c=(86-i)*2/8;return{bar:n,tick:o,t:s,key:Tn.filter(e=>e!==`unknown`).sort((e,t)=>Math.abs(x[e][1]-c)-Math.abs(x[t][1]-c))[0],x:r,y:i}}function wr(e,t,n){let r=Cr(t,n),{hit:i}=e,a=e.svg===t&&Math.abs(n.clientX-e.x)<=9,o=Math.abs(n.clientY-e.y)>=e.pitchThreshold?r.key:i.instrument;o===`hi_hat_closed`&&i.instrument===`hi_hat_open`&&(o=`hi_hat_open`);let s=a?i.time:r.t;return{...F.at(s,!0),key:o,time:s}}function Tr(){M(`drag-label`).hidden=!0,M(`bars`).querySelector(`.drop-preview`)?.remove()}function Er(e,t,n){let r=M(`drag-label`),i=x[n.key][0];r.hidden=!1,r.textContent!==i&&(r.textContent=i);let a=r.offsetWidth/2+6;r.style.left=Math.max(a,Math.min(innerWidth-a,t.clientX))+`px`,r.style.top=(t.clientY>68?t.clientY-25:t.clientY+55)+`px`,M(`bars`).querySelector(`.drop-preview`)?.remove(),e.insertAdjacentHTML(`beforeend`,`<circle class="drop-preview" cx="${33+n.tick*307/F.bars[n.bar].length}" cy="${Te(n.key)}" r="7" fill="#73b896" stroke="#25543b" pointer-events="none"/>`)}M(`bars`).onpointerdown=e=>{if(e.button!==0||H)return;let t=e.target.closest(`.staff`);if(!t)return;if(Vn){H={id:e.pointerId},t.setPointerCapture(e.pointerId),xr(t,e);return}let n=Cr(t,e),r=307*F.q/(2*F.bars[n.bar].length),i=Pn.get(n.bar).filter(e=>Math.abs(e.x-n.x)<=r).map(e=>({...e,distance:Math.hypot((e.x-n.x)*.84,e.y-n.y)})).filter(e=>e.distance<10).sort((e,t)=>e.distance-t.distance),a=Math.max(2,3*t.getBoundingClientRect().width/350);H={id:e.pointerId,svg:t,hit:i[0]?.hit,rest:i[0]?.rest,x:e.clientX,y:e.clientY,pitchThreshold:a,drag:!1},H.hit&&!R&&!G&&mn().catch(q),t.setPointerCapture(e.pointerId)},M(`bars`).addEventListener(`touchstart`,e=>{e.touches.length===1&&H?.hit&&!R&&!G&&!Vn&&e.cancelable&&e.preventDefault()},{passive:!1}),M(`bars`).onpointermove=e=>{if(Vn){H&&H.id!==e.pointerId||xr(document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`),e);return}if(H?.id!==e.pointerId||R||G||!H.hit||((Math.hypot(e.clientX-H.x,e.clientY-H.y)>6||Math.abs(e.clientY-H.y)>=H.pitchThreshold)&&(H.drag=!0),!H.drag))return;let t=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`);if(!t){Tr();return}let n=wr(H,t,e);Er(t,e,n),H.previewKey!==n.key&&(H.previewKey=n.key,yn(n.key,H.hit.touch).catch(q))},M(`bars`).onpointerleave=()=>{Vn&&M(`bars`).querySelector(`.start-preview`)?.remove()},M(`bars`).onpointercancel=()=>{H=null,Tr(),_n(),Y()},M(`bars`).onpointerup=e=>{if(H?.id!==e.pointerId)return;let t=H,{hit:n,rest:r,drag:i,x:a,y:o}=t;H=null,Tr();let s=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`);if(Vn){s?Sr(br(s,e).t):xr(null,e);return}if(!s||!i&&Math.hypot(e.clientX-a,e.clientY-o)>8){Y();return}let c=Cr(s,e);if(R){ir(F.bars[c.bar].start);return}if(G){hr(c.t,c.key);return}if(i&&n){Fn=null;let{time:r,key:i}=wr(t,s,e);er(!0),r<N.duration?(vr(n,i,r),i!==t.previewKey&&yn(i,n.touch).catch(q)):Y();return}let l=performance.now(),u=Fn&&l-Fn.now<375&&Fn.bar===c.bar&&Fn.tick===c.tick&&Fn.key===c.key&&Math.hypot(e.clientX-Fn.x,e.clientY-Fn.y)<16;if(Fn=u?null:{now:l,bar:c.bar,tick:c.tick,key:c.key,x:e.clientX,y:e.clientY},r)er(!0),L=r.id,S({instrument:M(`instrument`).value})!==r.voice&&(M(`instrument`).value=r.voice===`drums`?`snare`:`hi_hat_closed`),Y();else if(u&&(!n||Te(n.instrument)!==Te(c.key))&&c.t<N.duration){let e=c.key===`hi_hat_closed`&&M(`instrument`).value===`hi_hat_open`?`hi_hat_open`:c.key;er(!0);let t={id:crypto.randomUUID(),time:c.t,instrument:e,velocity:96};Z(()=>{let n=dr(t);if(!n.hits.some(t=>t.instrument===e))return t.written=n.hits.length?n.hits[0].written:Xn||void 0,mr(t,n),yn(e).catch(q),Q([...N.events,t],t.id)})}else n?(er(!0),L=n.id,Y(),yn(n.instrument,n.touch).catch(q)):(L=null,ir(Math.min(N.duration,c.t),!1))};function Dr(e,t){M(`dialog-title`).textContent=e,M(`dialog-body`).replaceChildren();for(let e of t){let t=document.createElement(`button`);t.className=`choice`,t.innerHTML=v(e.icon)+b(e.text)+(e.detail?`<small>`+b(e.detail)+`</small>`:``),t.onclick=J(()=>(M(`dialog`).close(),e.go())),M(`dialog-body`).append(t)}M(`dialog`).open||M(`dialog`).showModal()}M(`snare-roll`).onclick=()=>{let e=W(),t=N;if(R||e?.instrument!==`snare`)return;X(),$(!1),Dr(`Rullata in trentaduesimi`,[]);let n=M(`dialog-body`);n.innerHTML=`<p class="roll-help">Il rullante selezionato è il primo colpo. Otto trentaduesimi occupano un quarto.</p>
    <form class="roll-form"><label for="roll-count">Numero di colpi</label><input id="roll-count" type="number" inputmode="numeric" min="2" max="32" value="4" required><button type="submit">Scrivi rullata</button></form>
    <button id="roll-detect" class="choice" ${zn?``:`hidden`}>Rileva dalla batteria isolata</button>
    <p id="roll-status" class="roll-help" role="status"></p><button id="roll-apply" class="choice" hidden></button>`;let r=M(`roll-status`),i=M(`roll-detect`),a=M(`roll-apply`),o=()=>M(`dialog`).open&&r.isConnected,s=async(n,i)=>{try{await Z(async()=>{if(o()){if(t!==N)throw Error(`Lo spartito è cambiato. Seleziona di nuovo il primo colpo.`);await Q(n(),e.id,32),M(`dialog`).close(),K(`Rullata di `+i+` colpi · Griglia 1/32`)}})}catch(e){o()&&(r.textContent=e.message)}};n.querySelector(`form`).onsubmit=n=>{n.preventDefault();let r=M(`roll-count`).valueAsNumber;s(()=>tn(t,e.id,r),r)},i.onclick=async()=>{i.disabled=!0,r.textContent=`Ascolto il passaggio sulla traccia di batteria…`;try{let n=await u(`audio`,[P,`drums`]);if(!n)throw Error(`La batteria isolata non è disponibile su questo dispositivo.`);let{scanStemRoll:i}=await T(async()=>{let{scanStemRoll:e}=await import(`./scan-roll-CAuPyLGP.js`);return{scanStemRoll:e}},__vite__mapDeps([2,3,1])),c=await i(n,t,e.time);if(!o())return;if(!c.length)throw Error(`Nessuna sequenza regolare di trentaduesimi rilevata qui. Puoi indicare il numero di colpi.`);r.textContent=`Da `+c[0].time.toLocaleString(`it`,{maximumFractionDigits:3})+` a `+c.at(-1).time.toLocaleString(`it`,{maximumFractionDigits:3})+` s`,a.hidden=!1,a.textContent=`Applica `+c.length+` colpi rilevati`,a.onclick=()=>s(()=>nn(t,c),c.length)}catch(e){o()&&(r.textContent=e.message,i.disabled=!1)}}};async function Or(e,t=!0){await Un,$(!1),er(!1),ge(e.project),X(),Sn(0),z=null,I=0,L=null,R=!1,G=!1,Xn=0,Mn=[],Nn=[],Wn&&=(await Wn.release(),null),P=e.id,Dn=m(e),N=e.project,An=null,B=``;let[n,r]=await Promise.all([g(`audio`,[P,`drums`]),g(`audio`,P)]);zn=n,r&&(B=N.original_name||`Originale`),jn=zn,V=zn||r,$n(),Y(),await h(`settings`,`active`,P),t&&On.go(`studio`)}async function kr(e,t=!1){if(V===e&&jn===t)return;let n=j()||Bn;X(),V=e,jn=t,An=null,Y(),n&&await ar()}async function Ar(){let e=[{text:`Suoni dello spartito`,detail:V?``:`Attivi`,icon:`drum`,go:()=>kr(!1)}];zn&&e.push({text:`Batteria isolata`,detail:V&&jn?`Attiva`:``,icon:`audio-lines`,go:()=>kr(!0,!0)}),B&&e.push({text:`Canzone originale`,detail:B,icon:`music-2`,go:()=>kr(!0)}),zn&&B||e.push({text:`Abbina una traccia audio`,icon:`headphones`,go:()=>M(`audio-file`).click()}),Dr(`Sorgente audio`,e)}async function jr(e){if(Rn)return;let t=new AbortController;Rn=t;let n=M(`import-progress`),r=(e,t,n)=>{M(`import-phase`).textContent=e,M(`import-meter`).value=t;let r=n>=60?Math.ceil(n/60)+` min`:Math.max(1,Math.ceil(n))+` s`;M(`import-detail`).textContent=Number.isFinite(n)&&n>0?`Separazione · circa `+r+` rimanenti`:`Analisi sul dispositivo`};M(`import-title`).textContent=e.file.name,M(`cancel-import`).disabled=!1,r(`Preparazione del brano`,0),X(),An=null,n.showModal();let i;if(navigator.wakeLock)try{i=await navigator.wakeLock.request(`screen`)}catch{}try{await Un,await h(`settings`,`pending-song`,e);let{analyzeSong:n}=await T(async()=>{let{analyzeSong:e}=await import(`./import-song-BxOJruJ0.js`);return{analyzeSong:e}},[]),i=await n(e.file,t.signal,r,e.separation,_);t.signal.throwIfAborted(),e.sourceUrl&&(i.project.source_url=e.sourceUrl);let a={id:e.id,project:i.project};ge(a.project),M(`cancel-import`).disabled=!0,r(`Salvataggio dello spartito`,.99),await Or(await re(a,e.file,i.stem)),a.project.events.length?i.rollCheckUnavailable?K(`Spartito pronto. Verifica approfondita delle rullate non disponibile per questa importazione.`):a.project.duration>=8&&a.project.bar_source===`estimated`?K(`Spartito pronto · battute stimate dai colpi di batteria.`):K(`Spartito pronto per la modifica.`):K(`Nessun colpo rilevato. Puoi aggiungerlo sul rigo.`)}catch(e){if(t.signal.aborted)await te(),K(`Importazione annullata.`);else throw e}finally{Rn=null,n.close(),await i?.release(),window.location.hash&&window.location.hash!==`#repertorio`||await On.render()}}M(`cancel-import`).onclick=()=>Rn?.abort(),M(`import-progress`).oncancel=e=>{e.preventDefault(),M(`cancel-import`).disabled||Rn?.abort()};var Mr=Xt({pause:X,async importFile(e,t,n){try{if(/\.midi?$/i.test(e.name)||/audio\/(x-)?midi/i.test(e.type)){let{midiScore:n}=await T(async()=>{let{midiScore:e}=await import(`./midi-import-Blh9R_MR.js`);return{midiScore:e}},__vite__mapDeps([4,1])),r=await n(e);t&&(r.source_url=t),ge(r);let i={id:crypto.randomUUID(),project:r};await Or(await h(`scores`,i.id,i))}else await jr({id:crypto.randomUUID(),file:e,sourceUrl:t,separation:n})}catch(e){q(e)}}});function Nr(e){return Wt({user:e,pause:()=>{X(),$(!1)},notify:K,active:()=>P,sourceLink:()=>N?.source_url,create:Mr,resume:jr,openDemo:async()=>{let e=await u(`scores`,`pocket-study`);e||=await h(`scores`,`pocket-study`,{id:`pocket-study`,project:ye()}),await Or(e)},barInfo:()=>{let e=Zn(),t=F.bars[e];return{time:t.start,number:t.number,max:e+1}},numberBar:async e=>{await Un;let t=A(),n=e===null?F.firstComplete:we(N,t,e);if(await Z(()=>Q(N.events,L,N.grid??16,{first_numbered_bar:n})),N.first_numbered_bar!==n)throw Error(`Impossibile salvare la numerazione.`);ir(t),On.go(`studio`)},open:async e=>{await Un,e.id===P&&m(e)===Dn?On.go(`studio`):await Or(e)}})}M(`project-file`).onchange=J(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n;try{n=JSON.parse(await t.text())}catch{throw Error(`Scegli un file progetto .drums.`)}ge(n);let r={id:crypto.randomUUID(),project:n};await Or(await h(`scores`,r.id,r))}),M(`audio-file`).onchange=J(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n=P,r=(Gn.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{let e=await bn(t);await h(`audio`,n,t),P===n&&(X(),An=e,V=!0,jn=!1,B=t.name,Y())});Gn.set(n,r);try{await r}finally{Gn.get(n)===r&&Gn.delete(n)}}),M(`source`).onclick=J(Ar),M(`original-source`).onclick=J(()=>B?kr(!0):M(`audio-file`).click()),M(`drums-source`).onclick=J(()=>kr(!0,!0)),M(`first-bar`).onclick=()=>{X(),$(!Vn)},M(`cancel-placement`).onclick=()=>{$(!1),M(`first-bar`).focus()},M(`use-playhead`).onclick=()=>Sr(A()),M(`pickup`).onclick=()=>{let e=W();e&&!R&&(X(),$(!1),Z(async()=>{let t=N.events.find(t=>t.id===e.id);if(!t)return;let n=Se(N,t.time);await Q(N.events,t.id,N.grid??16,n),ir(t.time);let r=F.bars[n.first_numbered_bar].start;K(`Colpo sul levare del 4 · Battuta 1 a `+r.toLocaleString(`it`,{maximumFractionDigits:2})+` s`)}))};async function Pr(){if(Rn)return;let e=P,t=new AbortController,n=M(`import-progress`);Rn=t,M(`cancel-import`).disabled=!1,M(`import-title`).textContent=`Battute del brano`,M(`import-detail`).textContent=`Analisi sul dispositivo`;let r=(e,t)=>{M(`import-phase`).textContent=e,M(`import-meter`).value=t};r(`Apertura della traccia originale`,0),n.showModal();try{if(await Un,P!==e)return;let n=await u(`audio`,e);if(!n)throw Error(`Abbina la canzone originale dal menu delle sorgenti audio.`);let i=N,{analyzeBarLines:a}=await T(async()=>{let{analyzeBarLines:e}=await import(`./import-song-BxOJruJ0.js`);return{analyzeBarLines:e}},[]),{events:o,bpm:s,bar_times:c,duration:l}=i,d=await a(n,{events:o,bpm:s,bar_times:c,duration:l},t.signal,r);t.signal.throwIfAborted(),M(`cancel-import`).disabled=!0,await Z(async()=>{if(P!==e||N!==i)throw Error(`Lo spartito è cambiato durante l’analisi. Riapri Allinea battute per riprovare.`);await Q(N.events,L,N.grid??16,Ce(N,d)),K(`Battute rilevate sul brano originale · `+d.bpm.toFixed(1)+` BPM`)})}catch(e){t.signal.aborted?K(`Analisi annullata.`):q(e)}finally{Rn=null,n.close()}}M(`align-bars`).onclick=()=>{X(),$(!1);let e=A(),t=W(),n=e=>Z(()=>Q(N.events,L,N.grid??16,be(N,e))),r=[];N.meter===`4/4`&&B&&r.push({text:`Rileva battute dall’originale`,detail:`Beat This! · ascolta la pulsazione di tutta la canzone`,icon:`audio-lines`,go:Pr}),t&&r.push({text:`Il colpo selezionato è sull’uno`,detail:x[t.instrument][0]+` · `+t.time.toFixed(2)+` s`,icon:`drum`,go:()=>n(t.time)}),e<N.duration&&r.push({text:`L’uno è al cursore`,detail:e.toFixed(2)+` s`,icon:`list-music`,go:()=>n(e)}),N.meter===`4/4`&&r.push({text:`Ricalcola dal ritmo`,detail:`Aggiorna BPM e battute dai colpi salvati`,icon:`list-music`,go:()=>Z(async()=>{let{estimateTiming:e}=await T(async()=>{let{estimateTiming:e}=await import(`./transcribe-B9egfNhk.js`);return{estimateTiming:e}},__vite__mapDeps([3,1])),t=e([...N.events].sort((e,t)=>e.time-t.time),N.duration);if(!t.bar_times)throw Error(`Colpi insufficienti. Indica l’uno sullo spartito.`);await Q(N.events,L,N.grid??16,Ce(N,t)),K(`Battute ricalcolate · `+t.bpm.toFixed(1)+` BPM`)})}),Dr(`Allinea battute`,r)},M(`close`).onclick=()=>M(`dialog`).close(),M(`dialog`).onclick=e=>{if(e.target===M(`dialog`)){let t=e.target.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&e.target.close()}},M(`play`).onclick=J(ar),M(`rewind`).onclick=()=>ir(F.bars[Zn()].start),M(`seek`).oninput=e=>ir(+e.target.value),M(`loop`).onclick=()=>{z=z===null?Zn():null,j()&&Cn(N.events,A(),Qn()),Y()},M(`studio`).onclick=J(()=>sr(!1)),M(`live`).onclick=J(()=>sr(!0)),M(`previous`).onclick=()=>ir(F.bars[Math.max(0,I-U())].start),M(`next`).onclick=()=>ir(F.bars[Math.min(F.bars.length-1,I+U())].start);function Fr(e){Z(()=>{if((N.grid??16)!==e)return Q(N.events,L,e)})}function Ir(e){e!==Number(N.bpm.toFixed(2))&&Z(()=>Q(N.events,L,N.grid,_e(N,e)))}M(`inline-grid`).onchange=e=>Fr(Number(e.target.value)),M(`grid`).onclick=()=>Dr(`Griglia spartito`,[8,16,32].map(e=>({text:`1/`+e,icon:`settings-2`,detail:(N.grid??16)===e?`Attiva`:``,go:()=>Fr(e)}))),M(`inline-bpm`).onchange=e=>{let t=e.target;if(!t.value||!t.validity.valid){t.value=Number(N.bpm.toFixed(2)),K(`Scegli un tempo tra 10 e 500 BPM.`);return}let n=Number(t.valueAsNumber.toFixed(2));t.value=n,Ir(n)},M(`inline-bpm`).onkeydown=e=>{e.key===`Escape`&&(e.target.value=Number(N.bpm.toFixed(2))),(e.key===`Enter`||e.key===`Escape`)&&e.target.blur()},M(`tempo`).onclick=()=>{X(),Dr(`Tempo dello spartito`,[]);let e=M(`dialog-body`);e.innerHTML=`<form class="tempo-form"><label for="tempo-input">Tempo (BPM)</label><input id="tempo-input" type="number" inputmode="decimal" min="10" max="500" step=".01" required><p>Il tempo ridisegna la griglia attorno alla battuta 1. I colpi restano sincronizzati con l’audio.</p><button type="submit">Applica tempo</button></form>`;let t=M(`tempo-input`);t.value=Number(N.bpm.toFixed(2)),t.focus(),t.select(),e.firstElementChild.onsubmit=e=>{e.preventDefault();let n=t.valueAsNumber;M(`dialog`).close(),Ir(n)}};function Lr(e){let t=W()??Yn();if(!t)return;let n=ve(F,t.time,e,N.duration);n!==null&&(t.instrument?vr(t,t.instrument,n):Z(()=>{let e=N.rests?.find(e=>e.id===t.id);if(!e)return;let r={...e,time:n},i=dr(r,e.id);if(mr(r,i),i.hits.length)throw Error(`Questa posizione contiene già un colpo.`);return Q(N.events,r.id,N.grid,{rests:N.rests.map(e=>e.id===r.id?r:e)})}))}M(`earlier`).onclick=()=>Lr(-1),M(`later`).onclick=()=>Lr(1),M(`undo`).onclick=()=>ur(),M(`redo`).onclick=()=>ur(!0),M(`remove`).onclick=_r,M(`figure-value`).onchange=e=>pr(Number(e.target.value));function Rr(e){let t=W()??Yn(),n=(t?dr(t).value:Xn||F.q)*e;fe.includes(n)&&pr(n)}M(`shorter`).onclick=()=>Rr(.5),M(`longer`).onclick=()=>Rr(2),M(`convert-figure`).onclick=gr,M(`write-rest`).onclick=()=>{X(),$(!1),G=!G,L=null,Y()},M(`note-touch`).onchange=e=>{let t=L,n=e.target.value||void 0;Z(()=>{let e=N.events.find(e=>e.id===t);if(e&&n!==e.touch)return yn(e.instrument,n).catch(q),Q(N.events.map(e=>e.id===t?{...e,touch:n}:e),t)})},M(`instrument`).onchange=e=>{let t=W(),n=e.target.value;t&&(vr(t,n),yn(n,t.touch).catch(q))},document.onkeydown=e=>{document.querySelector(`dialog[open]`)||(G&&e.key===`Escape`?(e.preventDefault(),G=!1,Y()):Vn&&e.key===`Escape`?(e.preventDefault(),$(!1),M(`first-bar`).focus()):!N||document.body.classList.contains(`section-open`)||M(`create-sheet`).open||[`INPUT`,`TEXTAREA`].includes(e.target.tagName)||M(`dialog`).open||M(`import-progress`).open||(!R&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`z`?(e.preventDefault(),ur(e.shiftKey)):e.target.tagName!==`SELECT`&&(e.code===`Space`&&e.target.tagName!==`BUTTON`&&(e.preventDefault(),J(ar)()),!R&&L&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&[`+`,`-`].includes(e.key)&&(e.preventDefault(),Rr(e.key===`+`?2:.5)),!R&&[`Backspace`,`Delete`].includes(e.key)&&(e.preventDefault(),_r()))))};for(let e of[En,Kn,qn])e.onchange=()=>{if(!N)return;let e=W()??Yn(),t=e&&!j()?F.at(e.time,!0).bar:Zn();I=Math.floor(t/U())*U(),Y()};document.addEventListener(`visibilitychange`,()=>{document.hidden&&N&&X()});async function zr(){let e=await vt().catch(e=>(q(e),null));a(e?.id??null),On=Nr(e),[`#studio`,`#numerazione`].includes(window.location.hash)&&window.history.replaceState(null,``,window.location.pathname+window.location.search),await On.render(),window.addEventListener(`score-conflict`,()=>K(`Due versioni modificate. Trovi la copia locale nel repertorio.`)),window.addEventListener(`remote-score`,async e=>{if(e.detail!==P||(await Un,P!==e.detail))return;let t=await u(`scores`,P);if(t&&m(t)!==Dn){if(j()){K(`Versione aggiornata disponibile nel repertorio.`);return}await Or(t,!1)}}),Rt()}zr().catch(q);export{Be as a,Ve as i,en as n,C as o,T as r,an as t};