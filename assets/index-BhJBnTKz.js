const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/esm-DGAMi3RX.js","assets/rolldown-runtime-BWaJ3C7D.js","assets/scan-roll-BKHEr5_4.js","assets/transcribe-B9egfNhk.js","assets/midi-import-B0euCMKK.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={name:`drumfolio-studio`,version:`0.1.0`,private:!0,type:`module`,scripts:{dev:`vite`,build:`vite build`,sync:`npm run build && cap sync`,test:`node --test tests/*.test.js`,"test:ui":`playwright test`,"test:services":`playwright test --config=playwright.services.config.js`},dependencies:{"@capacitor/android":`^8.6.2`,"@capacitor/app":`^8.1.2`,"@capacitor/browser":`^8.0.5`,"@capacitor/core":`^8.6.2`,"@capacitor/ios":`^8.6.2`,"@fontsource-variable/dm-sans":`^5.3.0`,"@fontsource/ibm-plex-mono":`^5.3.0`,"@revenuecat/purchases-capacitor":`^14.1.2`,"@supabase/supabase-js":`^2.119.2`,"@tonejs/midi":`^2.0.28`,"@vexflow-fonts/bravura":`^1.0.2`,"@wasm-audio-decoders/flac":`0.2.12`,"fft.js":`^4.0.4`,"lucide-static":`^1.79.0`,"onnxruntime-web":`^1.22.0`},devDependencies:{"@capacitor/cli":`^8.6.2`,"@playwright/test":`^1.65.1`,vite:`^8.3.8`}};function t(e){return new Promise((t,n)=>{let r=indexedDB.open(e,1);r.onupgradeneeded=()=>{for(let e of[`scores`,`audio`,`settings`])r.result.createObjectStore(e)},r.onsuccess=()=>t(r.result),r.onerror=()=>n(r.error)})}var n=t(`drumfolio-studio`),r=n,i=null;function a(e){i=e,r=e?t(`drumfolio-studio-user-`+e):n}var o=()=>i;async function s(e,t,n,i=r){let a=await i;return new Promise((r,i)=>{let o=a.transaction(e,t),s=n(o.objectStore(e));o.oncomplete=()=>r(s.result),o.onerror=o.onabort=()=>i(o.error??Error(`Salvataggio interrotto.`))})}function c(e){return e?.bytes instanceof ArrayBuffer?new File([e.bytes],e.name,{type:e.type}):e}async function l(e){return{name:e.name,type:e.type,bytes:await e.arrayBuffer()}}async function u(e,t){let n=await s(e,`readonly`,e=>e.get(t));return e===`audio`?c(n):t===`pending-song`&&n?{...n,file:c(n.file)}:n}function d(e,t){return!i||e.id===`pocket-study`?e:{...e,revision:t?.revision??null,change:crypto.randomUUID()}}function f(e){i&&e?.id!==`pocket-study`&&window.dispatchEvent(new Event(`score-written`))}async function p(e,t){let n=await r;return new Promise((r,i)=>{let a=n.transaction(`scores`,`readwrite`),o=a.objectStore(`scores`),s=o.get(e),c,l;s.onsuccess=()=>{try{c=t(s.result),c&&o.put(c,e)}catch(e){l=e,a.abort()}},a.oncomplete=()=>r(c),a.onabort=a.onerror=()=>i(l??a.error??Error(`Salvataggio interrotto.`))})}var m=e=>e?.change??e?.revision??null;async function h(e,t,n,r){if(e===`scores`){let e=await p(t,e=>{if(r!==void 0&&m(e)!==r)throw Error(`Lo spartito è stato aggiornato. Riaprilo dal repertorio per continuare.`);return d(n,e)});return f(e),e}return e===`audio`&&(n=await l(n)),t===`pending-song`&&(n={...n,file:await l(n.file)}),s(e,`readwrite`,e=>e.put(n,t))}var g=(e,t)=>s(e,`readonly`,e=>e.count(t)).then(e=>e>0),_=()=>s(`scores`,`readonly`,e=>e.getAll());async function v(e,t){let n=r,i=(await s(`scores`,`readonly`,e=>e.getAll(),n)).filter(({project:e})=>e&&Math.abs(e.duration-t)<.02&&(Number.isInteger(e.first_numbered_bar)||[`aligned`,`manual`,`pickup`].includes(e.bar_source)));if(!i.length)return;let a=await s(`settings`,`readonly`,e=>e.get(`active`),n);i.sort((e,t)=>Number(t.id===a)-Number(e.id===a));let o,l;for(let{id:r,project:u}of i){let i=c(await s(`audio`,`readonly`,e=>e.get(r),n));if(!i||i.size!==e.size)continue;o??=new Uint8Array(await e.arrayBuffer());let d=new Uint8Array(await i.arrayBuffer());if(!o.every((e,t)=>e===d[t]))continue;let{bpm:f,meter:p,bar_times:m,bar_source:h,first_numbered_bar:g}=u,_={duration:t,bpm:f,meter:p,bar_times:m,bar_source:h,first_numbered_bar:g};if(r===a)return _;if(l&&JSON.stringify(l)!==JSON.stringify(_))return;l=_}return l}function ee(){return s(`settings`,`readwrite`,e=>e.delete(`pending-song`))}async function te(e,t,n,i=!1){let a=await r;return new Promise((r,o)=>{let s=a.transaction([`scores`,`audio`,`settings`],`readwrite`);s.oncomplete=()=>{f(e),r(e)},s.onabort=s.onerror=()=>o(s.error??Error(`Spazio insufficiente per salvare il brano.`));try{let r=s.objectStore(`scores`),a=s.objectStore(`audio`),o=s.objectStore(`settings`);r.add(e,e.id),t&&a.put(t,e.id),n&&a.put(n,[e.id,`drums`]),i||(o.put(e.id,`active`),o.delete(`pending-song`))}catch(e){s.abort(),o(e)}})}async function ne(e,t,n){let[r,i]=await Promise.all([l(t),l(n)]);return te(d(e),r,i)}async function re(){if(!i)return[];let[e,t]=await Promise.all([s(`scores`,`readonly`,e=>e.getAll(),n),_()]),r=new Set(t.map(e=>e.id));return e.filter(e=>e.id!==`pocket-study`&&!r.has(e.id))}async function ie(e){if(!i)throw Error(`Accedi per associare uno spartito.`);let[t,r,a]=await Promise.all([s(`scores`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get([e,`drums`]),n)]);if(!t||e===`pocket-study`)throw Error(`Spartito ospite non disponibile.`);return te(d({id:e,project:t.project}),r,a,!0)}async function ae(e){let t=await r;return new Promise((n,r)=>{let i=t.transaction([`scores`,`audio`],`readwrite`),a=i.objectStore(`scores`),o=i.objectStore(`audio`),s=a.get(e.id),c;s.onsuccess=()=>{let t=s.result;if(t?.revision!==e.revision){if(t?.change===e.revision)a.put({...t,revision:e.revision,change:null},e.id);else{if(t?.change){let n=crypto.randomUUID(),r=(t.project.score_title||t.project.name)+` (copia locale)`;a.add(d({id:n,project:{...t.project,name:r,score_title:r}}),n);for(let t of[!1,!0]){let r=o.get(t?[e.id,`drums`]:e.id);r.onsuccess=()=>{r.result&&o.put(r.result,t?[n,`drums`]:n)}}c=`conflict`}else c=`updated`;a.put({id:e.id,revision:e.revision,change:null,project:{...t?.project,...e.score,rests:e.score.rests,bar_times:e.score.bar_times,bar_source:e.score.bar_source,first_numbered_bar:e.score.first_numbered_bar}},e.id)}}},i.oncomplete=()=>n(c),i.onerror=i.onabort=()=>r(i.error??Error(`Salvataggio interrotto.`))})}var oe=Object.assign({"/node_modules/lucide-static/icons/activity.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
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
`});function y(e){return oe[`/node_modules/lucide-static/icons/`+e+`.svg`]??``}function b(e,t,n,r=``){return`<button id="${e}" class="icon-button ${r}" title="${t}" aria-label="${t}">${y(n)}</button>`}var se=e=>String(e).padStart(2,`0`),ce=e=>Math.floor(e/60)+`:`+se(Math.floor(e%60)),x=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function le(){return`<header class="top"><div class="top-inner"><a class="wordmark" href="#repertorio" aria-label="Drumfolio · Home" title="Torna alla Home"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>drumfolio<span>.</span></a>
<div class="modes" hidden aria-label="Modalità"><button id="studio">${y(`sliders-horizontal`)}Studio</button><button id="live">${y(`radio`)}Live</button></div>
<button id="home-account" hidden></button><button id="upgrade" hidden>Drumfolio Plus</button><button id="library" class="icon-button" aria-label="Repertorio" hidden>${y(`folder-open`)}</button></div></header>
<main id="workspace" hidden>
<div class="song"><div class="cover" aria-hidden="true"><i></i><b>df.</b></div><div class="song-name"><span class="eyebrow" id="artist"></span><h1 id="title"></h1><div class="spec"><span id="bpm"></span><i></i><span id="meter"></span><i></i><span id="bar-total"></span></div></div></div>
<section class="score-panel" aria-label="Spartito"><div class="sheet-tools"><div class="sheet-label">${y(`book-open`)}<h2>Spartito</h2></div><button id="score-legend" aria-haspopup="dialog" aria-controls="notation-guide" title="Legenda dello spartito">${y(`list-music`)}<span>Legenda</span></button><div class="bar-tools"><button id="first-bar" aria-pressed="false" aria-controls="bar-placement">Inizio battute</button>${b(`align-bars`,`Allinea battute`,`ellipsis`)}</div><div class="sheet-nav">${b(`previous`,`Pagina precedente`,`chevron-left`)}<span id="page" class="mono"></span>${b(`next`,`Pagina successiva`,`chevron-right`)}</div></div>
<div id="bar-placement" hidden><span role="status">Tocca il rigo dove vuoi l’uno della battuta 1.</span><button id="use-playhead">Usa cursore</button>${b(`cancel-placement`,`Annulla posizionamento`,`x`)}</div>
<div class="score-workbench">
<aside class="inspector editor" aria-label="Strumenti di modifica">
<div class="ins-head"><h3>${y(`sliders-horizontal`)}<span id="ins-title">Modifica</span></h3><button id="edit-toggle" aria-controls="note-details" aria-expanded="false">${y(`sliders-horizontal`)}<span>Modifica</span>${y(`chevron-up`)}</button>
<div class="edit-buttons">${b(`undo`,`Annulla`,`undo-2`)}${b(`redo`,`Ripristina`,`redo-2`)}${b(`remove`,`Elimina colpo`,`trash-2`)}</div></div>
<div class="timing-strip"><label class="timing-input" for="inline-bpm"><span>Tempo · BPM</span><input type="number" min="10" max="500" step="any" inputmode="decimal" id="inline-bpm" title="Tempo dello spartito in BPM"></label><label class="timing-input" for="inline-grid"><span>Griglia</span><select id="inline-grid"></select></label><button id="tempo" aria-label="Modifica tempo in BPM"><span>Tempo</span><strong id="tempo-text"></strong></button><button id="grid"><span>Griglia</span><strong id="grid-text"></strong></button></div>
<div id="note-details" class="notation-editor">
<div class="note-fields"><div class="ins-field"><label for="instrument">Strumento</label><select id="instrument"></select></div>
<div class="ins-field" id="rest-info" hidden><span>Durata della pausa</span><output id="rest-duration"></output></div><div class="ins-field" id="touch-field" hidden><label for="note-touch">Tocco</label><select id="note-touch"><option value="">Normale</option><option value="accent">Accento</option><option value="ghost">Ghost note</option></select></div>
<div class="ins-field"><label for="figure-value">Valore</label><div class="figure-control"><button id="shorter" aria-label="Dimezza il valore" title="Dimezza il valore">−</button><select id="figure-value"></select><button id="longer" aria-label="Raddoppia il valore" title="Raddoppia il valore">+</button></div></div>
<div id="move-field" class="ins-field" hidden><span id="position-title">Posizione</span><div class="step-control">${b(`earlier`,`Anticipa di un passo di griglia`,`chevron-left`)}<output id="note-beat"></output>${b(`later`,`Posticipa di un passo di griglia`,`chevron-right`)}</div></div></div>
<div class="note-actions"><button id="write-rest" aria-pressed="false">Inserisci pausa</button><button id="convert-figure" hidden></button><button id="snare-roll" hidden>Rullata 1/32</button><button id="pickup" hidden aria-label="Usa come levare del 4" title="La battuta 1 inizierà un ottavo dopo questo colpo">Levare del 4</button></div></div></aside>
<div class="paper"><div class="paper-heading"><div><div class="section-meta"><span class="section-rule"></span><span id="section-label"></span></div><h3 id="section-title"></h3></div><div id="paper-meter"></div></div><div id="bars"></div></div>
</div></section>
<div id="drag-label" role="status" hidden></div>
<div class="hint"><span class="hint-dot"></span><span id="hint"></span></div>
</main>
<footer class="transport" hidden><div class="transport-inner"><div class="track-row"><div class="source-switch" role="group" aria-label="Sorgente audio"><button id="original-source" aria-label="Canzone originale" hidden>Originale</button><button id="drums-source" aria-label="Batteria isolata" hidden>Batteria</button><button id="source" aria-label="Altre sorgenti audio">${y(`headphones`)}<span id="source-name">Spartito</span>${y(`chevron-down`)}</button></div><span class="mono"><span id="elapsed">0:00</span><em> / </em><span id="duration"></span></span></div>
<label class="seek"><span class="sr">Posizione nel brano</span><input type="range" id="seek" min="0" step=".01" value="0"></label>
<div class="transport-row"><div class="bar-now"><span class="eyebrow">Battuta</span><strong id="bar-now"></strong></div><div class="play-group">${b(`rewind`,`Torna a inizio battuta`,`skip-back`)}${b(`play`,`Riproduci`,`play`,`play`)}${b(`loop`,`Ripeti battuta`,`repeat`)}</div></div></div></footer>
<main id="section-screen"><p class="page-note" role="status">Apertura del repertorio…</p></main>
<nav id="app-nav" aria-label="Navigazione principale"><div class="nav-inner">
<button data-route="repertorio">${y(`book-open`)}<span>Repertorio</span></button>
<button data-route="supporto">${y(`headset`)}<span>Supporto</span></button>
<button id="new-action" aria-label="Nuova trascrizione"><span>${y(`plus`)}</span></button>
<button data-route="account">${y(`circle-user-round`)}<span>Account</span></button>
<button data-route="altro">${y(`ellipsis`)}<span>Altro</span></button>
</div></nav>
<dialog id="create-sheet" aria-labelledby="create-title"><div class="grip"></div><div class="dialog-head"><h2 id="create-title">Nuova trascrizione</h2>${b(`close-create`,`Chiudi`,`x`)}</div>
<label class="separation-choice" for="separation-mode">Separazione batteria<select id="separation-mode"><option value="fast">Rapida</option><option value="detailed">Approfondita · più lenta</option></select></label>
<button class="file-tile" id="pick-song">${y(`cloud-upload`)}<strong>Scegli un file</strong><small>MP3, WAV, M4A, FLAC, MP4 o MIDI</small></button>
<form id="link-form"><label for="import-url">Importa da un link</label><div class="field-action"><input required type="url" id="import-url" inputmode="url" placeholder="https://…" autocomplete="off"><button aria-label="Apri link" type="submit">${y(`chevron-right`)}</button></div><small>Link audio, YouTube, Instagram o TikTok</small></form>
<button id="record-audio" class="record-row">${y(`mic`)}<span>Registra al microfono</span></button><p id="create-status" role="status"></p>
</dialog>
<dialog id="notation-guide" aria-labelledby="guide-title"><div class="dialog-head"><h2 id="guide-title">Legenda dello spartito</h2>${b(`close-guide`,`Chiudi legenda`,`x`)}</div><div id="guide-switch" role="group" aria-label="Sezione della legenda"><button data-guide="drums">Tamburi</button><button data-guide="cymbals">Piatti</button><button data-guide="signs">Figure e segni</button></div><div id="guide-keys"></div></dialog>
<dialog id="dialog" aria-labelledby="dialog-title"><div class="dialog-head"><h2 id="dialog-title"></h2>${b(`close`,`Chiudi`,`x`)}</div><div id="dialog-body"></div></dialog>
<dialog id="import-progress" aria-labelledby="import-title"><div class="import-symbol">${y(`audio-lines`)}</div>
<span class="eyebrow">Importa brano</span><h2 id="import-title"></h2>
<p id="import-phase" role="status"></p><progress id="import-meter" aria-labelledby="import-phase" max="1" value="0"></progress>
<p id="import-message" aria-live="off" hidden></p>
<div class="import-foot"><span id="import-detail">Analisi sul dispositivo</span><button id="cancel-import">Annulla</button></div></dialog>
<input type="file" id="song-file" accept="audio/mpeg,.mp3" hidden>
<div id="notice" role="status" aria-live="polite"></div>
<input type="file" id="project-file" accept="*/*" hidden><input type="file" id="audio-file" accept="audio/*,.mp3,.wav,.m4a" hidden>`}var S=e=>Math.round(e*12),ue=e=>e/12,de=[4,8,16,32,64],fe=de.map(e=>e*1.5),pe=[...de,...fe],C=e=>fe.includes(e)?`1/`+e/1.5+` T`:`1/`+e,me=[32,16,8,4,2,1,.5],he=new Map;function ge(e,t){let n=t===`dotted`?e*1.5:t===`triplet`?e*2/3:e;he.set(S(n),{value:n,base:e,dotted:t===`dotted`,triplet:t===`triplet`,label:`1/`+32/e+(t===`dotted`?` puntato`:t===`triplet`?` in terzina`:``)})}for(let e of me)for(let t of[`plain`,`dotted`,`triplet`])ge(e,t);var _e=[...he.values()].map(e=>e.value);for(let e of[.25,.125])ge(e,`triplet`);ge(.25,`plain`);var ve=e=>Number.isFinite(e)&&he.get(S(e))?.value===e,ye=e=>he.get(S(e));function be(e){let t=S(e),n=t,r=384;for(;r;)[n,r]=[r,n%r];return t/n+`/`+384/n}var xe=me.map(S),Se=[...he.keys()].sort((e,t)=>t-e);function Ce(e,t,n,r=2,i=0){let a=new Map,o=S(t),s=S(n),c=S(i),l=[];for(let t of e){let e=S(t.tick);a.has(e)||a.set(e,[]),a.get(e).push(t);let n=t.hit??t.rest,i=ye(n.written),o=n.snap_grid?32/n.snap_grid:r,s=i?.triplet?S(n.written):!n.written&&ye(o)?.triplet&&(e+c)%(3*S(o))!=0?S(o):0;if(s){let t=e-(e+c)%(3*s);l.some(e=>e.start===t&&e.cell===s)||l.push({start:t,end:t+3*s,cell:s})}}let u=[...a.keys(),o].sort((e,t)=>e-t),d=[],f=0;for(let e of u)for(;f<e;){let t=a.get(f)??[],n=t.filter(e=>e.hit).map(e=>e.hit),r=t.find(e=>e.rest)?.rest,i=n.find(e=>e.written)?.written??r?.written,o=e-f,u=S(i);if(!u||u>o){let e=l.find(e=>f>=e.start&&f<e.end&&(f-e.start)%e.cell===0);if(e&&e.cell<=o)u=e.cell;else{let e=l.reduce((e,t)=>t.start>f?Math.min(e,t.start-f):e,o),t=n.length?Math.min(e,s):e;u=xe.find(e=>e<=t&&(i||(f+c)%e===0))??Se.find(e=>e<=t)}}d.push({tick:ue(f),value:ue(u),room:ue(o),hits:n,rest:r}),f+=u}return d}var w={kick:[`Cassa`,1],low_tom:[`Tom basso`,3],snare:[`Rullante`,5],mid_tom:[`Tom medio`,6],high_tom:[`Tom alto`,7],ride:[`Ride`,8],hi_hat_closed:[`Hi-hat chiuso`,9],hi_hat_open:[`Hi-hat aperto`,9],crash:[`Crash`,10],hi_hat_pedal:[`Hi-hat a pedale`,-1],unknown:[`Da assegnare`,14]},we=e=>[`hi_hat_closed`,`hi_hat_open`,`crash`,`ride`,`unknown`].includes(e),T=(e,t)=>t?.notation===`single`?`drums`:e.instrument?we(e.instrument)?`cymbals`:`drums`:e.voice,Te=e=>pe.includes(e)||e===384;function Ee(e){if(!e||typeof e.name!=`string`||e.version!==1||!Number.isFinite(e.bpm)||e.bpm<10||e.bpm>500||!Number.isFinite(e.duration)||e.duration<=0||!/^(?:[1-9]|[12]\d|3[0-2])\/(?:2|4|8|16)$/.test(e.meter)||!pe.includes(e.grid??16)||!Array.isArray(e.events)||!Array.isArray(e.automatic))throw Error(`Formato del progetto non valido.`);for(let t of[e.events,e.automatic]){let n=new Set;for(let r of t){if(!r||typeof r.id!=`string`||n.has(r.id)||!Object.hasOwn(w,r.instrument)||!Number.isFinite(r.time)||r.time<0||r.time>e.duration||!Number.isInteger(r.velocity)||r.velocity<1||r.velocity>127||r.written!==void 0&&!ve(r.written)||r.snap_grid!==void 0&&!Te(r.snap_grid)||r.ornament!==void 0&&r.ornament!==`flam`||r.tie_over!==void 0&&typeof r.tie_over!=`boolean`||r.touch!==void 0&&![`accent`,`ghost`].includes(r.touch))throw Error(`Il progetto contiene un colpo non valido.`);n.add(r.id)}}if(e.rests!==void 0){if(!Array.isArray(e.rests))throw Error(`Elenco delle pause non valido.`);let t=new Set(e.events.map(e=>e.id));for(let n of e.rests){if(!n||typeof n.id!=`string`||t.has(n.id)||![`drums`,`cymbals`].includes(n.voice)||!Number.isFinite(n.time)||n.time<0||n.time>=e.duration||!ve(n.written)&&!(n.measure&&n.written===Number(e.meter.split(`/`)[0])*32/Number(e.meter.split(`/`)[1]))||n.snap_grid!==void 0&&!Te(n.snap_grid))throw Error(`Il progetto contiene una pausa non valida.`);t.add(n.id)}}if(e.hidden_rests!==void 0&&(!Array.isArray(e.hidden_rests)||e.hidden_rests.some(t=>!t||![`drums`,`cymbals`].includes(t.voice)||!Number.isFinite(t.time)||t.time<0||t.time>=e.duration||!Number.isFinite(t.written)||t.written<=0)))throw Error(`Indicazioni delle pause non valide.`);if(e.bar_times!==void 0&&(!Array.isArray(e.bar_times)||!e.bar_times.length||e.bar_times.some((t,n,r)=>!Number.isFinite(t)||t<0||t>=e.duration||n&&t<=r[n-1])))throw Error(`Mappa delle battute non valida.`)}function E(e){let[t,n]=e.meter.split(`/`).map(Number),r=32/n,i=t*r,a=32/(e.grid??16),o=e.bar_times??[0],s=i*60/(8*e.bpm),c=o.length>1?o[1]-o[0]:s,l=o.length>1?o.at(-1)-o.at(-2):s,u=Math.ceil(o[0]/c-1e-9),d=[],f=e=>d.push({start:e,length:i});for(let e=0;e<u;e++)f(Math.max(0,o[0]-(u-e)*c));for(o.forEach(f);d.at(-1).start+l<e.duration-1e-8;)f(d.at(-1).start+l);d.forEach((e,t)=>{e.end=d[t+1]?.start??e.start+l}),u&&(d[0].length=Math.max(1,Math.round(i*(d[0].end-d[0].start)/c)));let p=+(d[0].length<i),m=Number.isInteger(e.first_numbered_bar)&&e.first_numbered_bar>=0&&e.first_numbered_bar<d.length?e.first_numbered_bar:e.bar_source===`manual`?u:p;d.forEach((e,t)=>{e.number=t-m+1});function h(t,n,r=e.grid??16){let i=384/r,a=S(t),o=a%i,s=Math.max(0,a-i),c=n*12;return c<=o/2?0:ue(Math.max(0,Math.min(s,o+i*Math.round((c-o)/i))))}function g(t,n=!1,r=e.grid??16){let i=0,a=d.length;for(;i+1<a;){let e=i+a>>1;d[e].start<=t?i=e:a=e}let o=d[i],s=o.length*(t-o.start)/(o.end-o.start);if(!n)return{bar:i,tick:Math.max(0,Math.min(s,o.length))};let c=Math.max(0,o.length-32/r);return i+1<d.length&&s>=(c+o.length)/2?{bar:i+1,tick:0}:{bar:i,tick:h(o.length,s,r)}}return{bars:d,at:g,seconds:(e,t)=>d[e].start+(d[e].end-d[e].start)*t/d[e].length,snapTick:h,beat:r,q:a,full:i,firstComplete:p,notation:e.notation}}function De(e,t){if(!Number.isFinite(t)||t<10||t>500)throw Error(`Scegli un tempo tra 10 e 500 BPM.`);let n=E(e),r=n.bars.find(e=>e.number===1)?.start??n.bars[n.firstComplete]?.start??0,i={bpm:t,bar_source:`aligned`};if(e.bar_times?.length||r>0){let a=n.bars.filter(e=>e.length===n.full||e.start===r).map(n=>r+(n.start-r)*e.bpm/t).filter(t=>t>=0&&t<e.duration);i.bar_times=a.length?a:[r]}return n.bars.some(e=>e.number===1)&&(i.first_numbered_bar=E({...e,...i}).at(r).bar),i}function Oe(e,t,n,r){let{bar:i,tick:a}=e.at(t),o=S(e.q),s=S(e.bars[i].length),c=s%o,l=(a*12-c)/o,u=c+o*(n>0?Math.floor(l+1e-8)+1:Math.ceil(l-1e-8)-1);if(u<0&&a>1e-8&&(u=0),u<0){if(!i)return null;u=Math.max(0,S(e.bars[--i].length)-o)}else if(u>=s){if(!e.bars[++i])return null;u=0}let d=e.seconds(i,u/12);return d<r?d:null}function ke(){let e=60/96,t=[];for(let n=0;n<12;n++){let r=(r,i,a)=>t.push({id:`pocket-`+t.length,time:(4*n+r)*e,instrument:i,velocity:a});for(let e=0;e<8;e++)r(e/2,n%4==0&&!e?`crash`:e===7&&n%3==2?`hi_hat_open`:`hi_hat_closed`,e%2?68:87);for(let e of n%2?[0,1.5,2.5]:[0,2,2.5])r(e,`kick`,104);r(1,`snare`,104),r(3,`snare`,106),n%4==3&&(r(3.5,`high_tom`,88),r(3.75,`low_tom`,96))}return{version:1,name:`Midnight Pocket`,artist:`Drumfolio Sessions`,bpm:96,meter:`4/4`,duration:48*e,grid:16,tracks:{},mode:`stem`,sections:{1:`Groove`,5:`Variazione`,9:`Ripresa`},events:t,automatic:structuredClone(t)}}function Ae(e,t,{firstBar:n=!1}={}){if(!Number.isFinite(t)||t<0||t>=e.duration)throw Error(`Scegli un punto prima della fine del brano.`);let r=E(e),i=r.bars.slice(r.firstComplete),a=i.length?i:r.bars;return je(e,a,a.reduce((e,n)=>Math.abs(n.start-t)<Math.abs(e.start-t)?n:e),t,n)}function je(e,t,n,r,i){let a=r-n.start,o={bar_times:t.map(e=>e===n?r:e.start+a).filter(t=>t>=0&&t<e.duration),bar_source:`aligned`};if(i||Number.isInteger(e.first_numbered_bar)||e.bar_source===`manual`){let t=E({...e,...o}),a=t.at(r).bar;o.first_numbered_bar=i?a:Math.max(0,Math.min(t.bars.length-1,a-n.number+1))}return o}function Me(e,t){if(e.meter!==`4/4`||!Number.isFinite(t)||t<0||t>=e.duration)throw Error(`Seleziona un colpo in una battuta di 4/4.`);let{bars:n,firstComplete:r}=E(e),i=n.slice(r),a=i.map((e,t)=>t?e.start-i[t-1].start:e.end-e.start),o=e=>Math.abs(t-(i[e].start-a[e]/8)),s=i.reduce((e,t,n)=>o(n)<o(e)?n:e,0),c=a[s],l=t+c/8;if(l-c<0){let n=i[s+1],r=n?n.start-i[s].start:240/e.bpm;c=t+r/8+r<e.duration?r:240/e.bpm,l=t+c/8}if(l>=e.duration)throw Error(`Il brano finisce prima dell’uno successivo.`);return{...je(e,i,i[s],l,!0),bar_source:`pickup`}}function Ne(e,t){if(!Number.isInteger(e.first_numbered_bar)&&e.bar_source!==`manual`)return t;let n=E(e).bars.find(e=>e.number===1)?.start;if(n===void 0)return t;let r={...e,...t,first_numbered_bar:void 0};if(e.bar_source===`pickup`)return{...t,...Ae(r,n,{firstBar:!0}),bar_source:`pickup`};let{bars:i,full:a}=E(r),o=i.reduce((e,t,r)=>Math.abs(t.start-n)<Math.abs(i[e].start-n)?r:e,0);if([`manual`,`aligned`,`beat-this-aligned`].includes(e.bar_source)){let e=i.map(e=>e.start);o>0&&i[0].length<a&&e.shift();let s=e.indexOf(i[o].start);e[s]=n;let c={...t,bar_times:e,bar_source:`beat-this-aligned`};return{...c,first_numbered_bar:E({...r,...c}).at(n).bar}}return{...t,first_numbered_bar:o}}function Pe(e,t,n){let r=E(e).at(t).bar;if(!Number.isInteger(n)||n<1||n>r+1)throw Error(`Scegli un numero fra 1 e `+(r+1)+`.`);return r-n+1}function Fe(e,t,n){let r=e.events.find(e=>e.id===t);if(!r||![4,8,16,32,64].includes(n))throw Error(`Scegli un colpo e il valore della terzina.`);let i=E(e),a=e=>i.at(e.time,!0,e.snap_grid),{bar:o,tick:s}=a(r),c=S(s),l=384/(n*1.5),u=c+3*l;if(u>S(i.bars[o].length))throw Error(`La terzina supera la stanghetta. Scegli un valore più breve.`);let d=ue(l),f=new Map,p=[],m=new Map;for(let n of[...e.events,...e.rests??[]]){if(T(n,e)!==T(r,e))continue;let i=a(n),s=S(i.tick);if(!(i.bar!==o||s>=u)){if(s<c){if(n.written&&s+S(n.written)>c)throw Error(`Una figura scritta occupa l’inizio della terzina.`)}else{if(n.voice||(s-c)%l||n.id!==t&&n.written&&n.written!==d)throw Error(`La terzina incontra un’altra figura. Accorciala o scegli un altro punto.`);if(n.instrument===r.instrument){if(m.has(s))throw Error(`Ci sono due colpi sovrapposti in questa posizione.`);m.set(s,n)}}}}for(let t=0;t<3;t++){let n=c+t*l,a=m.get(n),s=i.seconds(o,ue(n));if(s>=e.duration)throw Error(`La terzina supera la fine del brano.`);a?f.set(a.id,{...a,written:d,snap_grid:a.snap_grid??e.grid??16}):p.push({id:crypto.randomUUID(),time:s,instrument:r.instrument,velocity:r.velocity,written:d,snap_grid:384})}return e.events.map(e=>f.get(e.id)??e).concat(p)}var Ie=e=>86-w[e][1]*8/2,D=(e,t,n,r,i=1)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="currentColor" stroke-width="${i}"/>`,O=(e,t,n,r=32)=>`<text class="musicglyph" x="${e}" y="${t}" font-size="${r}">&#x${n};</text>`,Le=[[1.13,.04,.54],[1.13,.57,.01],[1.08,1.5,1.5],[.99,.7,1.01],[1.28,.72,2],[1.46,1.71,2],[1.7,1.72,3.02],[1.94,2.76,3],[2.17,2.79,4]],Re=e=>(58595+Math.log2(32/e)).toString(16).toUpperCase(),ze=[`E0A9`,`E0A8`,`E0A7`],Be={hi_hat_pedal:ze,hi_hat_closed:ze,hi_hat_open:[`E0B3`,`E0B2`,`E0B1`],crash:[`E0BE`,`E0BC`,`E0BB`],ride:[`E0DB`,`E0D9`,`E0D8`],unknown:ze},Ve=[`E0A4`,`E0A3`,`E0A2`],He={hi_hat_pedal:`Croce nello spazio sotto il rigo`,kick:`Primo spazio dal basso`,low_tom:`Secondo spazio dal basso`,snare:`Terzo spazio dal basso`,mid_tom:`Quarta linea dal basso`,high_tom:`Quarto spazio dal basso`,ride:`Rombo sulla linea superiore`,hi_hat_closed:`Croce sopra il rigo`,hi_hat_open:`Croce cerchiata sopra il rigo`,crash:`Triangolo con taglio addizionale`,unknown:`Croce arancione da assegnare`},Ue=e=>e===`hi_hat_closed`?54:e===`ride`?50:Ie(e);function We(e,t,n,r=!1){let i=r?Ue(e):Ie(e),a=n===32?2:+(n===16),o=(Be[e]??Ve)[a];r&&((e===`crash`||e===`hi_hat_open`)&&(o=ze[a]),e===`ride`&&(o=`E0D9`));let s=e===`crash`?D(t-7,i,t+7,i,.75):``;return(r&&e===`hi_hat_open`?`<circle cx="${t}" cy="${i-24}" r="2.3" fill="white" stroke="currentColor" stroke-width=".6"/>`:``)+s+`<g class="${e===`unknown`?`uncertain`:``}">`+O(t-4.4,i,o)+`</g>`}function Ge(e){let t=(e,t,n,r)=>`<li class="legend-row"><svg viewBox="${r}" aria-hidden="true">${n}</svg><div><b>${e}</b><small>${t}</small></div></li>`,n=Array.from({length:5},(e,t)=>D(2,86-t*8,70,86-t*8,.65)).join(``),r=e=>t(w[e][0],He[e],n+We(e,36,8),`0 23 72 75`),i=[[`drums`,`Tamburi`,[`kick`,`low_tom`,`snare`,`mid_tom`,`high_tom`].map(r)],[`cymbals`,`Piatti e altri segni`,[`hi_hat_pedal`,`hi_hat_closed`,`hi_hat_open`,`crash`,`ride`,`unknown`].map(r)],[`signs`,`Figure e segni`,[...[[`Ottavo · 1/8`,`Un tratto di unione o una bandierina`,`E1D7`],[`Sedicesimo · 1/16`,`Due tratti di unione o due bandierine`,`E1D9`],[`Trentaduesimo · 1/32`,`Tre tratti di unione o tre bandierine`,`E1DB`],[`Sessantaquattresimo · 1/64`,`Quattro tratti di unione o quattro bandierine`,`E1DD`],[`Punto di valore`,`Prolunga la figura della metà`,`E1E7`],[`Pausa di quarto`,`Un quarto di silenzio`,`E4E5`],[`Accento`,`Colpo marcato`,`E4A0`]].map(([e,n,r])=>t(e,n,O(18,33,r,26),`0 0 48 55`)),t(`Terzina`,`Tre figure nel tempo di due`,D(5,24,15,24)+D(30,24,41,24)+`<text x="18" y="28">3</text>`,`0 0 48 55`),t(`Ghost note`,`Colpo leggero, indicato tra parentesi`,O(12,33,`E0F5`,26)+O(18,33,`E0A4`,26)+O(27,33,`E0F6`,26),`0 0 48 55`)]]];return(e===`signs`?``:`<p class="key-intro">Conta le linee e gli spazi dal basso verso l’alto.</p>`)+`<div class="key-groups${e?` single`:``}">`+i.filter(([t])=>!e||t===e).map(([,t,n])=>`<section>${e?``:`<h3>`+t+`</h3>`}<ul>${n.join(``)}</ul></section>`).join(``)+`</div>`}function Ke(e,t){for(let n=0;n+1<e.length;n++){let r=e[n].find(e=>e.hit?.tie_over&&e.tick===t.bars[n].length-4);r&&!e[n+1].some(e=>!e.tick)&&e[n+1].push({tick:0,hit:{...r.hit,written:void 0,tie_over:!1,continuation:!0}})}}function qe(e,t,n,r,i,a=[],o=null){let s=o?.width??350,c=o?.left??33,l=o?s-c-12:307,u=t.bars[e],d=u.length,f=e=>c+e*l/d,p=``,m=``,h=``,g=``;for(let e=0;e<5;e++)p+=D(2,86-e*8,s-2,86-e*8,.72);p+=D(2,54,2,86)+D(s-2,54,s-2,86),o?.clef!==!1&&(p+=O(4,70,`E069`,26));let _=[[],[]],v=[];for(let e of n)_[Number(T(e.hit??e.rest,t)===`cymbals`)].push(e);let ee=_.filter(e=>e.length).length,te=Number(i.split(`/`)[0])*t.beat,ne=ee===0&&d===te;function re(n,o,s,c,l=!1){let u=t.seconds(e,n.tick),d=n.rest??{id:`gap-`+e+`-`+c+`-`+S(n.tick),time:u,voice:c,written:n.value,snap_grid:384,implicit:!0,measure:l};if(d.implicit&&a.some(e=>e.voice===c&&Math.abs(e.time-u)<1e-6&&e.written===n.value))return;let f=ye(n.value),m=l?`di battuta · `+i:f.label,h=v.length;v.push({x:o,y:s,rest:d,value:n.value,room:n.room}),p+=`<g class="rest-mark" data-rest-target="`+h+`" aria-label="Pausa `+m+`"><title>Pausa `+m+`</title>`,d.id===r&&(p+=`<circle cx="`+o+`" cy="`+s+`" r="8.3" class="focus-note"/>`);let g=l?32:f.base,_=o-(l?4:2),[ee,te,ne]=Le[Math.log2(32/g)],re=7*ee+(f?.dotted?6:0);p+=`<rect class="rest-hit" x="`+(_-3)+`" y="`+(s-7*te-3)+`" width="`+(re+6)+`" height="`+(7*(te+ne)+6)+`" fill="transparent"/>`,p+=O(_,s,Re(g),28),!l&&f.dotted&&(p+=O(o+8,s,`E1E7`,20)),p+=`</g>`}ne&&re({tick:0,value:d,room:d},f(d/2),62,`drums`,!0);for(let e=0;e<2&&!ne;e++){if(!_[e].length&&(ee||e))continue;let n=t.notation===`single`||e===1,i=n?1:-1,a=Ce(_[e],d,t.beat,t.q,te-d),c=ee<2||_[e].some(e=>e.rest||e.hit?.written),l=ee<2?70:n?46:94;for(let t of a){let i=f(t.tick);if(t.rest||!t.hits.length){let n=t.rest?.measure&&t.value===te;if(c&&re(t,n?f(d/2):i,n?62:l,e?`cymbals`:`drums`,n),!t.hits.length)continue}let{base:a,dotted:u}=ye(t.value),p=o?.traditional?Ue:Ie,m=t.hits.map(e=>p(e.instrument));t.stemX=i+(n?4.3:-4.2),t.top=n?Math.min(...m)-23:Math.max(...m)+22,t.start=n?Math.max(...m):Math.min(...m),t.flags=Math.max(0,Math.log2(8/a));for(let e of t.hits){let n=p(e.instrument);if(v.push({x:i,y:n,hit:e,value:t.value,room:t.room}),e.id===r&&(h+=`<circle cx="${i}" cy="${n}" r="8.3" class="focus-note"/>`),h+=We(e.instrument,i,a,o?.traditional),e.ornament===`flam`){let e=i-9;h+=O(e-2,n+2,`E0A4`,17)+D(e+2,n+2,e+2,n-10,.8)+O(e+2,n-10,`E240`,13)+D(e-1,n-4,e+5,n-8,.8)}if(e.continuation||e.tie_over&&t.tick===d-4){let t=e.continuation?4:i+3,r=e.continuation?i-3:s-3;h+=`<path d="M `+t+` `+(n+2)+` Q `+(t+r)/2+` `+(n+10)+` `+r+` `+(n+2)+`" fill="none" stroke="currentColor" stroke-width="1.3"/>`}u&&(h+=O(i+(e.touch===`ghost`?12:7),n,`E1E7`,20)),e.touch===`ghost`&&(h+=O(i-9,n,`E0F5`,26)+O(i+6,n,`E0F6`,26))}t.hits.some(e=>e.touch===`accent`)&&(h+=O(i-4,n?t.top-4:t.top+8,`E4A0`,22))}for(let e=0;e<a.length;){let t=a[e];if(!ye(t.value)?.triplet){e++;continue}let r=e+1;for(;r<a.length&&r<e+3&&a[r].value===t.value;)r++;if(a.slice(e,r).some(e=>e.hits.length||c)){let e=f(t.tick)-2,i=f(a[r-1].tick)+5,o=(e+i)/2,s=n?16:115,c=n?3:-3;i-e>14&&(p+=D(e,s+c,e,s)+D(e,s,o-4,s)+D(o+4,s,i,s)+D(i,s,i,s+c)),p+=`<text class="tuplet" x="`+o+`" y="`+(s+3)+`" text-anchor="middle" font-size="9" font-style="italic">3</text>`}e=r}for(let e=0;e<a.length;){let r=a[e];if(!r.hits.length||r.value>=32){e++;continue}let o=e;for(;r.flags&&o+1<a.length&&a[o+1].flags&&Math.floor(a[o+1].tick/t.beat)===Math.floor(r.tick/t.beat);)o++;let s=a.slice(e,o+1),c=(n?Math.min:Math.max)(...s.map(e=>e.top));for(let e=0;e<s.length;e++){let t=s[e];if(m+=D(t.stemX,t.start,t.stemX,c,1.1),s.length===1&&t.flags)m+=O(t.stemX,c,(57920+2*(t.flags-1)+ +!n).toString(16),28);else for(let n=0;n<t.flags;n++){let r=c+i*n*3.8;s[e+1]?.flags>n?m+=D(t.stemX,r,s[e+1].stemX,r,2.8):s[e-1]?.flags>n||(m+=D(t.stemX,r,t.stemX+(e?-5:5),r,2.8))}}e=o+1}}for(let e=0;e<d;e++){let n=e+te-d;n%t.beat===0&&(g+=`<text x="${f(e)}" y="129" class="beat">${1+n/t.beat}</text>`)}return{targets:v,html:`<svg class="staff" data-bar="${e}" viewBox="0 0 ${s} 139" role="img" aria-label="${u.number>0?`Battuta `+u.number:d<te?`Anacrusi`:`Intro`}${ne?`, pausa di battuta`:``}">${p}${m}${h}${g}<g class="cursor" visibility="hidden"><line y1="20" y2="114"/><circle cy="20" r="2.8"/></g></svg>`}}var Je;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(Je||={});var Ye=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},Xe=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,Ze=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?Xe(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new Ye(`"${e}" plugin is not implemented on ${c}`,Je.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new Ye(`"${e}.${t}()" is not implemented on ${c}`,Je.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=Ye,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},Qe=(e=>e.Capacitor=Ze(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),$e=Qe.registerPlugin,et=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new Qe.Exception(e,Je.Unimplemented)}unavailable(e=`not available`){return new Qe.Exception(e,Je.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},tt=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),nt=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),rt=class extends et{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=nt(n).trim(),r=nt(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=tt(e.key),n=tt(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};$e(`CapacitorCookies`,{web:()=>new rt});var it=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),at=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},ot=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,st=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=at(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},ct=class extends et{async request(e){let t=st(e,e.webFetchExtra),n=ot(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await it(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};$e(`CapacitorHttp`,{web:()=>new ct});var lt;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(lt||={});var ut;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(ut||={});var dt=class extends et{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};$e(`SystemBars`,{web:()=>new dt});var ft=`modulepreload`,pt=function(e){return`/drumfolio-beta/`+e},mt={},ht=function(e){return e.pathname.endsWith(`.css`)},gt=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},_t=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=pt(t,n);let r=s(t),i=ht(r);return gt(mt,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:ft,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},vt=$e(`App`,{web:()=>_t(()=>import(`./web-CRhOMdP9.js`).then(e=>new e.AppWeb),[])}),yt=$e(`Browser`,{web:()=>_t(()=>import(`./web-BNvlploy.js`).then(e=>new e.BrowserWeb),[])}),bt={BASE_URL:`/drumfolio-beta/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1,VITE_SUPABASE_PUBLISHABLE_KEY:`sb_publishable_TEyTU3tuJHc9kGNAHSJOhg_AJdzNgss`,VITE_SUPABASE_URL:`https://eskaigregmpgljwkhtph.supabase.co`},xt=!!(bt.VITE_SUPABASE_URL&&bt.VITE_SUPABASE_PUBLISHABLE_KEY),St=Qe.isNativePlatform(),Ct={ios:bt.VITE_RC_IOS_KEY,android:bt.VITE_RC_ANDROID_KEY}[Qe.getPlatform()],wt=!!(St&&Ct),Tt=!St,Et=St?`drumfolio://auth/callback`:location.origin+location.pathname,Dt,Ot,kt,At;async function jt(){if(!xt)throw Error(`L’accesso online sarà disponibile dopo la configurazione del servizio.`);return Ot??=_t(async()=>{let{createClient:e}=await import(`./dist-DwhOg3L3.js`);return{createClient:e}},[]).then(({createClient:e})=>e(bt.VITE_SUPABASE_URL,bt.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`,detectSessionInUrl:!St}})),Dt=await Ot,Dt}async function Mt(){return(await jt()).auth}async function Nt(){if(!Tt||!xt)return null;let{data:e,error:t}=await(await Mt()).getSession();if(t)throw t;return e.session?.user??null}async function Pt(e,t){if(!xt)return;let n=await Mt();if(n.onAuthStateChange((t,n)=>setTimeout(()=>e(n?.user??null),0)),!St)return;async function r(e){let r=new URL(e);if(r.protocol!==`drumfolio:`||r.host!==`auth`||r.pathname!==`/callback`)return;let i=r.searchParams.get(`code`);if(i&&i!==At){At=i;try{let{error:e}=await n.exchangeCodeForSession(i);if(e)throw e}catch(e){At=null,t(e)}finally{await yt.close().catch(()=>{})}}}await vt.addListener(`appUrlOpen`,({url:e})=>r(e).catch(t));let i=await vt.getLaunchUrl();i?.url&&await r(i.url)}async function Ft(e,t,n){let r=await Mt();if(e===`google`||e===`apple`){let{data:t,error:n}=await r.signInWithOAuth({provider:e,options:{redirectTo:Et,skipBrowserRedirect:St}});if(n)throw n;St&&await yt.open({url:t.url});return}let i;if(i=e===`register`?await r.signUp({email:t,password:n,options:{emailRedirectTo:Et}}):e===`password`?await r.updateUser({password:n}):await r.signInWithPassword({email:t,password:n}),i.error)throw i.error;return i.data}async function It(){let{error:e}=await(await Mt()).signOut({scope:`local`});if(e)throw e}async function Lt(e){if(!wt)throw Error(`Lo store non è attivo in questa versione.`);kt||=(async()=>{let e=await _t(()=>import(`./esm-DGAMi3RX.js`).then(e=>e.t),__vite__mapDeps([0,1]));return await e.Purchases.configure({apiKey:Ct}),e})().catch(e=>{throw kt=null,e});let t=await kt,n=t.Purchases,r=await n.getAppUserID();return e&&r.appUserID!==e.id?await n.logIn({appUserID:e.id}):!e&&!(await n.isAnonymous()).isAnonymous&&await n.logOut(),t}async function Rt(e){if(!wt)return{active:!1,credits:null,packages:[]};let{Purchases:t}=await Lt(e),[{customerInfo:n},r,i]=await Promise.all([t.getCustomerInfo(),t.getOfferings(),t.getVirtualCurrencies().then(({virtualCurrencies:e})=>Object.values(e.all)).catch(()=>null)]);return{active:!!n.entitlements.active[bt.VITE_RC_ENTITLEMENT||`plus`],credits:i,packages:r.current?.availablePackages??[]}}async function zt(e,t){await(await Lt(e)).Purchases.purchasePackage({aPackage:t})}async function Bt(e){await(await Lt(e)).Purchases.restorePurchases()}async function Vt(e){let{error:t}=await(await Mt()).updateUser({data:{display_name:e}});if(t)throw t}async function Ht(e,t){let n=bt.VITE_MEDIA_RESOLVER_URL;if(!n||!xt)return null;let r=new URL(n);if(r.protocol!==`https:`&&!(r.protocol===`http:`&&[`localhost`,`127.0.0.1`].includes(r.hostname)))throw Error(`Il servizio per i link richiede HTTPS.`);let{data:i,error:a}=await(await Mt()).getSession();if(a)throw a;if(!i.session)return null;let o=await fetch(r,{method:`POST`,signal:t,redirect:`error`,credentials:`omit`,headers:{"Content-Type":`application/json`,Authorization:`Bearer `+i.session.access_token},body:JSON.stringify({url:e.href})});if(!o.ok)throw Error(`Il servizio non ha potuto leggere questo post.`);let s=decodeURIComponent(o.headers.get(`X-Audio-Title`)||`Audio dal post`);return new File([await o.blob()],s+`.m4a`,{type:`audio/mp4`})}function Ut(e){Ee(e);let t=e=>typeof e==`string`?e.slice(0,500):void 0,n=e=>e.map(({id:e,time:t,instrument:n,velocity:r,written:i,touch:a,ornament:o,tie_over:s,snap_grid:c})=>({id:e,time:t,instrument:n,velocity:r,written:i,touch:a,ornament:o,tie_over:s,snap_grid:c}));return{version:1,name:t(e.name),score_title:t(e.score_title),artist:t(e.artist),notation:e.notation===`single`?`single`:void 0,bpm:e.bpm,meter:e.meter,duration:e.duration,grid:e.grid??16,bar_times:e.bar_times,bar_source:t(e.bar_source),first_numbered_bar:Number.isInteger(e.first_numbered_bar)?e.first_numbered_bar:void 0,sections:e.sections?Object.fromEntries(Object.entries(e.sections).filter(([e,t])=>/^\d+$/.test(e)&&typeof t==`string`).map(([e,n])=>[e,t(n)])):void 0,events:n(e.events),automatic:n(e.automatic),hidden_rests:e.hidden_rests?.map(({time:e,voice:t,written:n})=>({time:e,voice:t,written:n})),rests:e.rests?.map(({id:e,time:t,voice:n,written:r,measure:i,snap_grid:a})=>({id:e,time:t,voice:n,written:r,measure:i,snap_grid:a}))}}var Wt,Gt=!1,Kt,qt=``;function Jt(e){qt=e,window.dispatchEvent(new Event(`sync-status`))}function Yt(e=800){o()&&(clearTimeout(Kt),Kt=setTimeout(Qt,e))}function Xt(e){if(e.error)throw e.error;return e.data}async function Zt(){let e=o(),t=await jt(),n=()=>t.from(`drumfolio_scores`),r=await _(),i=new Map(r.map(e=>[e.id,e])),a=new Set,s=new Map;for(let t=0;;t+=250){let r=Xt(await n().select(`id,revision`).eq(`owner_id`,e).order(`id`).range(t,t+249));for(let e of r)s.set(e.id,e.revision);if(r.length<250)break}for(let[e,t]of s){let n=i.get(e);t!==n?.revision&&t!==n?.change&&a.add(e)}for(let t of r)if(t.change&&!a.has(t.id)){if(s.get(t.id)!==t.change){let r={score:Ut(t.project),revision:t.change};if(t.revision){if(Xt(await n().update(r).eq(`owner_id`,e).eq(`id`,t.id).eq(`revision`,t.revision).select(`id`)).length===0){a.add(t.id);continue}}else{let i=await n().insert({...r,id:t.id,owner_id:e});if(i.error?.code===`23505`){a.add(t.id);continue}Xt(i)}}await p(t.id,e=>{if(e&&e.revision===t.revision)return{...e,revision:t.change,change:e.change===t.change?null:e.change}})}for(let t of a){let r=Xt(await n().select(`id,score,revision`).eq(`owner_id`,e).eq(`id`,t).single());Ee(r.score);let i=await ae(r);i===`conflict`&&(Gt=!0,window.dispatchEvent(new Event(`score-conflict`))),i&&window.dispatchEvent(new CustomEvent(`remote-score`,{detail:t}))}}function Qt(){if(!o())return;if(Wt)return Gt=!0,Wt;let e=async()=>{do Gt=!1,await Zt();while(Gt);Jt(`Spartiti sincronizzati`)};return Jt(`Sincronizzazione in corso…`),Wt=Promise.resolve().then(()=>navigator.locks?navigator.locks.request(`drumfolio-sync-`+o(),e):e()).catch(()=>Jt(`Sincronizzazione in attesa. Le modifiche sono salvate sul dispositivo.`)).finally(()=>{Wt=null}),Wt}function $t(){o()&&(window.addEventListener(`score-written`,()=>Yt()),window.addEventListener(`online`,()=>Yt(0)),document.addEventListener(`visibilitychange`,()=>{document.hidden||Yt(0)}),setInterval(()=>{!document.hidden&&navigator.onLine&&Yt(0)},6e4),Qt())}var k=(e,t,n,r=``)=>`<button class="menu-row" data-act="${x(e)}"><i>${y(t)}</i><span><strong>${x(n)}</strong>${r?`<small>`+x(r)+`</small>`:``}</span>${y(`chevron-right`)}</button>`,en=(e,t=``)=>`<div class="page-head"><h1>${x(e)}</h1>${t?`<p>`+x(t)+`</p>`:``}</div>`,A=(e,t)=>`<section class="section-group"><h2>${x(e)}</h2><div class="section-card">${t}</div></section>`,tn=(e,t)=>`<button class="mint-button" data-act="${e}">${x(t)}</button>`,nn=(e,t)=>`<details><summary>${x(e)}${y(`chevron-down`)}</summary><p>${x(t)}</p></details>`,rn=[[`Come scrivo una rullata in trentaduesimi?`,`Durante l’importazione Drumfolio cerca le sequenze di rullante al tempo del brano e scrive i colpi riconosciuti in 1/32. Per inserire una rullata a mano, seleziona il primo colpo di rullante, tocca Rullata 1/32, indica il numero di colpi e scegli Scrivi rullata. Quattro colpi occupano un ottavo, otto occupano un quarto. Se hai la batteria isolata sul dispositivo puoi anche rilevare la sequenza e applicare la proposta. Annulla ripristina sia i colpi sia la griglia.`],[`Come importo un brano?`,`Tocca il +, scegli un file da File o Download e tieni Drumfolio in primo piano. La batteria viene separata sul dispositivo. Al termine si apre lo spartito.`],[`Come correggo un colpo?`,`In Studio tocca la nota e scegli lo strumento, oppure trascinala. Vicino al dito compare il nome e senti il suono quando cambi strumento. Per passare da hi-hat aperto a chiuso, che condividono la posizione, usa Strumento. Con un doppio tocco aggiungi un colpo. Con il cestino lo elimini.`],[`Come scrivo durate e pause?`,`Seleziona una nota e cambia Valore, oppure dimezzalo o raddoppialo con − e +. I colpi simultanei con lo stesso gambo condividono la durata. Puoi scegliere anche un valore puntato o cambiare il tocco in accento o ghost note. Per scrivere una pausa tocca Inserisci pausa, scegli il valore e tocca il rigo nella voce dei tamburi o dei piatti. Seleziona una pausa scritta per cambiarla, eliminarla o trasformarla in un colpo. Annulla e Ripristina sono sotto lo spartito.`],[`Come scelgo l’inizio della battuta 1?`,`In Studio tocca Inizio battute e poi il punto sul rigo dove senti l’uno. Per usare la posizione del player, scegli Usa cursore. Se il brano inizia sul levare del 4, seleziona quel colpo e tocca Usa come levare del 4. La battuta 1 inizierà un ottavo dopo. Con Annulla recuperi la griglia precedente.`],[`Come ascolto soltanto la batteria?`,`Nel player tocca la sorgente audio e scegli Batteria isolata. Per confrontarla con la trascrizione scegli Suoni dello spartito.`],[`Come suono con la modalità Live?`,`Apri un brano, tocca Live e avvia il player. Il cursore segue il tempo. Il pulsante con le due frecce mette in loop la battuta corrente.`],[`Dove sono i miei brani?`,`Da ospite i brani restano sul dispositivo. Nella beta web, accedendo con Google puoi sincronizzare spartiti e correzioni. Originale e batteria isolata restano sul dispositivo.`],[`Posso usare il link di un post?`,`Incolla il link nella nuova trascrizione. Per YouTube, Instagram e TikTok scegli anche il file del post. Drumfolio conserva il riferimento accanto al brano.`]],an=new Set([`studio`,`repertorio`,`supporto`,`account`,`altro`,`accesso`,`registrazione`,`profilo`,`plus`,`legenda`,`licenze`,`password`,`numerazione`]);function on(t){let n=document.getElementById(`section-screen`),r=document.getElementById(`app-nav`),i=e=>document.getElementById(e),a=`repertorio`,s=`repertorio`,c=0,l=t.user,d=null,f=null,p=!1;function m(){let e=location.hash.slice(1);return!an.has(e)||[`studio`,`numerazione`].includes(e)&&!t.active()?`repertorio`:e}function g(e){m()===e?C():location.hash=e}function v(e){t.notify(e?.message||`Operazione interrotta.`)}async function te(){let e=l?`profile:`+l.id:`profile:guest`,t=await u(`settings`,e);return t||(t={id:l?.id??crypto.randomUUID(),name:``},await h(`settings`,e,t)),t}let ne=()=>d?.name||l?.user_metadata?.display_name||l?.email||`Musicista ospite`;function ae(){let e=[`accesso`,`registrazione`,`profilo`,`password`,`plus`].includes(a)?`account`:[`legenda`,`licenze`,`numerazione`].includes(a)?`altro`:a;r.querySelectorAll(`[data-route]`).forEach(t=>{t.dataset.route===e?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)})}function oe(e){let n=e.project,r=n.artist||n.name.split(` - `).slice(0,-1).join(` - `),i=n.score_title||n.name.split(` - `).at(-1),a=[r,ce(n.duration),Math.round(n.bpm)+` BPM`].filter(Boolean).join(` · `);return`<button class="song-row" data-score="${x(e.id)}"><i class="record-disc">${y(`disc-3`)}</i><span><strong>${x(i)}</strong><small>${x(a)}</small></span>${e.id===t.active()?`<b class="open-dot" title="Spartito aperto"></b>`:y(`chevron-right`)}</button>`}async function b(){let[e,t]=await Promise.all([_(),u(`settings`,`pending-song`)]),n=e.filter(e=>e.id!==`pocket-study`).sort((e,t)=>e.project.name.localeCompare(t.project.name,`it`)),r=`<section class="home-hero"><div class="home-hero-content"><h1>${n.length?`Nuova trascrizione`:`Il tuo primo brano`}</h1>
      <p>Importa una canzone per ottenere lo spartito modificabile della batteria.</p>
      <button class="home-upload" data-act="new">${y(`upload`)}Carica un brano</button></div></section>`,i=n.length?`<div class="section-card">${n.map(oe).join(``)}</div>`:`<div class="home-empty">${y(`folder-open`)}<div><strong>Nessun brano salvato</strong><p>${l&&Tt?`Qui ritrovi anche gli spartiti sincronizzati.`:`I brani che importi vengono salvati su questo dispositivo.`}</p></div></div>`;return r+(t?A(`Importazione incompleta`,k(`resume`,`history`,`Riprendi importazione`,t.file.name)+k(`discard`,`trash-2`,`Scarta importazione incompleta`)):``)+`<section aria-labelledby="home-songs"><div class="catalog-title"><h2 id="home-songs">Il tuo repertorio</h2>${n.length?`<span>`+n.length+`</span>`:``}</div>${i}</section>
      <div class="home-shortcuts">${k(`project`,`folder-open`,`Apri un progetto`,`File .drums`)}${k(`demo`,`headphones`,`Prova una demo`,`Midnight Pocket`)}</div>`}function se(){return en(`Supporto`,`Guida a Drumfolio Studio`)+A(`Domande frequenti`,rn.map(([e,t])=>nn(e,t)).join(``))+k(`legenda`,`book-open`,`Legenda dello spartito`)}async function le(){d=await te();let e=ne();return en(`Account`)+`<div class="profile-card"><div class="avatar">${x(e.trim().slice(0,1).toUpperCase())}</div><h2>${x(e)}</h2><p>${x(l?.email||`Profilo su questo dispositivo`)}</p><small>ID · ${x(d.id)}</small>${tn(`profilo`,`Modifica profilo`)}</div>`+(l?``:A(`Accesso`,k(`accesso`,`log-in`,`Accedi o registrati`)))+(Tt?``:A(`Crediti e abbonamento`,`<div id="balance" class="balance" aria-live="polite">${wt?`Caricamento saldo…`:`Trascrizione locale inclusa`}</div>`+k(`plus`,`ticket`,`Drumfolio Plus`,`Piani e ripristino acquisti`)))+(Tt&&l?await ue():``)+(l?A(`Gestione account`,(Tt?``:k(`password`,`lock-keyhole`,`Cambia password`))+k(`logout`,`log-in`,`Esci dall’account`)):``)}let S=e=>`<strong>${e.active?`Drumfolio Plus`:`Piano Studio`}</strong>${e.credits===null?`<p>Saldo crediti temporaneamente non disponibile.</p>`:e.credits.map(e=>`<p>`+x(e.name)+` · `+x(e.balance)+`</p>`).join(``)}`;async function ue(){let e=(await re()).map(e=>k(`adopt-`+e.id,`cloud-upload`,e.project.score_title||e.project.name,`Copia nel mio account`)).join(``);return A(`Sincronizzazione`,`<p class="page-note" id="sync-status" role="status">${x(qt||`Spartiti e correzioni nel tuo account`)}</p>`+k(`sync`,`cloud-upload`,`Sincronizza ora`,`MP3 e batteria isolata restano sul dispositivo`))+(e?A(`Scegli uno spartito ospite da copiare`,e):``)}function de(){if(Tt)return`<div class="login-image"></div>`+en(`Accedi a Drumfolio`,`Ritrova spartiti e correzioni sui tuoi dispositivi.`)+`<div class="providers"><button data-act="google" `+(xt?``:`disabled`)+`>Continua con Google</button></div>`+(xt?``:`<p class="page-note">Accesso Google non configurato in questa anteprima.</p>`)+`<div class="end-actions">`+tn(`repertorio`,`Continua come ospite`)+`</div>`;let e=a===`registrazione`,t=a===`password`,n=xt?``:` disabled`;return`<div class="login-image"></div>`+en(t?`Cambia password`:e?`Crea un account`:`Accedi a Drumfolio`)+(xt?``:`<div class="guest-access"><p>Il profilo ospite è disponibile su questo dispositivo. L’accesso online richiede il collegamento del servizio account.</p>`+tn(`repertorio`,`Continua come ospite`)+`</div>`)+`<form class="account-form" id="auth-form">${t?``:`<label>Email<input name="email" type="email" autocomplete="email" required`+n+`></label>`}<label>${t?`Nuova password`:`Password`}<input name="password" type="password" autocomplete="${e||t?`new-password`:`current-password`}" ${e||t?`minlength="8"`:``} required${n}></label><button class="mint-button" ${n}>${t?`Salva password`:e?`Crea account`:`Accedi`}</button></form>`+(t?``:`<div class="providers"><button data-act="google"${n}>Continua con Google</button><button data-act="apple"${n}>Continua con Apple</button></div>`)+(t?``:`<div class="end-actions"><button data-act="${e?`accesso`:`registrazione`}">${e?`Ho già un account`:`Registrati`}</button>${xt?`<button data-act="repertorio">Continua come ospite</button>`:``}</div>`)}async function fe(){if(a===`repertorio`)return b();if(a===`supporto`)return se();if(a===`account`)return le();if([`accesso`,`registrazione`,`password`].includes(a))return de();if(a===`profilo`)return d=await te(),en(`Modifica profilo`)+`<form id="profile-form" class="account-form"><label>Nome visualizzato<input name="name" required maxlength="60" value="${x(d.name||l?.user_metadata?.display_name||``)}" placeholder="Il tuo nome"></label><button class="mint-button">Salva profilo</button></form>`;if(a===`plus`&&Tt)return le();if(a===`plus`)return en(`Drumfolio Plus`)+A(`Abbonamento`,`<div id="offers" class="balance" role="status">`+(wt?`Caricamento piani…`:`Gli acquisti saranno disponibili con la distribuzione sugli store. Le trascrizioni locali sono già incluse.`)+`</div>`)+`<button class="secondary-btn" data-act="restore" ${wt?``:`disabled`}>${y(`history`)}Ripristina acquisti</button>`;if(a===`numerazione`){let e=t.barInfo();return en(`Numera la battuta`,`Il cursore si trova nella battuta che inizia a `+e.time.toFixed(2).replace(`.`,`,`)+` s.`)+`<form id="bar-form" class="account-form"><label>Numero di battuta<input name="bar" type="number" inputmode="numeric" min="1" max="${e.max}" step="1" value="${Math.max(1,e.number)}" required></label><p class="page-note">La numerazione automatica conta anche le battute intere di pausa. Puoi scegliere qui un primo numero diverso.</p><button class="mint-button">Applica allo spartito</button></form><button class="secondary-btn reset-count" data-act="auto-bars">Conta tutte le battute intere</button>`}if(a===`legenda`)return en(`Legenda dello spartito`)+Ge();if(a===`licenze`){let e=await fetch(`/drumfolio-beta/third-party.txt`);if(!e.ok)throw Error(`Licenze non disponibili.`);return en(`Licenze`)+`<pre class="licenses">`+x(await e.text())+`</pre>`}let n=``;try{let e=new URL(t.sourceLink());e.protocol===`https:`&&!e.username&&!e.password&&(n=A(`Fonte del brano`,`<a class="source-link" target="_blank" rel="noopener noreferrer" href="`+x(e.href)+`">`+x(e.hostname)+` `+y(`external-link`)+`</a>`))}catch{}return en(`Altro`)+n+A(`Studio`,(t.active()?k(`numerazione`,`list-music`,`Numera la battuta al cursore`):``)+k(`legenda`,`drum`,`Legenda dello spartito`)+k(`project`,`folder-open`,`Apri progetto .drums`)+k(`supporto`,`headset`,`Supporto`))+A(`Drumfolio`,(Tt?``:k(`plus`,`ticket`,`Piani e acquisti`))+k(`licenze`,`book-open`,`Licenze software`))+(Tt?`<p class="page-note"><a href="/drumfolio-beta/privacy.html">Privacy della beta</a></p>`:``)+`<p class="page-note">Drumfolio Studio · `+x(e.version)+`</p>`}async function pe(e){try{let t=await Rt(l);if(e!==c)return;f=t,a===`account`&&(i(`balance`).innerHTML=S(t)),a===`plus`&&(i(`offers`).innerHTML=S(t)+(t.packages.length?t.packages.map((e,t)=>k(`buy-`+t,`ticket`,e.product.title,e.product.priceString)).join(``):`<p>Nessun piano disponibile nello store.</p>`))}catch{e===c&&((i(`balance`)||i(`offers`)).textContent=`Store irraggiungibile. Riapri questa sezione per riprovare.`)}}async function C(){let e=++c;a=m();let r=a===`studio`;r||t.pause(),document.body.classList.toggle(`section-open`,!r),document.body.classList.toggle(`studio-open`,r),i(`workspace`).hidden=!r,n.hidden=r,document.querySelector(`.transport`).hidden=!r,document.querySelector(`.modes`).hidden=!r;let o=a===`repertorio`;(o||r)&&(s=a),document.body.classList.toggle(`home-open`,o),i(`home-account`).hidden=!o,i(`home-account`).innerHTML=y(`circle-user-round`)+(l?`Il mio account`:`Accedi`),i(`library`).hidden=o;let u=r?`Torna alla Home`:s===`studio`?`Torna allo spartito`:`Torna al repertorio`;if(i(`library`).setAttribute(`aria-label`,u),i(`library`).title=u,i(`library`).classList.toggle(`home-link`,r),i(`library`).innerHTML=r?y(`house`)+`<span>Home</span>`:y(`arrow-left`),i(`upgrade`).hidden=Tt||r||a===`plus`,ae(),window.scrollTo(0,0),r)n.replaceChildren();else{n.setAttribute(`aria-busy`,`true`),n.replaceChildren();try{let t=await fe();if(e!==c)return;n.innerHTML=t+`<p id="page-status" class="page-note" role="status"></p>`,wt&&[`account`,`plus`].includes(a)&&pe(e)}catch(t){e===c&&(n.textContent=t.message)}finally{e===c&&n.removeAttribute(`aria-busy`)}}}let me=e=>{i(`page-status`)?i(`page-status`).textContent=e:t.notify(e)};async function he(e){if(an.has(e))g(e);else if(e===`sync`)await Qt(),await C();else if(e.startsWith(`adopt-`)&&l)await ie(e.slice(6)),await C();else if(e===`auto-bars`)await t.numberBar(null);else if(e===`demo`)await t.openDemo();else if(e===`new`)t.create();else if(e===`file`)i(`song-file`).click();else if(e===`project`)i(`project-file`).click();else if(e===`resume`){let e=await u(`settings`,`pending-song`);e&&await t.resume(e)}else if(e===`discard`)await ee(),await C();else if(e===`login`||e===`google`||e===`apple`)await Ft(e);else if(e===`logout`)await It(),g(`account`);else if(e===`restore`||e.startsWith(`buy-`)){if(p)return;p=!0;try{e===`restore`?await Bt(l):await zt(l,f.packages[Number(e.slice(4))]),await C(),me(e===`restore`?`Verifica acquisti completata.`:`Acquisto completato.`)}finally{p=!1}}}return r.onclick=e=>{let n=e.target.closest(`button`);n&&(n.id===`new-action`?t.create():g(n.dataset.route))},n.onclick=e=>{let n=e.target.closest(`button`);n&&(n.dataset.score?u(`scores`,n.dataset.score).then(e=>t.open(e)).catch(v):n.dataset.act&&he(n.dataset.act).catch(e=>me(e.message)))},n.onsubmit=async e=>{if(e.preventDefault(),p)return;p=!0;let n=e.target,r=new FormData(n),i=n.querySelector(`button[type=submit],.mint-button`);i.disabled=!0;try{if(n.id===`bar-form`)await t.numberBar(Number(r.get(`bar`)));else if(n.id===`profile-form`){let e=String(r.get(`name`)).trim();if(!e)throw Error(`Inserisci un nome.`);l&&await Vt(e),await h(`settings`,l?`profile:`+l.id:`profile:guest`,{...d,name:e}),g(`account`)}else{let e=a===`registrazione`,t=await Ft(a===`password`?`password`:e?`register`:`login`,r.get(`email`),r.get(`password`));e&&!t?.session?me(`Controlla la tua email per confermare la registrazione.`):g(`account`)}}catch(e){me(e.message)}finally{p=!1,i.disabled=!1}},i(`upgrade`).onclick=()=>g(`plus`),i(`home-account`).onclick=()=>g(l?`account`:`accesso`),i(`library`).onclick=()=>g(a===`studio`?`repertorio`:s),window.addEventListener(`hashchange`,C),Qe.getPlatform()===`android`&&vt.addListener(`backButton`,()=>{let e=document.querySelector(`dialog[open]`);if(e){let t=new Event(`cancel`,{cancelable:!0});e.dispatchEvent(t)&&e.close()}else a===`repertorio`?vt.minimizeApp():g([`registrazione`,`profilo`,`plus`,`password`].includes(a)?`account`:`repertorio`)}),Pt(e=>{let n=l?.id!==e?.id||l?.email!==e?.email||l?.user_metadata?.display_name!==e?.user_metadata?.display_name;Tt&&(e?.id??null)!==o()?(document.body.inert=!0,t.pause(),location.replace(location.pathname+location.search+`#account`),location.reload()):(l=e,e&&[`accesso`,`registrazione`].includes(a)?g(`account`):n&&a!==`studio`&&C())},v).catch(v),window.addEventListener(`sync-status`,()=>{i(`sync-status`)&&(i(`sync-status`).textContent=qt)}),window.addEventListener(`remote-score`,()=>{a===`repertorio`&&C()}),{go:g,render:C}}var sn=`audio/*,video/mp4,.mp3,.wav,.m4a,.aac,.flac,.ogg,.webm,.mp4,.mid,.midi`;function cn(e){return/(^|\.)(youtube\.com|youtu\.be|instagram\.com|tiktok\.com)$/.test(e.hostname.toLowerCase())}function ln(e){let t;try{t=new URL(e.trim())}catch{throw Error(`Inserisci un collegamento HTTPS completo.`)}if(t.protocol!==`https:`||t.username||t.password)throw Error(`Usa un collegamento HTTPS pubblico.`);return t}async function un(e,t){let n=await fetch(e,{signal:t,credentials:`omit`,referrerPolicy:`no-referrer`});if(!n.ok)throw Error(`Il link non ha restituito un file audio.`);let r=n.headers.get(`Content-Type`)?.split(`;`)[0]??``;if(r.startsWith(`text/`)||r===`application/json`)throw Error(`Il link apre una pagina. Abbina il file audio per trascriverlo.`);let i=decodeURIComponent(e.pathname.split(`/`).pop()||`Audio da link`);return new File([await n.blob()],i,{type:r})}async function dn(){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error(`Il microfono non è accessibile. Puoi importare una registrazione dai File.`);let e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),t=()=>e.getTracks().forEach(e=>e.stop());try{let n=[`audio/mp4`,`audio/webm;codecs=opus`,`audio/ogg;codecs=opus`].find(e=>MediaRecorder.isTypeSupported(e)),r=new MediaRecorder(e,n?{mimeType:n}:{}),i=[],a=new Promise((e,a)=>{r.ondataavailable=e=>{e.data.size&&i.push(e.data)},r.onstop=()=>{t();let a=r.mimeType||i[0]?.type||n||`audio/mp4`,o=a.includes(`webm`)?`webm`:a.includes(`ogg`)?`ogg`:`m4a`,s=new Date().toISOString().slice(0,19).replace(`T`,` `).replaceAll(`:`,`-`);e(new File(i,`Registrazione `+s+`.`+o,{type:a}))},r.onerror=()=>{t(),a(Error(`La registrazione è stata interrotta.`))}});return r.start(1e3),{result:a,stop(){r.state===`inactive`?t():r.stop()}}}catch(e){throw t(),e}}function fn({importFile:e,pause:t}){let n=e=>document.getElementById(e),r=n(`create-sheet`),i=n(`create-status`),a=n(`song-file`),o,s,c,l,u=0,d=n(`record-audio`),f=n(`pick-song`);a.accept=sn;function p(e){n(`separation-mode`).disabled=e,f.disabled=e,n(`link-form`).querySelector(`button`).disabled=e,n(`import-url`).disabled=e}function m(){r.open&&r.close()}function h(){u++,o&&=(o.stop(),null),clearInterval(s),c?.abort(),c=null,l=null,n(`separation-mode`).value=`fast`,p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`,n(`link-form`).reset(),i.textContent=``,f.querySelector(`strong`).textContent=`Scegli un file`}function g(){r.open||(t(),h(),r.showModal())}function _(e){i.textContent=e.name===`NotAllowedError`?`Consenti il microfono nelle impostazioni di Drumfolio.`:e.message||`Operazione interrotta.`}async function v(t,r){let i=n(`separation-mode`).value;m(),await e(t,r,i)}return r.addEventListener(`close`,h),r.onclick=e=>{if(e.target===r){let t=r.getBoundingClientRect();(e.clientY<t.top||e.clientX<t.left||e.clientX>t.right)&&m()}},n(`close-create`).onclick=m,f.onclick=()=>a.click(),a.onchange=async e=>{let t=e.target.files[0];a.value=``,t&&await v(t,l)},n(`import-url`).oninput=()=>{l=null,f.querySelector(`strong`).textContent=`Scegli un file`,i.textContent=``},n(`link-form`).onsubmit=async e=>{e.preventDefault();let t=u;try{let e=ln(n(`import-url`).value);l=e.href,p(!0),d.disabled=!0,i.textContent=`Lettura del link…`,c=new AbortController;let r=cn(e);r&&(f.querySelector(`strong`).textContent=`Abbina il file del post`);let a=r?await Ht(e,c.signal):await un(e,c.signal);if(!a){i.textContent=`Collega il file audio o video del post. Il link verrà salvato insieme allo spartito.`;return}t===u&&await v(a,e.href)}catch(e){t===u&&e.name!==`AbortError`&&(i.textContent=(e instanceof TypeError?`Il sito non consente di scaricare il file da questo link.`:e.message)+` Puoi scegliere il file dal dispositivo.`)}finally{t===u&&(p(!1),d.disabled=!1)}},d.onclick=async()=>{if(o){d.disabled=!0,o.stop();return}let e=u;p(!0),d.disabled=!0;try{let t=await dn();if(e!==u){t.stop(),await t.result;return}o=t,d.disabled=!1,d.classList.add(`recording`);let n=Date.now(),r=()=>{d.querySelector(`span`).textContent=`Termina e trascrivi · `+ce((Date.now()-n)/1e3)};r(),s=setInterval(r,300),i.textContent=`Registrazione in corso`;let a=await t.result;e===u&&await v(a)}catch(t){e===u&&_(t)}finally{e===u&&(o=null,clearInterval(s),p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`)}},g}var pn=[`Stiamo preparando lo spartito della tua canzone, un colpo alla volta.`,`Puoi già scaldare i polsi. Il paradiddle sul tavolo vale come riscaldamento.`,`Ci vuole un po’, perché ci piace fare le cose per bene. Anche le pause.`,`Se stai tenendo il tempo con il piede, siamo già in due.`,`Le ghost note parlano piano. Qui in studio c’è posto anche per chi sussurra.`,`Hai presente quella bacchetta spaiata? È un buon momento per cercare la sua gemella.`,`Grazie della pazienza. Stiamo dando a ogni colpo il suo posto sul rigo.`,`Un saluto a chi è partito con due colpetti sul tavolo e adesso sta facendo un assolo.`,`La cassa fa «tum», il rullante risponde «pa». La conversazione promette bene.`,`Prova a contare fino a quattro senza muovere la testa. Difficile, eh?`,`Un ottavo puntato è un ottavo che si è fermato ancora un po’.`,`La cosa bella di una batteria immaginaria? Puoi avere tutti i tom che vuoi.`,`Uno, due, tre, quattro… E niente, ci siamo ricascati.`,`Le ginocchia fanno da tom, il pavimento da cassa. Chi ha bisogno della sala prove?`,`Tra batteristi ci si capisce. A volte basta dire «pa-pa-tum».`,`Bacchette pronte? C’è un leggio che aspetta proprio questa canzone.`],mn=0;function hn(e){function t(){e.textContent=pn[mn],mn=(mn+1)%pn.length}t(),e.hidden=!1;let n=window.setInterval(t,8e3);return()=>{window.clearInterval(n),e.hidden=!0,e.textContent=``}}var gn=e=>e===`snare`||e.endsWith(`_tom`)||e===`unknown`;function _n(e,t){let n=e.bars[e.at(t).bar];return(n.end-n.start)/n.length}function vn(e,t,n){let r=[],i=[];for(let a of e){if(i.length){let e=i.at(-1),o=_n(t,e.time);Math.abs(a.time-e.time-o)>o*.22&&(i.length>=n&&r.push(i),i=[])}i.push(a)}return i.length>=n&&r.push(i),r}function yn(e,t){return vn(e.filter(e=>e.instrument===`snare`).sort((e,t)=>e.time-t.time),t,3)}function bn(e,t,n){let r=e.events.find(e=>e.id===t&&e.instrument===`snare`);if(!r||!Number.isInteger(n)||n<2||n>32)throw Error(`Seleziona il primo rullante e scegli da 2 a 32 colpi.`);let i=E({...e,grid:32}),{bar:a,tick:o}=i.at(r.time,!0),s=r.time-i.seconds(a,o),c=[];for(let t=0;t<n;t++){if(!i.bars[a])throw Error(`La rullata supera la fine del brano.`);let t=i.seconds(a,o)+s;if(t>=e.duration)throw Error(`La rullata supera la fine del brano.`);c.push({time:t,velocity:r.velocity}),++o===i.bars[a].length&&(a++,o=0)}return Sn(e,i,c,!1)}function xn(e,t){return Sn(e,E({...e,grid:32}),t,!0)}function Sn(e,t,n,r){let i=0,a=t.bars.map(e=>{let t=i;return i+=e.length,t}),o=e=>{let n=t.at(e,!0);return a[n.bar]+n.tick},s=new Map,c=[],l=new Set,u=new Map(e.events.map(e=>[e.id,e])),d=new Map;for(let t of[...e.events,...e.rests??[]]){if(T(t,e)!==`drums`)continue;let n=o(t.time);for(let e=n;e<n+(t.written||1);e++)d.has(e)||d.set(e,[]),d.get(e).push(t)}for(let i of n){let n=o(i.time);if(l.has(n))throw Error(`Due attacchi cadono nella stessa posizione. Verifica l’allineamento della battuta.`);l.add(n);let a=d.get(n)??[],f=a.find(e=>e.instrument===`snare`&&o(e.time)===n);if(!f&&r){let r=_n(t,i.time)*.31,a=e.automatic.filter(e=>gn(e.instrument)&&Math.abs(e.time-i.time)<r).sort((e,t)=>Math.abs(e.time-i.time)-Math.abs(t.time-i.time))[0];if(a&&(f=u.get(a.id),!f||f.instrument!==a.instrument||f.time!==a.time||o(f.time)!==n))throw Error(`Qui c’è una correzione manuale. Scegli il numero di colpi per scrivere la rullata.`)}for(let e of a){if(e.voice)throw Error(`La rullata incontra una pausa scritta. Accorciala o eliminala prima di continuare.`);if(e.written>1&&e.id!==f?.id&&!s.has(e.id))throw Error(`La rullata incontra una figura lunga nella stessa voce. Accorciala prima di continuare.`)}f?s.set(f.id,{...f,instrument:`snare`,snap_grid:32,written:1}):c.push({id:crypto.randomUUID(),instrument:`snare`,time:i.time,velocity:i.velocity,snap_grid:32,written:1})}return e.events.map(e=>s.get(e.id)??e).concat(c)}async function Cn(e,t){let n=await e.arrayBuffer(),r=n.byteLength>=4&&new DataView(n).getUint32(0)===1716281667;try{return await t.decodeAudioData(r?n.slice(0):n)}catch(e){if(!r)throw e}let{FLACDecoder:i}=await _t(async()=>{let{FLACDecoder:e}=await import(`./flac-BqfAJ19Z.js`);return{FLACDecoder:e}},[]),a=new i;await a.ready;try{let{channelData:e,sampleRate:r,samplesDecoded:i,errors:o}=await a.decodeFile(new Uint8Array(n));if(!i||o.length)throw Error(`File FLAC incompleto.`);let s=t.createBuffer(e.length,i,r);if(e.forEach((e,t)=>s.copyToChannel(e,t)),r===t.sampleRate)return s;let c=Math.ceil(i*t.sampleRate/r),l=new OfflineAudioContext(e.length,c,t.sampleRate),u=l.createBufferSource();return u.buffer=s,u.connect(l.destination),u.start(),await l.startRendering()}finally{a.free()}}var j,wn,Tn,En=0,Dn=0,On=[],kn=0,An,jn=new Set,Mn=()=>j&&M()?j.currentTime-En:Dn,M=()=>An!==void 0;async function Nn(e=!0){j??=new AudioContext,await j.resume(),e&&(wn??=Promise.all(Object.keys(w).filter(e=>e!==`unknown`).map(async e=>{let t=await fetch(`/drumfolio-beta/sounds/`+e+`.wav`);if(!t.ok)throw Error(`Campione audio non disponibile.`);return[e,await j.decodeAudioData(await t.arrayBuffer())]})).then(Object.fromEntries).catch(e=>{throw wn=null,e}),Tn=await wn)}function Pn(e,t,n){if(!Tn?.[e])return;let r=j.createBufferSource(),i=j.createGain();r.buffer=Tn[e],i.gain.value=n*.7,r.connect(i).connect(j.destination),jn.add(r),r.onended=()=>{jn.delete(r),i.disconnect()},r.start(t)}var Fn=0;function In(){Fn++}function Ln(e){return e===`ghost`?.38:e===`accent`?1.3:1}async function Rn(e,t){let n=++Fn;await Nn(),n===Fn&&Pn(e,j.currentTime,.8*Ln(t))}async function zn(e){return await Nn(!1),Cn(e,j)}function Bn(){M()&&(Dn=Mn()),An=void 0;for(let e of jn)e.stop();jn.clear()}function Vn(e){Bn(),Dn=e}function Hn(e,t,n){if(Bn(),Dn=t,En=j.currentTime-t,An=n??null,On=e.filter(e=>e.time>=t-.001).sort((e,t)=>e.time-t.time),kn=0,n&&t<n.duration){let e=j.createBufferSource();e.buffer=n,e.connect(j.destination),jn.add(e),e.onended=()=>jn.delete(e),e.start(0,t)}}function Un(e){if(!M()||An)return;let t=Math.min(e,Mn()+.12);for(;kn<On.length&&On[kn].time<t;){let e=On[kn++],t=Math.max(j.currentTime,En+e.time),n=e.velocity/127*Ln(e.touch);e.ornament===`flam`&&Pn(e.instrument,Math.max(j.currentTime,t-.026),n*.45),Pn(e.instrument,t,n)}}var N=e=>document.getElementById(e);N(`app`).innerHTML=le();var Wn=Object.keys(w),Gn=matchMedia(`(min-width:760px)`);N(`instrument`).innerHTML=Wn.map(e=>`<option value="${e}">${w[e][0]}</option>`).join(``);var Kn=null,qn,P,F,I,Jn,L=0,R=null,z=!1,B=null,Yn=null,Xn=``,V=!1,Zn=!1,Qn=[],$n=[],er=new Map,H=null,U=null,tr,nr=0,rr=null,ir=!1,ar=!1,or=!1,sr=-1,cr=Promise.resolve(),lr,ur=new Map,dr=matchMedia(`(max-width:759px) and (orientation:portrait) and (max-height:600px)`),fr=matchMedia(`(orientation:landscape) and (max-height:550px)`),W=()=>dr.matches?1:z||fr.matches?2:Gn.matches?4:2,pr=e=>I.bars[e].number>0?se(I.bars[e].number):I.bars[e].length<I.full?`Lev.`:`Intro`,G=()=>P.events.find(e=>e.id===R),mr=new Map,hr=e=>P.rests?.find(t=>t.id===e)??mr.get(e),gr=()=>hr(R),_r=e=>I.at(e.time,!0,e.snap_grid);function vr(e,t=e.written){if(e.measure&&t===I.full)return`Battuta intera · `+P.meter;let n=ye(t);return({1:`Intero`,2:`Metà`,4:`Quarto`,8:`Ottavo`,16:`Sedicesimo`,32:`Trentaduesimo`,64:`Sessantaquattresimo`}[32/n.base]??`1/`+32/n.base)+(n.dotted?` puntato`:n.triplet?` in terzina`:``)+` · `+be(t)}function yr(e,t){if((t.time??e.time)>=P.duration)throw Error(`La pausa è oltre la fine del brano.`);let{implicit:n,...r}={...e,...t};n&&(r.id=crypto.randomUUID());let i={rests:n?[...P.rests??[],r]:P.rests.map(t=>t.id===e.id?r:t)};if((e.time!==r.time||e.voice!==r.voice)&&e.time<P.duration){let{time:t,voice:n,written:r}=e;i.hidden_rests=[...P.hidden_rests??[],{time:t,voice:n,written:r}]}return Q(P.events,r.id,P.grid,i)}var K=!1,br=0,xr=e=>e.map(e=>`<option value="`+e+`">`+C(e)+`</option>`).join(``);N(`inline-grid`).innerHTML=`<optgroup label="Griglia binaria">`+xr(pe.filter(e=>!fe.includes(e)))+`</optgroup><optgroup label="Griglia in terzine">`+xr(fe)+`</optgroup>`;var Sr=(e,t)=>`<optgroup label="`+e+`">`+t.map(e=>`<option value="`+e+`">`+ye(e).label+`</option>`).join(``)+`</optgroup>`;N(`figure-value`).innerHTML=`<option value="0">Auto</option>`+Sr(`Semplici`,me)+Sr(`Puntati`,me.map(e=>e*1.5))+Sr(`In terzina (3:2)`,me.map(e=>e*2/3))+`<option value="group">Scrivi tre colpi in terzina…</option>`;var Cr=()=>I.at(Mn()).bar,wr=()=>V?Yn:null;function q(e){clearTimeout(tr),N(`notice`).textContent=e,tr=setTimeout(()=>N(`notice`).textContent=``,3800)}function J(e){q(e.message||`Operazione interrotta`)}function Tr(e){return(...t)=>Promise.resolve().then(()=>e(...t)).catch(J)}function Er(){I=E(P),Jn=I.bars.map(()=>[]);for(let e of P.events){let t=_r(e);Jn[t.bar].push({hit:e,tick:t.tick})}for(let e of P.rests??[]){let t=_r(e);Jn[t.bar].push({rest:e,tick:t.tick})}Ke(Jn,I)}function Dr(e){document.querySelector(`.inspector`).classList.toggle(`expanded`,e),N(`edit-toggle`).setAttribute(`aria-expanded`,String(e))}N(`edit-toggle`).onclick=()=>Dr(N(`edit-toggle`).getAttribute(`aria-expanded`)!==`true`);function Or(e){for(let t of N(`guide-switch`).children)t.setAttribute(`aria-pressed`,String(e===t.dataset.guide));N(`guide-keys`).innerHTML=Ge(e)}N(`guide-switch`).onclick=e=>{let t=e.target.closest(`[data-guide]`);t&&Or(t.dataset.guide)},N(`score-legend`).onclick=()=>{X(),Or(gr()?`signs`:G()&&(G().instrument===`hi_hat_pedal`||T(G())===`cymbals`)?`cymbals`:`drums`),N(`notation-guide`).showModal()},N(`notation-guide`).onclose=()=>N(`guide-keys`).replaceChildren(),N(`close-guide`).onclick=()=>N(`notation-guide`).close(),N(`notation-guide`).onclick=e=>{if(e.target===N(`notation-guide`)){let t=e.target.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&e.target.close()}};function Y(){let e=W(),t=Math.min(I.bars.length,L+e),n=Cr();document.body.classList.toggle(`live`,z),N(`live`).setAttribute(`aria-pressed`,String(z)),N(`studio`).setAttribute(`aria-pressed`,String(!z));let r=P.name.indexOf(` - `);N(`title`).textContent=P.score_title||(r>0?P.name.slice(r+3):P.name),N(`artist`).textContent=P.artist||(r>0?P.name.slice(0,r):`Repertorio personale`),N(`bpm`).textContent=Number(P.bpm.toFixed(1)).toLocaleString(`it`)+` BPM`,N(`meter`).textContent=P.meter,N(`bar-total`).textContent=I.bars.length-I.bars.filter(e=>e.number<=0).length+` battute`,N(`page`).textContent=Math.floor(L/e)+1+` / `+Math.ceil(I.bars.length/e),N(`previous`).disabled=L===0,N(`next`).disabled=t===I.bars.length;let i=Object.entries(P.sections??{}).filter(([e])=>Number(e)<=I.bars[L].number).sort(([e],[t])=>Number(t)-Number(e))[0];N(`section-label`).textContent=z?`MODALITÀ LIVE`:`BATTUTE `+pr(L)+` — `+pr(t-1),N(`section-title`).textContent=z?`Battuta `+pr(n):i?.[1]||`Batteria`,N(`paper-meter`).textContent=P.meter,er=new Map,mr=new Map;let a=[];for(let e=L;e<t;e++){let t=qe(e,I,Jn[e],z?null:R,P.meter,P.hidden_rests);er.set(e,t.targets);for(let e of t.targets)e.rest?.implicit&&mr.set(e.rest.id,e.rest);a.push(`<div class="measure" data-measure="${e}"><div class="measure-meta"><span class="index">${pr(e)}</span></div>${t.html}</div>`)}N(`bars`).innerHTML=a.join(``);for(let e of N(`bars`).querySelectorAll(`.staff`))if(!z)for(let t of er.get(+e.dataset.bar)){if(t.rest)continue;let n=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);for(let[e,r]of Object.entries({cx:t.x,cy:t.y,r:7,fill:`transparent`}))n.setAttribute(e,r);n.style.touchAction=`none`,e.append(n)}N(`duration`).textContent=ce(P.duration),document.querySelector(`.bar-tools`).hidden=z,N(`original-source`).hidden=!Xn&&!ir,N(`drums-source`).hidden=!ir,N(`original-source`).setAttribute(`aria-pressed`,String(V&&!Zn)),N(`drums-source`).setAttribute(`aria-pressed`,String(V&&Zn)),document.querySelector(`.source-switch`).classList.toggle(`has-audio`,!!(Xn||ir)),N(`source-name`).textContent=V?Zn?`Batteria isolata`:Xn:`Suoni dello spartito`,N(`seek`).max=P.duration,document.activeElement!==N(`inline-bpm`)&&(N(`inline-bpm`).value=Number(P.bpm.toFixed(2))),N(`inline-grid`).value=P.grid??16,N(`tempo-text`).textContent=Number(P.bpm.toFixed(1)).toLocaleString(`it`)+` BPM`,N(`grid-text`).textContent=C(P.grid??16),N(`undo`).disabled=!Qn.length,N(`redo`).disabled=!$n.length;let o=G(),s=gr(),c=o??s;if(N(`ins-title`).textContent=s?`Pausa`:o?`Nota selezionata`:`Modifica`,N(`move-field`).hidden=!c,c){let{bar:e,tick:t}=_r(c),n=1+Math.floor((I.full-I.bars[e].length+t)/I.beat),r=(I.full-I.bars[e].length+t)%I.beat,i=I.beat===8?{0:``,2:` e`,4:` &`,6:` a`}[r]:void 0;N(`position-title`).textContent=`Pos. · batt. `+pr(e),N(`note-beat`).textContent=n+(i??(r?`+`+be(r):``)),N(`note-beat`).title=`Battuta `+pr(e)+`, movimento `+n+(r?`, più `+be(r)+` di intero`:``);for(let[e,t]of[[`earlier`,-1],[`later`,1]]){let n=N(e),r=(t<0?`Anticipa`:`Posticipa`)+(c.measure?` di una battuta`:` di un passo di griglia`);n.disabled=pi(c,t)===null,n.title=r,n.setAttribute(`aria-label`,r)}}N(`snare-roll`).hidden=z||o?.instrument!==`snare`,N(`remove`).disabled=!c,N(`remove`).setAttribute(`aria-label`,s?`Elimina pausa`:`Elimina colpo`),N(`remove`).title=s?`Elimina pausa`:`Elimina colpo`,N(`pickup`).hidden=z||!o||P.meter!==`4/4`,o&&(N(`instrument`).value=o.instrument),N(`hint`).textContent=K?`Tocca il rigo nella voce della pausa: tamburi in basso, piatti in alto.`:s?`Pausa · Scegli il valore o lo strumento da inserire.`:o?w[o.instrument][0]+` · `+He[o.instrument].toLocaleLowerCase(`it`)+` · Trascina per spostare il colpo.`:`Tocca un colpo per selezionarlo. Doppio tocco sul rigo per inserirlo.`,zr(c),N(`loop`).setAttribute(`aria-pressed`,String(B!==null)),sr=-1,kr()}function kr(){let e=Math.min(P.duration,Math.max(0,Mn())),{bar:t,tick:n}=I.at(e);if(M()&&(t<L||t>=L+W())){L=Math.floor(t/W())*W(),Y();return}if(sr!==t){N(`bar-now`).textContent=pr(t),z&&(N(`section-title`).textContent=`Battuta `+pr(t));for(let e of N(`bars`).querySelectorAll(`.measure`)){let n=+e.dataset.measure===t;e.classList.toggle(`current`,n),e.querySelector(`.cursor`).setAttribute(`visibility`,n?`visible`:`hidden`)}sr=t}let r=33+n*307/I.bars[t].length;N(`bars`).querySelector(`[data-bar="${t}"] .cursor`)?.setAttribute(`transform`,`translate(`+r+` 0)`),N(`elapsed`).textContent=ce(e),N(`seek`).value=e,N(`seek`).style.setProperty(`--progress`,e/P.duration*100+`%`)}function Ar(){N(`play`).innerHTML=y(M()?`pause`:`play`),N(`play`).setAttribute(`aria-label`,M()?`Pausa`:`Riproduci`)}function X(){ar=!1,nr++,Bn(),Ar()}function jr(e,t=!0){ar=!1,nr++,e=Math.max(0,Math.min(e,P.duration));let n=M();Vn(e),B!==null&&I.at(e).bar!==B&&(B=null),t&&(L=Math.floor(I.at(e).bar/W())*W()),n&&Hn(P.events,e,wr()),Y(),Ar()}async function Mr(){if(or&&$(!1),M()||ar){X();return}ar=!0;let e=++nr;try{if(await Nn(!V),e!==nr)return;if(V&&!Yn){let t=await u(`audio`,Zn?[F,`drums`]:F);if(e!==nr)return;if(!t)throw Error(`Traccia audio non disponibile sul dispositivo.`);let n=await zn(t);if(e!==nr)return;Yn=n}let t=Mn();t>=P.duration-.01&&(t=0),B!==null&&I.at(t).bar!==B&&(t=I.bars[B].start),Hn(P.events,t,wr()),Ar(),Nr()}finally{e===nr&&(ar=!1)}}function Nr(){if(!M())return;let e=B===null?P.duration:Math.min(I.bars[B].end,P.duration);if(Mn()>=e){if(B===null){X(),Vn(e),kr();return}Hn(P.events,I.bars[B].start,wr())}Un(e),kr(),requestAnimationFrame(Nr)}async function Pr(e){if($(!1),Dr(!1),K=!1,z=e,L=Math.floor(Cr()/W())*W(),R=null,Y(),e&&navigator.wakeLock)try{lr=await navigator.wakeLock.request(`screen`)}catch{}!e&&lr&&(await lr.release(),lr=null)}function Fr(){return{events:P.events,rests:P.rests,hidden_rests:P.hidden_rests,grid:P.grid??16,selected:R,bpm:P.bpm,bar_times:P.bar_times,bar_source:P.bar_source,first_numbered_bar:P.first_numbered_bar}}function Z(e){let t=F,n=cr.then(()=>{if(F===t)return e()});return cr=n.catch(e=>{P&&F===t&&Y(),J(e)}),n}function Q(e,t,n=P.grid??16,r={}){let i=Fr();return Ir({...Fr(),events:e,selected:t,grid:n,...r},()=>{Qn.push(i),Qn.length>80&&Qn.shift(),$n=[]})}async function Ir(e,t){let{selected:n,...r}=e,i={...P,...r},a=i.bar_times!==P.bar_times||i.bpm!==P.bpm,s=o()&&F===`pocket-study`?crypto.randomUUID():F,c=await h(`scores`,s,{id:s,project:i},s===F?Kn:void 0);s!==F&&(F=s,await h(`settings`,`active`,F)),Kn=m(c),t(),P=i,R=n,Er(),a&&(B=null);let l=G()??gr();if(a||l){let e=l&&!M()?_r(l).bar:Cr();L=Math.floor(e/W())*W()}M()&&Hn(P.events,Mn(),wr()),Y()}function Lr(e=!1){if(!z)return Z(()=>{let t=e?$n:Qn,n=e?Qn:$n,r=Fr();if(t.length)return Ir(t.at(-1),()=>{n.push(r),t.pop()})})}function Rr(e,t){let{bar:n,tick:r}=_r(e),i=T(e,P),a=Jn[n].filter(e=>{let n=e.hit??e.rest;return n.id!==t&&T(n,P)===i}),o=Ce(a,I.bars[n].length,I.beat,I.q,I.full-I.bars[n].length),s=o.find(e=>e.tick===r),c=a.reduce((e,t)=>t.tick>r?Math.min(t.tick,e):e,I.bars[n].length),l=o.some(e=>e.tick<r&&S(e.tick)+S(e.value)>S(r)&&(e.rest||e.hits.some(e=>e.written)));return{tick:r,value:s?.value??I.q,hits:s?.hits??[],rest:s?.rest,room:(S(c)-S(r))/12,blocked:l}}function zr(e){let t=e?Rr(e):null;e?.implicit&&(t.value=e.written);let n=!!e?.voice,r=t?.value??(br||I.q),i=n?r:e?e.written??t.hits.find(e=>e.written)?.written??0:br,a=t?.room??I.full;for(let t of N(`figure-value`).options){if(t.value===`group`){t.disabled=!e?.instrument;continue}let r=Number(t.value);t.disabled=r===0?n:r>a}let o=N(`figure-value`);if(o.querySelector(`[data-extra]`)?.remove(),i&&!_e.includes(i)){let t=new Option(n?vr(e):be(i),i);t.dataset.extra=`true`,o.add(t)}N(`rest-info`).hidden=!n,n&&(N(`rest-duration`).textContent=vr(e,r)),N(`figure-value`).options[0].textContent=e&&!i?`Auto · `+ye(r).label:`Auto`,N(`figure-value`).value=i,N(`shorter`).disabled=!_e.includes(r/2),N(`longer`).disabled=!_e.includes(r*2)||r*2>a,N(`touch-field`).hidden=!e?.instrument,N(`note-touch`).value=e?.touch??``,N(`convert-figure`).hidden=!e,N(`convert-figure`).textContent=n?`Trasforma in colpo`:t?.hits.length>1?`Accordo in pausa`:`Trasforma in pausa`,N(`write-rest`).setAttribute(`aria-pressed`,String(K)),N(`write-rest`).textContent=K?`Annulla inserimento pausa`:`Inserisci pausa`}function Br(){let e=G();if(!e)return;X();let t={4:`due quarti`,8:`un quarto`,16:`un ottavo`,32:`un sedicesimo`,64:`un trentaduesimo`};ri(`Scrivi tre colpi in terzina`,[4,8,16,32,64].map(n=>({text:`Terzina di 1/`+n,detail:`3 colpi in `+t[n],icon:`music-2`,go:()=>Z(()=>Q(Fe(P,e.id,n),e.id))})))}function Vr(e){let t=R;t?Z(()=>{let n=P.events.find(e=>e.id===t)??hr(t);if(!n)return;let r=Rr(n);if(e>r.room)throw Error(`Il valore supera il prossimo colpo, la pausa o la fine della battuta.`);if(n.voice)return!e||e===n.written?void 0:yr(n,{written:e,measure:!1,snap_grid:n.snap_grid??P.grid??16});let i=new Set(r.hits.map(e=>e.id));return Q(P.events.map(t=>i.has(t.id)?{...t,written:e||void 0,snap_grid:t.snap_grid??P.grid??16}:t),t)}):(br=e,Y())}function Hr(e,t){if(t.blocked||t.rest)throw Error(`Qui c’è già una figura scritta. Accorciala o eliminala per inserire il colpo o la pausa.`);if(e.written>t.room)throw Error(`Scegli un valore più breve per lo spazio disponibile in questa voce.`)}function Ur(e,t){return Z(async()=>{if(e>=P.duration)throw Error(`Scegli un punto prima della fine del brano.`);let n={id:crypto.randomUUID(),time:e,voice:T({instrument:t},P)},r=Rr(n);if(r.hits.length)throw Error(`Seleziona il colpo e usa il comando per trasformarlo in pausa.`);n.snap_grid=P.grid??16,n.written=br||(I.q<=r.room?I.q:r.value),Hr(n,r),await Q(P.events,n.id,P.grid,{rests:[...P.rests??[],n]}),K=!1,Y()})}function Wr(){let e=R,t=N(`instrument`).value;Z(()=>{let n=P.events.find(t=>t.id===e),r=hr(e);if(n){if(n.time>=P.duration)throw Error(`Scegli un colpo prima della fine del brano.`);let{hits:t,value:r}=Rr(n),i=new Set(t.map(e=>e.id)),a={id:e,time:n.time,voice:T(n,P),written:r,snap_grid:n.snap_grid??P.grid??16};return Q(P.events.filter(e=>!i.has(e.id)),e,P.grid,{rests:[...P.rests??[],a]})}if(r){if(r.time>=P.duration)throw Error(`La pausa è oltre la fine del brano.`);let n={id:r.implicit?crypto.randomUUID():e,time:r.time,instrument:t,velocity:96,snap_grid:r.snap_grid??P.grid??16,written:r.measure&&!_e.includes(r.written)?Math.min(I.beat,r.written):r.written},i=Rr(n,e);if(Hr(n,i),i.hits.some(e=>e.instrument===t))throw Error(`Questo colpo è già presente.`);return n.written=i.hits.find(e=>e.written)?.written??n.written,Rn(t).catch(J),Q([...P.events,n],n.id,P.grid,{rests:P.rests?.filter(t=>t.id!==e)})}})}function Gr(){if(z||!R)return;let e=R;return Z(()=>{if(P.events.some(t=>t.id===e))return Q(P.events.filter(t=>t.id!==e),null);let t=hr(e);if(t){let{voice:n,time:r,written:i}=t;if(r>=P.duration)throw Error(`La pausa è oltre la fine del brano.`);return Q(P.events,null,P.grid,{rests:P.rests?.filter(t=>t.id!==e),hidden_rests:[...P.hidden_rests??[],{voice:n,time:r,written:i}]})}})}function Kr(e,t,n){return Z(()=>{let r=P.events.find(t=>t.id===e.id);if(!r)return;let i=n??r.time;if(P.events.some(n=>n.id!==e.id&&n.instrument===t&&Math.abs(n.time-i)<5e-4)){Y(),q(`Questo colpo è già presente.`);return}let a={...r,instrument:t,time:i,snap_grid:i===r.time?r.snap_grid:P.grid??16},o=Rr(a,e.id);if(T(a,P)!==T(r,P)||i!==r.time){if(Hr(a,o),o.hits.some(e=>e.instrument===t))throw Error(`Questo colpo è già presente sulla griglia.`);o.hits.length&&(a.written=o.hits[0].written)}return Q(P.events.map(t=>t.id===e.id?a:t),e.id)})}function qr(e,t){let n=e.getBoundingClientRect(),r=350/n.width;return{x:(t.clientX-n.left)*r,y:(t.clientY-n.top)*r}}function $(e){or=e,e&&(K=!1,zr(G()??gr())),ti(),H=null,U=null,N(`first-bar`).setAttribute(`aria-pressed`,String(e)),N(`bar-placement`).hidden=!e,N(`bars`).classList.toggle(`placing`,e),N(`bars`).querySelector(`.start-preview`)?.remove()}function Jr(e,t){let n=Number(e.dataset.bar),r=Math.max(33,Math.min(340,qr(e,t).x));return{x:r,t:I.seconds(n,(r-33)*I.bars[n].length/307)}}function Yr(e,t){let n=N(`bars`).querySelector(`.start-preview`);if(!e){n?.remove();return}let{x:r,t:i}=Jr(e,t);i>=P.duration?n?.remove():(n||(n=document.createElementNS(`http://www.w3.org/2000/svg`,`path`),n.setAttribute(`class`,`start-preview`),n.setAttribute(`d`,`M -4 16 H 4 L 0 21 Z M 0 21 V 115`)),n.parentNode!==e&&e.append(n),n.setAttribute(`transform`,`translate(`+r+` 0)`))}function Xr(e){e>=P.duration?q(`Scegli un punto prima della fine del brano.`):($(!1),jr(e),Z(async()=>{await Q(P.events,null,P.grid??16,Ae(P,e,{firstBar:!0})),q(`Battuta 1 impostata a `+e.toLocaleString(`it`,{maximumFractionDigits:2})+` s`)}))}function Zr(e,t){let n=+e.dataset.bar,{x:r,y:i}=qr(e,t),a=I.bars[n],o=I.snapTick(a.length,(r-33)*a.length/307),s=I.seconds(n,o),c=(86-i)*2/8;return{bar:n,tick:o,t:s,key:Wn.filter(e=>e!==`unknown`).sort((e,t)=>Math.abs(w[e][1]-c)-Math.abs(w[t][1]-c))[0],x:r,y:i}}function Qr(e,t,n){let r=Zr(t,n),{hit:i}=e,a=e.svg===t&&Math.abs(n.clientX-e.x)<=9,o=Math.abs(n.clientY-e.y)>=e.pitchThreshold?r.key:i.instrument;o===`hi_hat_closed`&&i.instrument===`hi_hat_open`&&(o=`hi_hat_open`);let s=a?i.time:r.t;return{...I.at(s,!0),key:o,time:s}}function $r(e,t,n){let r=Zr(t,n),i=e.rest,a=Math.abs(n.clientY-e.y)>e.pitchThreshold,o=P.notation===`single`?`drums`:a?r.y<54?`cymbals`:`drums`:i.voice,s=i.measure?I.bars[r.bar].start:e.svg===t&&Math.abs(n.clientX-e.x)<=3?i.time:r.t;return{...I.at(s,!0,s===i.time?i.snap_grid:void 0),time:s,voice:o,rest:i,y:o===`cymbals`?46:70}}function ei(e,t,n){return Z(()=>{let r=hr(e.id);if(!r||t===r.time&&n===r.voice)return;if(t<0||t>=P.duration)throw Error(`Scegli una posizione dentro il brano.`);let i={...r,time:t,voice:n,snap_grid:t===r.time?r.snap_grid:P.grid??16},a=Rr(i,r.id);if(Hr(i,a),a.hits.length)throw Error(`Questa posizione contiene già un colpo.`);return yr(r,i)})}function ti(){N(`drag-label`).hidden=!0,N(`bars`).querySelector(`.drop-preview`)?.remove()}function ni(e,t,n){let r=N(`drag-label`),i=n.rest?`Pausa · `+vr(n.rest):w[n.key][0];r.hidden=!1,r.textContent!==i&&(r.textContent=i);let a=r.offsetWidth/2+6;r.style.left=Math.max(a,Math.min(innerWidth-a,t.clientX))+`px`,r.style.top=(t.clientY>68?t.clientY-25:t.clientY+55)+`px`,N(`bars`).querySelector(`.drop-preview`)?.remove(),e.insertAdjacentHTML(`beforeend`,`<circle class="drop-preview" cx="${33+n.tick*307/I.bars[n.bar].length}" cy="${n.y??Ie(n.key)}" r="7" fill="#73b896" stroke="#25543b" pointer-events="none"/>`)}N(`bars`).onpointerdown=e=>{if(e.button!==0||H)return;let t=e.target.closest(`.staff`);if(!t)return;if(or){H={id:e.pointerId},t.setPointerCapture(e.pointerId),Yr(t,e);return}let n=Zr(t,e),r=307*I.q/(2*I.bars[n.bar].length),i=e.target.closest(`[data-rest-target]`),a=er.get(n.bar).filter(e=>Math.abs(e.x-n.x)<=r).map(e=>({...e,distance:Math.hypot((e.x-n.x)*.84,e.y-n.y)})).filter(e=>e.distance<10).sort((e,t)=>e.distance-t.distance),o=Math.max(2,3*t.getBoundingClientRect().width/350),s=i?er.get(n.bar)[Number(i.dataset.restTarget)]:a[0];H={id:e.pointerId,svg:t,hit:s?.hit,rest:s?.rest,x:e.clientX,y:e.clientY,pitchThreshold:o,drag:!1},H.hit&&!z&&!K&&Nn().catch(J),t.setPointerCapture(e.pointerId)},N(`bars`).addEventListener(`touchstart`,e=>{e.touches.length===1&&(H?.hit||H?.rest)&&!z&&!K&&!or&&e.cancelable&&e.preventDefault()},{passive:!1}),N(`bars`).onpointermove=e=>{if(or){H&&H.id!==e.pointerId||Yr(document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`),e);return}if(H?.id!==e.pointerId||z||K||!H.hit&&!H.rest||((Math.hypot(e.clientX-H.x,e.clientY-H.y)>6||Math.abs(e.clientY-H.y)>=H.pitchThreshold)&&(H.drag=!0),!H.drag))return;let t=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`);if(!t){ti();return}if(H.rest){ni(t,e,$r(H,t,e));return}let n=Qr(H,t,e);ni(t,e,n),H.previewKey!==n.key&&(H.previewKey=n.key,Rn(n.key,H.hit.touch).catch(J))},N(`bars`).onpointerleave=()=>{or&&N(`bars`).querySelector(`.start-preview`)?.remove()},N(`bars`).onpointercancel=()=>{H=null,ti(),In(),Y()},N(`bars`).onpointerup=e=>{if(H?.id!==e.pointerId)return;let t=H,{hit:n,rest:r,drag:i,x:a,y:o}=t;H=null,ti();let s=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`);if(or){s?Xr(Jr(s,e).t):Yr(null,e);return}if(!s||!i&&Math.hypot(e.clientX-a,e.clientY-o)>8){Y();return}let c=Zr(s,e);if(z){jr(I.bars[c.bar].start);return}if(K){Ur(c.t,c.key);return}if(i&&r){let n=$r(t,s,e);Dr(!0),R=r.id,U=null,ei(r,n.time,n.voice);return}if(i&&n){U=null;let{time:r,key:i}=Qr(t,s,e);Dr(!0),r<P.duration?(Kr(n,i,r),i!==t.previewKey&&Rn(i,n.touch).catch(J)):Y();return}let l=performance.now(),u=U&&l-U.now<375&&Math.hypot(e.clientX-U.x,e.clientY-U.y)<16,d=u&&U.implicit,f=d||u&&U.bar===c.bar&&U.tick===c.tick&&U.key===c.key;if(d&&(c=U.location),U=f?null:{now:l,bar:c.bar,tick:c.tick,key:c.key,x:e.clientX,y:e.clientY,implicit:r?.implicit,location:c},r&&!d)Dr(!0),R=r.id,T({instrument:N(`instrument`).value},P)!==r.voice&&(N(`instrument`).value=r.voice===`drums`?`snare`:`hi_hat_closed`),Y();else if(f&&(d||!n||Ie(n.instrument)!==Ie(c.key))&&c.t<P.duration){let e=c.key===`hi_hat_closed`&&N(`instrument`).value===`hi_hat_open`?`hi_hat_open`:c.key;Dr(!0);let t={id:crypto.randomUUID(),time:c.t,instrument:e,velocity:96,snap_grid:P.grid??16};Z(()=>{let n=Rr(t);if(!n.hits.some(t=>t.instrument===e))return t.written=n.hits.length?n.hits[0].written:br||(fe.includes(P.grid)?I.q:void 0),Hr(t,n),Rn(e).catch(J),Q([...P.events,t],t.id)})}else n?(Dr(!0),R=n.id,Y(),Rn(n.instrument,n.touch).catch(J)):(R=null,jr(Math.min(P.duration,c.t),!1))};function ri(e,t){N(`dialog-title`).textContent=e,N(`dialog-body`).replaceChildren();for(let e of t){let t=document.createElement(`button`);t.className=`choice`,t.innerHTML=y(e.icon)+x(e.text)+(e.detail?`<small>`+x(e.detail)+`</small>`:``),t.onclick=Tr(()=>(N(`dialog`).close(),e.go())),N(`dialog-body`).append(t)}N(`dialog`).open||N(`dialog`).showModal()}N(`snare-roll`).onclick=()=>{let e=G(),t=P;if(z||e?.instrument!==`snare`)return;X(),$(!1),ri(`Rullata in trentaduesimi`,[]);let n=N(`dialog-body`);n.innerHTML=`<p class="roll-help">Il rullante selezionato è il primo colpo. Otto trentaduesimi occupano un quarto.</p>
    <form class="roll-form"><label for="roll-count">Numero di colpi</label><input id="roll-count" type="number" inputmode="numeric" min="2" max="32" value="4" required><button type="submit">Scrivi rullata</button></form>
    <button id="roll-detect" class="choice" ${ir?``:`hidden`}>Rileva dalla batteria isolata</button>
    <p id="roll-status" class="roll-help" role="status"></p><button id="roll-apply" class="choice" hidden></button>`;let r=N(`roll-status`),i=N(`roll-detect`),a=N(`roll-apply`),o=()=>N(`dialog`).open&&r.isConnected,s=async(n,i)=>{try{await Z(async()=>{if(o()){if(t!==P)throw Error(`Lo spartito è cambiato. Seleziona di nuovo il primo colpo.`);await Q(n(),e.id,32),N(`dialog`).close(),q(`Rullata di `+i+` colpi · Griglia 1/32`)}})}catch(e){o()&&(r.textContent=e.message)}};n.querySelector(`form`).onsubmit=n=>{n.preventDefault();let r=N(`roll-count`).valueAsNumber;s(()=>bn(t,e.id,r),r)},i.onclick=async()=>{i.disabled=!0,r.textContent=`Ascolto il passaggio sulla traccia di batteria…`;try{let n=await u(`audio`,[F,`drums`]);if(!n)throw Error(`La batteria isolata non è disponibile su questo dispositivo.`);let{scanStemRoll:i}=await _t(async()=>{let{scanStemRoll:e}=await import(`./scan-roll-BKHEr5_4.js`);return{scanStemRoll:e}},__vite__mapDeps([2,3,1])),c=await i(n,t,e.time);if(!o())return;if(!c.length)throw Error(`Nessuna sequenza regolare di trentaduesimi rilevata qui. Puoi indicare il numero di colpi.`);r.textContent=`Da `+c[0].time.toLocaleString(`it`,{maximumFractionDigits:3})+` a `+c.at(-1).time.toLocaleString(`it`,{maximumFractionDigits:3})+` s`,a.hidden=!1,a.textContent=`Applica `+c.length+` colpi rilevati`,a.onclick=()=>s(()=>xn(t,c),c.length)}catch(e){o()&&(r.textContent=e.message,i.disabled=!1)}}};async function ii(e,t=!0){await cr,$(!1),Dr(!1),Ee(e.project),X(),Vn(0),B=null,L=0,R=null,z=!1,K=!1,br=0,Qn=[],$n=[],lr&&=(await lr.release(),null),F=e.id,Kn=m(e),P=e.project,Yn=null,Xn=``;let[n,r]=await Promise.all([g(`audio`,[F,`drums`]),g(`audio`,F)]);ir=n,r&&(Xn=P.original_name||`Originale`),Zn=ir,V=ir||r,Er(),Y(),await h(`settings`,`active`,F),t&&qn.go(`studio`)}async function ai(e,t=!1){if(V===e&&Zn===t)return;let n=M()||ar;X(),V=e,Zn=t,Yn=null,Y(),n&&await Mr()}async function oi(){let e=[{text:`Suoni dello spartito`,detail:V?``:`Attivi`,icon:`drum`,go:()=>ai(!1)}];ir&&e.push({text:`Batteria isolata`,detail:V&&Zn?`Attiva`:``,icon:`audio-lines`,go:()=>ai(!0,!0)}),Xn&&e.push({text:`Canzone originale`,detail:Xn,icon:`music-2`,go:()=>ai(!0)}),ir&&Xn||e.push({text:`Abbina una traccia audio`,icon:`headphones`,go:()=>N(`audio-file`).click()}),ri(`Sorgente audio`,e)}async function si(e){if(rr)return;let t=new AbortController;rr=t;let n=N(`import-progress`),r=(e,t,n)=>{N(`import-phase`).textContent=e,N(`import-meter`).value=t;let r=n>=60?Math.ceil(n/60)+` min`:Math.max(1,Math.ceil(n))+` s`;N(`import-detail`).textContent=Number.isFinite(n)&&n>0?`Separazione · circa `+r+` rimanenti`:`Analisi sul dispositivo`};N(`import-title`).textContent=e.file.name,N(`cancel-import`).disabled=!1,r(`Preparazione del brano`,0),X(),Yn=null,n.showModal();let i=hn(N(`import-message`)),a;if(navigator.wakeLock)try{a=await navigator.wakeLock.request(`screen`)}catch{}try{await cr,await h(`settings`,`pending-song`,e);let{analyzeSong:n}=await _t(async()=>{let{analyzeSong:e}=await import(`./import-song-DRuePJbe.js`);return{analyzeSong:e}},[]),i=await n(e.file,t.signal,r,e.separation,v);t.signal.throwIfAborted(),e.sourceUrl&&(i.project.source_url=e.sourceUrl);let a={id:e.id,project:i.project};Ee(a.project),N(`cancel-import`).disabled=!0,r(`Salvataggio dello spartito`,.99),await ii(await ne(a,e.file,i.stem)),a.project.events.length?i.rollCheckUnavailable?q(`Spartito pronto. Verifica approfondita delle rullate non disponibile per questa importazione.`):a.project.duration>=8&&a.project.bar_source===`estimated`?q(`Spartito pronto · battute stimate dai colpi di batteria.`):q(`Spartito pronto per la modifica.`):q(`Nessun colpo rilevato. Puoi aggiungerlo sul rigo.`)}catch(e){if(t.signal.aborted)await ee(),q(`Importazione annullata.`);else throw e}finally{i(),rr=null,n.close(),await a?.release(),window.location.hash&&window.location.hash!==`#repertorio`||await qn.render()}}N(`cancel-import`).onclick=()=>rr?.abort(),N(`import-progress`).oncancel=e=>{e.preventDefault(),N(`cancel-import`).disabled||rr?.abort()};var ci=fn({pause:X,async importFile(e,t,n){try{if(/\.midi?$/i.test(e.name)||/audio\/(x-)?midi/i.test(e.type)){let{midiScore:n}=await _t(async()=>{let{midiScore:e}=await import(`./midi-import-B0euCMKK.js`);return{midiScore:e}},__vite__mapDeps([4,1])),r=await n(e);t&&(r.source_url=t),Ee(r);let i={id:crypto.randomUUID(),project:r};await ii(await h(`scores`,i.id,i))}else await si({id:crypto.randomUUID(),file:e,sourceUrl:t,separation:n})}catch(e){J(e)}}});function li(e){return on({user:e,pause:()=>{X(),$(!1)},notify:q,active:()=>F,sourceLink:()=>P?.source_url,create:ci,resume:si,openDemo:async()=>{let e=await u(`scores`,`pocket-study`);e||=await h(`scores`,`pocket-study`,{id:`pocket-study`,project:ke()}),await ii(e)},barInfo:()=>{let e=Cr(),t=I.bars[e];return{time:t.start,number:t.number,max:e+1}},numberBar:async e=>{await cr;let t=Mn(),n=e===null?I.firstComplete:Pe(P,t,e);if(await Z(()=>Q(P.events,R,P.grid??16,{first_numbered_bar:n})),P.first_numbered_bar!==n)throw Error(`Impossibile salvare la numerazione.`);jr(t),qn.go(`studio`)},open:async e=>{await cr,e.id===F&&m(e)===Kn?qn.go(`studio`):await ii(e)}})}N(`project-file`).onchange=Tr(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n;try{n=JSON.parse(await t.text())}catch{throw Error(`Scegli un file progetto .drums.`)}Ee(n);let r={id:crypto.randomUUID(),project:n};await ii(await h(`scores`,r.id,r))}),N(`audio-file`).onchange=Tr(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n=F,r=(ur.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{let e=await zn(t);await h(`audio`,n,t),F===n&&(X(),Yn=e,V=!0,Zn=!1,Xn=t.name,Y())});ur.set(n,r);try{await r}finally{ur.get(n)===r&&ur.delete(n)}}),N(`source`).onclick=Tr(oi),N(`original-source`).onclick=Tr(()=>Xn?ai(!0):N(`audio-file`).click()),N(`drums-source`).onclick=Tr(()=>ai(!0,!0)),N(`first-bar`).onclick=()=>{X(),$(!or)},N(`cancel-placement`).onclick=()=>{$(!1),N(`first-bar`).focus()},N(`use-playhead`).onclick=()=>Xr(Mn()),N(`pickup`).onclick=()=>{let e=G();e&&!z&&(X(),$(!1),Z(async()=>{let t=P.events.find(t=>t.id===e.id);if(!t)return;let n=Me(P,t.time);await Q(P.events,t.id,P.grid??16,n),jr(t.time);let r=I.bars[n.first_numbered_bar].start;q(`Colpo sul levare del 4 · Battuta 1 a `+r.toLocaleString(`it`,{maximumFractionDigits:2})+` s`)}))};async function ui(){if(rr)return;let e=F,t=new AbortController,n=N(`import-progress`);rr=t,N(`cancel-import`).disabled=!1,N(`import-title`).textContent=`Battute del brano`,N(`import-detail`).textContent=`Analisi sul dispositivo`;let r=(e,t)=>{N(`import-phase`).textContent=e,N(`import-meter`).value=t};r(`Apertura della traccia originale`,0),n.showModal();try{if(await cr,F!==e)return;let n=await u(`audio`,e);if(!n)throw Error(`Abbina la canzone originale dal menu delle sorgenti audio.`);let i=P,{analyzeBarLines:a}=await _t(async()=>{let{analyzeBarLines:e}=await import(`./import-song-DRuePJbe.js`);return{analyzeBarLines:e}},[]),{events:o,bpm:s,bar_times:c,duration:l}=i,d=await a(n,{events:o,bpm:s,bar_times:c,duration:l},t.signal,r);t.signal.throwIfAborted(),N(`cancel-import`).disabled=!0,await Z(async()=>{if(F!==e||P!==i)throw Error(`Lo spartito è cambiato durante l’analisi. Riapri Allinea battute per riprovare.`);await Q(P.events,R,P.grid??16,Ne(P,d)),q(`Battute rilevate sul brano originale · `+d.bpm.toFixed(1)+` BPM`)})}catch(e){t.signal.aborted?q(`Analisi annullata.`):J(e)}finally{rr=null,n.close()}}N(`align-bars`).onclick=()=>{X(),$(!1);let e=Mn(),t=G(),n=e=>Z(()=>Q(P.events,R,P.grid??16,Ae(P,e))),r=[];P.meter===`4/4`&&Xn&&r.push({text:`Rileva battute dall’originale`,detail:`Beat This! · ascolta la pulsazione di tutta la canzone`,icon:`audio-lines`,go:ui}),t&&r.push({text:`Il colpo selezionato è sull’uno`,detail:w[t.instrument][0]+` · `+t.time.toFixed(2)+` s`,icon:`drum`,go:()=>n(t.time)}),e<P.duration&&r.push({text:`L’uno è al cursore`,detail:e.toFixed(2)+` s`,icon:`list-music`,go:()=>n(e)}),P.meter===`4/4`&&r.push({text:`Ricalcola dal ritmo`,detail:`Aggiorna BPM e battute dai colpi salvati`,icon:`list-music`,go:()=>Z(async()=>{let{estimateTiming:e}=await _t(async()=>{let{estimateTiming:e}=await import(`./transcribe-B9egfNhk.js`);return{estimateTiming:e}},__vite__mapDeps([3,1])),t=e([...P.events].sort((e,t)=>e.time-t.time),P.duration);if(!t.bar_times)throw Error(`Colpi insufficienti. Indica l’uno sullo spartito.`);await Q(P.events,R,P.grid??16,Ne(P,t)),q(`Battute ricalcolate · `+t.bpm.toFixed(1)+` BPM`)})}),ri(`Allinea battute`,r)},N(`close`).onclick=()=>N(`dialog`).close(),N(`dialog`).onclick=e=>{if(e.target===N(`dialog`)){let t=e.target.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&e.target.close()}},N(`play`).onclick=Tr(Mr),N(`rewind`).onclick=()=>jr(I.bars[Cr()].start),N(`seek`).oninput=e=>jr(+e.target.value),N(`loop`).onclick=()=>{B=B===null?Cr():null,M()&&Hn(P.events,Mn(),wr()),Y()},N(`studio`).onclick=Tr(()=>Pr(!1)),N(`live`).onclick=Tr(()=>Pr(!0)),N(`previous`).onclick=()=>jr(I.bars[Math.max(0,L-W())].start),N(`next`).onclick=()=>jr(I.bars[Math.min(I.bars.length-1,L+W())].start);function di(e){Z(()=>{if((P.grid??16)!==e)return Q(P.events,R,e)})}function fi(e){e!==Number(P.bpm.toFixed(2))&&Z(()=>Q(P.events,R,P.grid,De(P,e)))}N(`inline-grid`).onchange=e=>di(Number(e.target.value)),N(`grid`).onclick=()=>ri(`Griglia spartito`,pe.map(e=>({text:C(e)+(fe.includes(e)?` · Terzina`:``),icon:`settings-2`,detail:(P.grid??16)===e?`Attiva`:``,go:()=>di(e)}))),N(`inline-bpm`).onchange=e=>{let t=e.target;if(!t.value||!t.validity.valid){t.value=Number(P.bpm.toFixed(2)),q(`Scegli un tempo tra 10 e 500 BPM.`);return}let n=Number(t.valueAsNumber.toFixed(2));t.value=n,fi(n)},N(`inline-bpm`).onkeydown=e=>{e.key===`Escape`&&(e.target.value=Number(P.bpm.toFixed(2))),(e.key===`Enter`||e.key===`Escape`)&&e.target.blur()},N(`tempo`).onclick=()=>{X(),ri(`Tempo dello spartito`,[]);let e=N(`dialog-body`);e.innerHTML=`<form class="tempo-form"><label for="tempo-input">Tempo (BPM)</label><input id="tempo-input" type="number" inputmode="decimal" min="10" max="500" step=".01" required><p>Il tempo ridisegna la griglia attorno alla battuta 1. I colpi restano sincronizzati con l’audio.</p><button type="submit">Applica tempo</button></form>`;let t=N(`tempo-input`);t.value=Number(P.bpm.toFixed(2)),t.focus(),t.select(),e.firstElementChild.onsubmit=e=>{e.preventDefault();let n=t.valueAsNumber;N(`dialog`).close(),fi(n)}};function pi(e,t){if(e.measure){let n=I.bars[_r(e).bar+t];return n?.length===I.full?n.start:null}return Oe(I,e.time,t,P.duration)}function mi(e){let t=G()??gr();if(!t)return;let n=pi(t,e);n!==null&&(t.instrument?Kr(t,t.instrument,n):ei(t,n,t.voice))}N(`earlier`).onclick=()=>mi(-1),N(`later`).onclick=()=>mi(1),N(`undo`).onclick=()=>Lr(),N(`redo`).onclick=()=>Lr(!0),N(`remove`).onclick=Gr,N(`figure-value`).onchange=e=>{e.target.value===`group`?(Y(),Br()):Vr(Number(e.target.value))};function hi(e){let t=G()??gr(),n=(t?t.voice?t.written:Rr(t).value:br||I.q)*e;_e.includes(n)&&Vr(n)}N(`shorter`).onclick=()=>hi(.5),N(`longer`).onclick=()=>hi(2),N(`convert-figure`).onclick=Wr,N(`write-rest`).onclick=()=>{X(),$(!1),K=!K,R=null,Y()},N(`note-touch`).onchange=e=>{let t=R,n=e.target.value||void 0;Z(()=>{let e=P.events.find(e=>e.id===t);if(e&&n!==e.touch)return Rn(e.instrument,n).catch(J),Q(P.events.map(e=>e.id===t?{...e,touch:n}:e),t)})},N(`instrument`).onchange=e=>{let t=G(),n=e.target.value;t&&(Kr(t,n),Rn(n,t.touch).catch(J))},document.onkeydown=e=>{document.querySelector(`dialog[open]`)||(K&&e.key===`Escape`?(e.preventDefault(),K=!1,Y()):or&&e.key===`Escape`?(e.preventDefault(),$(!1),N(`first-bar`).focus()):!P||document.body.classList.contains(`section-open`)||N(`create-sheet`).open||[`INPUT`,`TEXTAREA`].includes(e.target.tagName)||N(`dialog`).open||N(`import-progress`).open||(!z&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`z`?(e.preventDefault(),Lr(e.shiftKey)):e.target.tagName!==`SELECT`&&(e.code===`Space`&&e.target.tagName!==`BUTTON`&&(e.preventDefault(),Tr(Mr)()),!z&&R&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&[`+`,`-`].includes(e.key)&&(e.preventDefault(),hi(e.key===`+`?2:.5)),!z&&[`Backspace`,`Delete`].includes(e.key)&&(e.preventDefault(),Gr()))))};for(let e of[Gn,dr,fr])e.onchange=()=>{if(!P)return;let e=G()??gr(),t=e&&!M()?_r(e).bar:Cr();L=Math.floor(t/W())*W(),Y()};document.addEventListener(`visibilitychange`,()=>{document.hidden&&P&&X()});async function gi(){let e=await Nt().catch(e=>(J(e),null));a(e?.id??null),qn=li(e),[`#studio`,`#numerazione`].includes(window.location.hash)&&window.history.replaceState(null,``,window.location.pathname+window.location.search),await qn.render(),window.addEventListener(`score-conflict`,()=>q(`Due versioni modificate. Trovi la copia locale nel repertorio.`)),window.addEventListener(`remote-score`,async e=>{if(e.detail!==F||(await cr,F!==e.detail))return;let t=await u(`scores`,F);if(t&&m(t)!==Kn){if(M()){q(`Versione aggiornata disponibile nel repertorio.`);return}await ii(t,!1)}}),$t()}gi().catch(J);export{$e as a,et as i,yn as n,E as o,_t as r,Cn as t};