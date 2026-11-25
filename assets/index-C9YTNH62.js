const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/esm-BktVZse2.js","assets/rolldown-runtime-BWaJ3C7D.js","assets/midi-import-Blh9R_MR.js","assets/transcribe-BsBpUfYe.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={name:`drumfolio-studio`,version:`0.1.0`,private:!0,type:`module`,scripts:{dev:`vite`,build:`vite build`,sync:`npm run build && cap sync`,test:`node --test tests/*.test.js`,"test:ui":`playwright test`,"test:services":`playwright test --config=playwright.services.config.js`},dependencies:{"@capacitor/android":`^8.6.2`,"@capacitor/app":`^8.1.2`,"@capacitor/browser":`^8.0.5`,"@capacitor/core":`^8.6.2`,"@capacitor/ios":`^8.6.2`,"@fontsource-variable/dm-sans":`^5.3.0`,"@fontsource/ibm-plex-mono":`^5.3.0`,"@revenuecat/purchases-capacitor":`^14.1.2`,"@supabase/supabase-js":`^2.119.2`,"@tonejs/midi":`^2.0.28`,"@vexflow-fonts/bravura":`^1.0.2`,"@wasm-audio-decoders/flac":`0.2.12`,"fft.js":`^4.0.4`,"lucide-static":`^1.79.0`,"onnxruntime-web":`^1.22.0`},devDependencies:{"@capacitor/cli":`^8.6.2`,"@playwright/test":`^1.65.1`,vite:`^8.3.8`}};function t(e){return new Promise((t,n)=>{let r=indexedDB.open(e,1);r.onupgradeneeded=()=>{for(let e of[`scores`,`audio`,`settings`])r.result.createObjectStore(e)},r.onsuccess=()=>t(r.result),r.onerror=()=>n(r.error)})}var n=t(`drumfolio-studio`),r=n,i=null;function a(e){i=e,r=e?t(`drumfolio-studio-user-`+e):n}var o=()=>i;async function s(e,t,n,i=r){let a=await i;return new Promise((r,i)=>{let o=a.transaction(e,t),s=n(o.objectStore(e));o.oncomplete=()=>r(s.result),o.onerror=o.onabort=()=>i(o.error??Error(`Salvataggio interrotto.`))})}function c(e){return e?.bytes instanceof ArrayBuffer?new File([e.bytes],e.name,{type:e.type}):e}async function l(e){return{name:e.name,type:e.type,bytes:await e.arrayBuffer()}}async function u(e,t){let n=await s(e,`readonly`,e=>e.get(t));return e===`audio`?c(n):t===`pending-song`&&n?{...n,file:c(n.file)}:n}function d(e,t){return!i||e.id===`pocket-study`?e:{...e,revision:t?.revision??null,change:crypto.randomUUID()}}function f(e){i&&e?.id!==`pocket-study`&&window.dispatchEvent(new Event(`score-written`))}async function p(e,t){let n=await r;return new Promise((r,i)=>{let a=n.transaction(`scores`,`readwrite`),o=a.objectStore(`scores`),s=o.get(e),c,l;s.onsuccess=()=>{try{c=t(s.result),c&&o.put(c,e)}catch(e){l=e,a.abort()}},a.oncomplete=()=>r(c),a.onabort=a.onerror=()=>i(l??a.error??Error(`Salvataggio interrotto.`))})}var m=e=>e?.change??e?.revision??null;async function h(e,t,n,r){if(e===`scores`){let e=await p(t,e=>{if(r!==void 0&&m(e)!==r)throw Error(`Lo spartito è stato aggiornato. Riaprilo dal repertorio per continuare.`);return d(n,e)});return f(e),e}return e===`audio`&&(n=await l(n)),t===`pending-song`&&(n={...n,file:await l(n.file)}),s(e,`readwrite`,e=>e.put(n,t))}var g=(e,t)=>s(e,`readonly`,e=>e.count(t)).then(e=>e>0),ee=()=>s(`scores`,`readonly`,e=>e.getAll());function te(){return s(`settings`,`readwrite`,e=>e.delete(`pending-song`))}async function ne(e,t,n,i=!1){let a=await r;return new Promise((r,o)=>{let s=a.transaction([`scores`,`audio`,`settings`],`readwrite`);s.oncomplete=()=>{f(e),r(e)},s.onabort=s.onerror=()=>o(s.error??Error(`Spazio insufficiente per salvare il brano.`));try{let r=s.objectStore(`scores`),a=s.objectStore(`audio`),o=s.objectStore(`settings`);r.add(e,e.id),t&&a.put(t,e.id),n&&a.put(n,[e.id,`drums`]),i||(o.put(e.id,`active`),o.delete(`pending-song`))}catch(e){s.abort(),o(e)}})}async function re(e,t,n){let[r,i]=await Promise.all([l(t),l(n)]);return ne(d(e),r,i)}async function ie(){if(!i)return[];let[e,t]=await Promise.all([s(`scores`,`readonly`,e=>e.getAll(),n),ee()]),r=new Set(t.map(e=>e.id));return e.filter(e=>e.id!==`pocket-study`&&!r.has(e.id))}async function ae(e){if(!i)throw Error(`Accedi per associare uno spartito.`);let[t,r,a]=await Promise.all([s(`scores`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get([e,`drums`]),n)]);if(!t||e===`pocket-study`)throw Error(`Spartito ospite non disponibile.`);return ne(d({id:e,project:t.project}),r,a,!0)}async function oe(e){let t=await r;return new Promise((n,r)=>{let i=t.transaction([`scores`,`audio`],`readwrite`),a=i.objectStore(`scores`),o=i.objectStore(`audio`),s=a.get(e.id),c;s.onsuccess=()=>{let t=s.result;if(t?.revision!==e.revision){if(t?.change===e.revision)a.put({...t,revision:e.revision,change:null},e.id);else{if(t?.change){let n=crypto.randomUUID(),r=(t.project.score_title||t.project.name)+` (copia locale)`;a.add(d({id:n,project:{...t.project,name:r,score_title:r}}),n);for(let t of[!1,!0]){let r=o.get(t?[e.id,`drums`]:e.id);r.onsuccess=()=>{r.result&&o.put(r.result,t?[n,`drums`]:n)}}c=`conflict`}else c=`updated`;a.put({id:e.id,revision:e.revision,change:null,project:{...t?.project,...e.score,bar_times:e.score.bar_times,bar_source:e.score.bar_source,first_numbered_bar:e.score.first_numbered_bar}},e.id)}}},i.oncomplete=()=>n(c),i.onerror=i.onabort=()=>r(i.error??Error(`Salvataggio interrotto.`))})}var se=Object.assign({"/node_modules/lucide-static/icons/activity.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
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
`});function _(e){return se[`/node_modules/lucide-static/icons/`+e+`.svg`]??``}function v(e,t,n,r=``){return`<button id="${e}" class="icon-button ${r}" title="${t}" aria-label="${t}">${_(n)}</button>`}var ce=e=>String(e).padStart(2,`0`),le=e=>Math.floor(e/60)+`:`+ce(Math.floor(e%60)),y=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function ue(){return`<header class="top"><div class="top-inner"><a class="wordmark" href="#repertorio" aria-label="Drumfolio · Home" title="Torna alla Home"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>drumfolio<span>.</span></a>
<div class="modes" hidden aria-label="Modalità"><button id="studio">${_(`sliders-horizontal`)}Studio</button><button id="live">${_(`radio`)}Live</button></div>
<button id="home-account" hidden></button><button id="upgrade" hidden>Drumfolio Plus</button><button id="library" class="icon-button" aria-label="Repertorio" hidden>${_(`folder-open`)}</button></div></header>
<main id="workspace" hidden>
<div class="song"><div class="cover" aria-hidden="true"><i></i><b>df.</b></div><div class="song-name"><span class="eyebrow" id="artist"></span><h1 id="title"></h1><div class="spec"><span id="bpm"></span><i></i><span id="meter"></span><i></i><span id="bar-total"></span></div></div></div>
<section class="score-panel" aria-label="Spartito"><div class="sheet-tools"><div class="sheet-label">${_(`book-open`)}<h2>Spartito</h2></div><div class="bar-tools"><button id="first-bar" aria-pressed="false" aria-controls="bar-placement">Inizio battute</button>${v(`align-bars`,`Allinea battute`,`ellipsis`)}</div><div class="sheet-nav">${v(`previous`,`Pagina precedente`,`chevron-left`)}<span id="page" class="mono"></span>${v(`next`,`Pagina successiva`,`chevron-right`)}</div></div>
<div id="bar-placement" hidden><span role="status">Tocca il rigo dove vuoi l’uno della battuta 1.</span><button id="use-playhead">Usa cursore</button>${v(`cancel-placement`,`Annulla posizionamento`,`x`)}</div>
<div class="paper"><div class="paper-heading"><div><div class="section-meta"><span class="section-rule"></span><span id="section-label"></span></div><h3 id="section-title"></h3></div><div id="paper-meter"></div></div><div id="bars"></div></div>
<div class="editor"><div class="ins-select"><label for="instrument">Strumento</label><select id="instrument"></select></div><div class="edit-buttons">${v(`undo`,`Annulla`,`undo-2`)}${v(`redo`,`Ripristina`,`redo-2`)}<i></i>${v(`remove`,`Elimina colpo`,`trash-2`)}</div></div></section>
<div class="hint"><span class="hint-dot"></span><span id="hint"></span></div>
</main>
<footer class="transport" hidden><div class="transport-inner"><div class="track-row"><div class="source-switch" role="group" aria-label="Sorgente audio"><button id="original-source" aria-label="Canzone originale" hidden>Originale</button><button id="drums-source" aria-label="Batteria isolata" hidden>Batteria</button><button id="source" aria-label="Altre sorgenti audio">${_(`headphones`)}<span id="source-name">Spartito</span>${_(`chevron-down`)}</button></div><span class="mono"><span id="elapsed">0:00</span><em> / </em><span id="duration"></span></span></div>
<label class="seek"><span class="sr">Posizione nel brano</span><input type="range" id="seek" min="0" step=".01" value="0"></label>
<div class="transport-row"><div class="bar-now"><span class="eyebrow">Battuta</span><strong id="bar-now"></strong></div><div class="play-group">${v(`rewind`,`Torna a inizio battuta`,`skip-back`)}${v(`play`,`Riproduci`,`play`,`play`)}${v(`loop`,`Ripeti battuta`,`repeat`)}</div><button id="grid" class="grid-button"><span class="eyebrow">Griglia</span><strong id="grid-text"></strong></button></div></div></footer>
<main id="section-screen"><p class="page-note" role="status">Apertura del repertorio…</p></main>
<nav id="app-nav" aria-label="Navigazione principale"><div class="nav-inner">
<button data-route="repertorio">${_(`book-open`)}<span>Repertorio</span></button>
<button data-route="supporto">${_(`headset`)}<span>Supporto</span></button>
<button id="new-action" aria-label="Nuova trascrizione"><span>${_(`plus`)}</span></button>
<button data-route="account">${_(`circle-user-round`)}<span>Account</span></button>
<button data-route="altro">${_(`ellipsis`)}<span>Altro</span></button>
</div></nav>
<dialog id="create-sheet" aria-labelledby="create-title"><div class="grip"></div><div class="dialog-head"><h2 id="create-title">Nuova trascrizione</h2>${v(`close-create`,`Chiudi`,`x`)}</div>
<label class="separation-choice" for="separation-mode">Separazione batteria<select id="separation-mode"><option value="fast">Rapida</option><option value="detailed">Approfondita · più lenta</option></select></label>
<button class="file-tile" id="pick-song">${_(`cloud-upload`)}<strong>Scegli un file</strong><small>MP3, WAV, M4A, FLAC, MP4 o MIDI</small></button>
<form id="link-form"><label for="import-url">Importa da un link</label><div class="field-action"><input required type="url" id="import-url" inputmode="url" placeholder="https://…" autocomplete="off"><button aria-label="Apri link" type="submit">${_(`chevron-right`)}</button></div><small>Link audio, YouTube, Instagram o TikTok</small></form>
<button id="record-audio" class="record-row">${_(`mic`)}<span>Registra al microfono</span></button><p id="create-status" role="status"></p>
</dialog>
<dialog id="dialog"><div class="dialog-head"><h2 id="dialog-title"></h2>${v(`close`,`Chiudi`,`x`)}</div><div id="dialog-body"></div></dialog>
<dialog id="import-progress" aria-labelledby="import-title"><div class="import-symbol">${_(`audio-lines`)}</div>
<span class="eyebrow">Importa brano</span><h2 id="import-title"></h2>
<p id="import-phase" role="status"></p><progress id="import-meter" max="1" value="0"></progress>
<div class="import-foot"><span id="import-detail">Analisi sul dispositivo</span><button id="cancel-import">Annulla</button></div></dialog>
<input type="file" id="song-file" accept="audio/mpeg,.mp3" hidden>
<div id="notice" role="status" aria-live="polite"></div>
<input type="file" id="project-file" accept="*/*" hidden><input type="file" id="audio-file" accept="audio/*,.mp3,.wav,.m4a" hidden>`}var b={kick:[`Cassa`,1],low_tom:[`Tom basso`,3],snare:[`Rullante`,5],mid_tom:[`Tom medio`,6],high_tom:[`Tom alto`,7],ride:[`Ride`,8],hi_hat_closed:[`Hi-hat chiuso`,9],hi_hat_open:[`Hi-hat aperto`,9],crash:[`Crash`,10],unknown:[`Da assegnare`,14]},de=e=>[`hi_hat_closed`,`hi_hat_open`,`crash`,`ride`,`unknown`].includes(e);function x(e){if(!e||typeof e.name!=`string`||e.version!==1||!Number.isFinite(e.bpm)||e.bpm<10||e.bpm>500||!Number.isFinite(e.duration)||e.duration<=0||!/^(?:[1-9]|[12]\d|3[0-2])\/(?:2|4|8|16)$/.test(e.meter)||![8,16,32].includes(e.grid??16)||!Array.isArray(e.events)||!Array.isArray(e.automatic))throw Error(`Formato del progetto non valido.`);for(let t of[e.events,e.automatic]){let n=new Set;for(let r of t){if(!r||typeof r.id!=`string`||n.has(r.id)||!Object.hasOwn(b,r.instrument)||!Number.isFinite(r.time)||r.time<0||r.time>e.duration||!Number.isInteger(r.velocity)||r.velocity<1||r.velocity>127)throw Error(`Il progetto contiene un colpo non valido.`);n.add(r.id)}}if(e.bar_times!==void 0&&(!Array.isArray(e.bar_times)||!e.bar_times.length||e.bar_times.some((t,n,r)=>!Number.isFinite(t)||t<0||t>=e.duration||n&&t<=r[n-1])))throw Error(`Mappa delle battute non valida.`)}function fe(e){let[t,n]=e.meter.split(`/`).map(Number),r=32/n,i=t*r,a=32/(e.grid??16),o=e.bar_times??[0],s=i*60/(8*e.bpm),c=o.length>1?o[1]-o[0]:s,l=o.length>1?o.at(-1)-o.at(-2):s,u=Math.ceil(o[0]/c-1e-9),d=[],f=e=>d.push({start:e,length:i});for(let e=0;e<u;e++)f(Math.max(0,o[0]-(u-e)*c));for(o.forEach(f);d.at(-1).start+l<e.duration-1e-8;)f(d.at(-1).start+l);d.forEach((e,t)=>{e.end=d[t+1]?.start??e.start+l}),u&&(d[0].length=Math.max(1,Math.round(i*(d[0].end-d[0].start)/c)));let p=+(d[0].length<i),m=Number.isInteger(e.first_numbered_bar)&&e.first_numbered_bar>=0&&e.first_numbered_bar<d.length?e.first_numbered_bar:e.bar_source===`manual`?u:p;d.forEach((e,t)=>{e.number=t-m+1});function h(e,t=!1){let n=0,r=d.length;for(;n+1<r;){let t=n+r>>1;d[t].start<=e?n=t:r=t}let i=d[n],o=i.length*(e-i.start)/(i.end-i.start);if(!t)return{bar:n,tick:Math.max(0,Math.min(o,i.length))};let s=Math.floor((i.length-1)/a)*a;return n+1<d.length&&o>=(s+i.length)/2?{bar:n+1,tick:0}:{bar:n,tick:Math.max(0,Math.min(s,Math.round(o/a)*a))}}return{bars:d,at:h,seconds:(e,t)=>d[e].start+(d[e].end-d[e].start)*t/d[e].length,beat:r,q:a,full:i,firstComplete:p}}function pe(){let e=60/96,t=[];for(let n=0;n<12;n++){let r=(r,i,a)=>t.push({id:`pocket-`+t.length,time:(4*n+r)*e,instrument:i,velocity:a});for(let e=0;e<8;e++)r(e/2,n%4==0&&!e?`crash`:e===7&&n%3==2?`hi_hat_open`:`hi_hat_closed`,e%2?68:87);for(let e of n%2?[0,1.5,2.5]:[0,2,2.5])r(e,`kick`,104);r(1,`snare`,104),r(3,`snare`,106),n%4==3&&(r(3.5,`high_tom`,88),r(3.75,`low_tom`,96))}return{version:1,name:`Midnight Pocket`,artist:`Drumfolio Sessions`,bpm:96,meter:`4/4`,duration:48*e,grid:16,tracks:{},mode:`stem`,sections:{1:`Groove`,5:`Variazione`,9:`Ripresa`},events:t,automatic:structuredClone(t)}}function me(e,t,{firstBar:n=!1}={}){if(!Number.isFinite(t)||t<0||t>=e.duration)throw Error(`Scegli un punto prima della fine del brano.`);let r=fe(e),i=r.bars.slice(r.firstComplete),a=i.length?i:r.bars,o=a.reduce((e,n)=>Math.abs(n.start-t)<Math.abs(e.start-t)?n:e),s=t-o.start,c={bar_times:a.map(e=>e===o?t:e.start+s).filter(t=>t>=0&&t<e.duration),bar_source:`aligned`};if(n||Number.isInteger(e.first_numbered_bar)||e.bar_source===`manual`){let r=fe({...e,...c}),i=r.at(t).bar;c.first_numbered_bar=n?i:Math.max(0,Math.min(r.bars.length-1,i-o.number+1))}return c}function he(e,t,n){let r=fe(e).at(t).bar;if(!Number.isInteger(n)||n<1||n>r+1)throw Error(`Scegli un numero fra 1 e `+(r+1)+`.`);return r-n+1}var S;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(S||={});var ge=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},_e=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,ve=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?_e(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new ge(`"${e}" plugin is not implemented on ${c}`,S.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new ge(`"${e}.${t}()" is not implemented on ${c}`,S.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),ee=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},te=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?ee:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=te,l.set(e,{name:e,proxy:te,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),te},n.Exception=ge,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},ye=(e=>e.Capacitor=ve(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),be=ye.registerPlugin,xe=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new ye.Exception(e,S.Unimplemented)}unavailable(e=`not available`){return new ye.Exception(e,S.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},Se=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ce=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),we=class extends xe{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=Ce(n).trim(),r=Ce(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=Se(e.key),n=Se(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};be(`CapacitorCookies`,{web:()=>new we});var Te=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),Ee=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},De=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,Oe=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=Ee(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},ke=class extends xe{async request(e){let t=Oe(e,e.webFetchExtra),n=De(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await Te(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};be(`CapacitorHttp`,{web:()=>new ke});var Ae;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(Ae||={});var je;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(je||={});var Me=class extends xe{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};be(`SystemBars`,{web:()=>new Me});var Ne=`modulepreload`,Pe=function(e){return`/drumfolio-beta/`+e},Fe={},Ie=function(e){return e.pathname.endsWith(`.css`)},Le=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},C=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Pe(t,n);let r=s(t),i=Ie(r);return Le(Fe,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ne,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Re=be(`App`,{web:()=>C(()=>import(`./web-BKza81iP.js`).then(e=>new e.AppWeb),[])}),ze=be(`Browser`,{web:()=>C(()=>import(`./web-Bq6o2HUw.js`).then(e=>new e.BrowserWeb),[])}),w={BASE_URL:`/drumfolio-beta/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1,VITE_SUPABASE_PUBLISHABLE_KEY:`sb_publishable_TEyTU3tuJHc9kGNAHSJOhg_AJdzNgss`,VITE_SUPABASE_URL:`https://eskaigregmpgljwkhtph.supabase.co`},T=!!(w.VITE_SUPABASE_URL&&w.VITE_SUPABASE_PUBLISHABLE_KEY),Be=ye.isNativePlatform(),Ve={ios:w.VITE_RC_IOS_KEY,android:w.VITE_RC_ANDROID_KEY}[ye.getPlatform()],He=!!(Be&&Ve),E=!Be,Ue=Be?`drumfolio://auth/callback`:location.origin+location.pathname,We,Ge,Ke,qe;async function Je(){if(!T)throw Error(`L’accesso online sarà disponibile dopo la configurazione del servizio.`);return Ge??=C(async()=>{let{createClient:e}=await import(`./dist-DwhOg3L3.js`);return{createClient:e}},[]).then(({createClient:e})=>e(w.VITE_SUPABASE_URL,w.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`,detectSessionInUrl:!Be}})),We=await Ge,We}async function Ye(){return(await Je()).auth}async function Xe(){if(!E||!T)return null;let{data:e,error:t}=await(await Ye()).getSession();if(t)throw t;return e.session?.user??null}async function Ze(e,t){if(!T)return;let n=await Ye();if(n.onAuthStateChange((t,n)=>setTimeout(()=>e(n?.user??null),0)),!Be)return;async function r(e){let r=new URL(e);if(r.protocol!==`drumfolio:`||r.host!==`auth`||r.pathname!==`/callback`)return;let i=r.searchParams.get(`code`);if(i&&i!==qe){qe=i;try{let{error:e}=await n.exchangeCodeForSession(i);if(e)throw e}catch(e){qe=null,t(e)}finally{await ze.close().catch(()=>{})}}}await Re.addListener(`appUrlOpen`,({url:e})=>r(e).catch(t));let i=await Re.getLaunchUrl();i?.url&&await r(i.url)}async function Qe(e,t,n){let r=await Ye();if(e===`google`||e===`apple`){let{data:t,error:n}=await r.signInWithOAuth({provider:e,options:{redirectTo:Ue,skipBrowserRedirect:Be}});if(n)throw n;Be&&await ze.open({url:t.url});return}let i;if(i=e===`register`?await r.signUp({email:t,password:n,options:{emailRedirectTo:Ue}}):e===`password`?await r.updateUser({password:n}):await r.signInWithPassword({email:t,password:n}),i.error)throw i.error;return i.data}async function $e(){let{error:e}=await(await Ye()).signOut({scope:`local`});if(e)throw e}async function et(e){if(!He)throw Error(`Lo store non è attivo in questa versione.`);Ke||=(async()=>{let e=await C(()=>import(`./esm-BktVZse2.js`).then(e=>e.t),__vite__mapDeps([0,1]));return await e.Purchases.configure({apiKey:Ve}),e})().catch(e=>{throw Ke=null,e});let t=await Ke,n=t.Purchases,r=await n.getAppUserID();return e&&r.appUserID!==e.id?await n.logIn({appUserID:e.id}):!e&&!(await n.isAnonymous()).isAnonymous&&await n.logOut(),t}async function tt(e){if(!He)return{active:!1,credits:null,packages:[]};let{Purchases:t}=await et(e),[{customerInfo:n},r,i]=await Promise.all([t.getCustomerInfo(),t.getOfferings(),t.getVirtualCurrencies().then(({virtualCurrencies:e})=>Object.values(e.all)).catch(()=>null)]);return{active:!!n.entitlements.active[w.VITE_RC_ENTITLEMENT||`plus`],credits:i,packages:r.current?.availablePackages??[]}}async function nt(e,t){await(await et(e)).Purchases.purchasePackage({aPackage:t})}async function rt(e){await(await et(e)).Purchases.restorePurchases()}async function it(e){let{error:t}=await(await Ye()).updateUser({data:{display_name:e}});if(t)throw t}async function at(e,t){let n=w.VITE_MEDIA_RESOLVER_URL;if(!n||!T)return null;let r=new URL(n);if(r.protocol!==`https:`&&!(r.protocol===`http:`&&[`localhost`,`127.0.0.1`].includes(r.hostname)))throw Error(`Il servizio per i link richiede HTTPS.`);let{data:i,error:a}=await(await Ye()).getSession();if(a)throw a;if(!i.session)return null;let o=await fetch(r,{method:`POST`,signal:t,redirect:`error`,credentials:`omit`,headers:{"Content-Type":`application/json`,Authorization:`Bearer `+i.session.access_token},body:JSON.stringify({url:e.href})});if(!o.ok)throw Error(`Il servizio non ha potuto leggere questo post.`);let s=decodeURIComponent(o.headers.get(`X-Audio-Title`)||`Audio dal post`);return new File([await o.blob()],s+`.m4a`,{type:`audio/mp4`})}function ot(e){x(e);let t=e=>typeof e==`string`?e.slice(0,500):void 0,n=e=>e.map(({id:e,time:t,instrument:n,velocity:r})=>({id:e,time:t,instrument:n,velocity:r}));return{version:1,name:t(e.name),score_title:t(e.score_title),artist:t(e.artist),bpm:e.bpm,meter:e.meter,duration:e.duration,grid:e.grid??16,bar_times:e.bar_times,bar_source:t(e.bar_source),first_numbered_bar:Number.isInteger(e.first_numbered_bar)?e.first_numbered_bar:void 0,sections:e.sections?Object.fromEntries(Object.entries(e.sections).filter(([e,t])=>/^\d+$/.test(e)&&typeof t==`string`).map(([e,n])=>[e,t(n)])):void 0,events:n(e.events),automatic:n(e.automatic)}}var st,ct=!1,lt,ut=``;function dt(e){ut=e,window.dispatchEvent(new Event(`sync-status`))}function ft(e=800){o()&&(clearTimeout(lt),lt=setTimeout(ht,e))}function pt(e){if(e.error)throw e.error;return e.data}async function mt(){let e=o(),t=await Je(),n=()=>t.from(`drumfolio_scores`),r=await ee(),i=new Map(r.map(e=>[e.id,e])),a=new Set,s=new Map;for(let t=0;;t+=250){let r=pt(await n().select(`id,revision`).eq(`owner_id`,e).order(`id`).range(t,t+249));for(let e of r)s.set(e.id,e.revision);if(r.length<250)break}for(let[e,t]of s){let n=i.get(e);t!==n?.revision&&t!==n?.change&&a.add(e)}for(let t of r)if(t.change&&!a.has(t.id)){if(s.get(t.id)!==t.change){let r={score:ot(t.project),revision:t.change};if(t.revision){if(pt(await n().update(r).eq(`owner_id`,e).eq(`id`,t.id).eq(`revision`,t.revision).select(`id`)).length===0){a.add(t.id);continue}}else{let i=await n().insert({...r,id:t.id,owner_id:e});if(i.error?.code===`23505`){a.add(t.id);continue}pt(i)}}await p(t.id,e=>{if(e&&e.revision===t.revision)return{...e,revision:t.change,change:e.change===t.change?null:e.change}})}for(let t of a){let r=pt(await n().select(`id,score,revision`).eq(`owner_id`,e).eq(`id`,t).single());x(r.score);let i=await oe(r);i===`conflict`&&(ct=!0,window.dispatchEvent(new Event(`score-conflict`))),i&&window.dispatchEvent(new CustomEvent(`remote-score`,{detail:t}))}}function ht(){if(!o())return;if(st)return ct=!0,st;let e=async()=>{do ct=!1,await mt();while(ct);dt(`Spartiti sincronizzati`)};return dt(`Sincronizzazione in corso…`),st=Promise.resolve().then(()=>navigator.locks?navigator.locks.request(`drumfolio-sync-`+o(),e):e()).catch(()=>dt(`Sincronizzazione in attesa. Le modifiche sono salvate sul dispositivo.`)).finally(()=>{st=null}),st}function gt(){o()&&(window.addEventListener(`score-written`,()=>ft()),window.addEventListener(`online`,()=>ft(0)),document.addEventListener(`visibilitychange`,()=>{document.hidden||ft(0)}),setInterval(()=>{!document.hidden&&navigator.onLine&&ft(0)},6e4),ht())}var D=(e,t,n,r=``)=>`<button class="menu-row" data-act="${y(e)}"><i>${_(t)}</i><span><strong>${y(n)}</strong>${r?`<small>`+y(r)+`</small>`:``}</span>${_(`chevron-right`)}</button>`,O=(e,t=``)=>`<div class="page-head"><h1>${y(e)}</h1>${t?`<p>`+y(t)+`</p>`:``}</div>`,k=(e,t)=>`<section class="section-group"><h2>${y(e)}</h2><div class="section-card">${t}</div></section>`,_t=(e,t)=>`<button class="mint-button" data-act="${e}">${y(t)}</button>`,vt=(e,t)=>`<details><summary>${y(e)}${_(`chevron-down`)}</summary><p>${y(t)}</p></details>`,yt=[[`Come importo un brano?`,`Tocca il +, scegli un file da File o Download e tieni Drumfolio in primo piano. La batteria viene separata sul dispositivo. Al termine si apre lo spartito.`],[`Come correggo un colpo?`,`In Studio tocca la nota e scegli lo strumento, oppure trascinala sul rigo. Un doppio tocco aggiunge un colpo. Usa il cestino per eliminarlo e la freccia Annulla per recuperarlo.`],[`Come scelgo l’inizio della battuta 1?`,`In Studio tocca Inizio battute e poi il punto sul rigo dove senti l’uno. Per usare la posizione del player, scegli Usa cursore. Puoi tornare alla griglia precedente con Annulla.`],[`Come ascolto soltanto la batteria?`,`Nel player tocca la sorgente audio e scegli Batteria isolata. Per confrontarla con la trascrizione scegli Suoni dello spartito.`],[`Come suono con la modalità Live?`,`Apri un brano, tocca Live e avvia il player. Il cursore segue il tempo. Il pulsante con le due frecce mette in loop la battuta corrente.`],[`Dove sono i miei brani?`,`Da ospite i brani restano sul dispositivo. Nella beta web, accedendo con Google puoi sincronizzare spartiti e correzioni. Originale e batteria isolata restano sul dispositivo.`],[`Posso usare il link di un post?`,`Incolla il link nella nuova trascrizione. Per YouTube, Instagram e TikTok scegli anche il file del post. Drumfolio conserva il riferimento accanto al brano.`]],bt={kick:`Primo spazio dal basso`,snare:`Terzo spazio dal basso`,low_tom:`Secondo spazio`,mid_tom:`Quarta linea`,high_tom:`Quarto spazio`,hi_hat_closed:`Croce sopra il rigo`,hi_hat_open:`Croce cerchiata sopra il rigo`,ride:`Rombo`,crash:`Triangolo`,unknown:`Croce arancione, da assegnare`},xt=new Set([`studio`,`repertorio`,`supporto`,`account`,`altro`,`accesso`,`registrazione`,`profilo`,`plus`,`legenda`,`licenze`,`password`,`numerazione`]);function St(t){let n=document.getElementById(`section-screen`),r=document.getElementById(`app-nav`),i=e=>document.getElementById(e),a=`repertorio`,s=`repertorio`,c=0,l=t.user,d=null,f=null,p=!1;function m(){let e=location.hash.slice(1);return!xt.has(e)||[`studio`,`numerazione`].includes(e)&&!t.active()?`repertorio`:e}function g(e){m()===e?S():location.hash=e}function ne(e){t.notify(e?.message||`Operazione interrotta.`)}async function re(){let e=l?`profile:`+l.id:`profile:guest`,t=await u(`settings`,e);return t||(t={id:l?.id??crypto.randomUUID(),name:``},await h(`settings`,e,t)),t}let oe=()=>d?.name||l?.user_metadata?.display_name||l?.email||`Musicista ospite`;function se(){let e=[`accesso`,`registrazione`,`profilo`,`password`,`plus`].includes(a)?`account`:[`legenda`,`licenze`,`numerazione`].includes(a)?`altro`:a;r.querySelectorAll(`[data-route]`).forEach(t=>{t.dataset.route===e?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)})}function v(e){let n=e.project,r=n.artist||n.name.split(` - `).slice(0,-1).join(` - `),i=n.score_title||n.name.split(` - `).at(-1),a=[r,le(n.duration),Math.round(n.bpm)+` BPM`].filter(Boolean).join(` · `);return`<button class="song-row" data-score="${y(e.id)}"><i class="record-disc">${_(`disc-3`)}</i><span><strong>${y(i)}</strong><small>${y(a)}</small></span>${e.id===t.active()?`<b class="open-dot" title="Spartito aperto"></b>`:_(`chevron-right`)}</button>`}async function ce(){let[e,t]=await Promise.all([ee(),u(`settings`,`pending-song`)]),n=e.filter(e=>e.id!==`pocket-study`).sort((e,t)=>e.project.name.localeCompare(t.project.name,`it`)),r=`<section class="home-hero"><div class="home-hero-content"><h1>${n.length?`Nuova trascrizione`:`Il tuo primo brano`}</h1>
      <p>Importa una canzone per ottenere lo spartito modificabile della batteria.</p>
      <button class="home-upload" data-act="new">${_(`upload`)}Carica un brano</button></div></section>`,i=n.length?`<div class="section-card">${n.map(v).join(``)}</div>`:`<div class="home-empty">${_(`folder-open`)}<div><strong>Nessun brano salvato</strong><p>${l&&E?`Qui ritrovi anche gli spartiti sincronizzati.`:`I brani che importi vengono salvati su questo dispositivo.`}</p></div></div>`;return r+(t?k(`Importazione incompleta`,D(`resume`,`history`,`Riprendi importazione`,t.file.name)+D(`discard`,`trash-2`,`Scarta importazione incompleta`)):``)+`<section aria-labelledby="home-songs"><div class="catalog-title"><h2 id="home-songs">Il tuo repertorio</h2>${n.length?`<span>`+n.length+`</span>`:``}</div>${i}</section>
      <div class="home-shortcuts">${D(`project`,`folder-open`,`Apri un progetto`,`File .drums`)}${D(`demo`,`headphones`,`Prova una demo`,`Midnight Pocket`)}</div>`}function ue(){return O(`Supporto`,`Guida a Drumfolio Studio`)+k(`Domande frequenti`,yt.map(([e,t])=>vt(e,t)).join(``))+D(`legenda`,`book-open`,`Legenda dello spartito`)}async function de(){d=await re();let e=oe();return O(`Account`)+`<div class="profile-card"><div class="avatar">${y(e.trim().slice(0,1).toUpperCase())}</div><h2>${y(e)}</h2><p>${y(l?.email||`Profilo su questo dispositivo`)}</p><small>ID · ${y(d.id)}</small>${_t(`profilo`,`Modifica profilo`)}</div>`+(l?``:k(`Accesso`,D(`accesso`,`log-in`,`Accedi o registrati`)))+(E?``:k(`Crediti e abbonamento`,`<div id="balance" class="balance" aria-live="polite">${He?`Caricamento saldo…`:`Trascrizione locale inclusa`}</div>`+D(`plus`,`ticket`,`Drumfolio Plus`,`Piani e ripristino acquisti`)))+(E&&l?await fe():``)+(l?k(`Gestione account`,(E?``:D(`password`,`lock-keyhole`,`Cambia password`))+D(`logout`,`log-in`,`Esci dall’account`)):``)}let x=e=>`<strong>${e.active?`Drumfolio Plus`:`Piano Studio`}</strong>${e.credits===null?`<p>Saldo crediti temporaneamente non disponibile.</p>`:e.credits.map(e=>`<p>`+y(e.name)+` · `+y(e.balance)+`</p>`).join(``)}`;async function fe(){let e=(await ie()).map(e=>D(`adopt-`+e.id,`cloud-upload`,e.project.score_title||e.project.name,`Copia nel mio account`)).join(``);return k(`Sincronizzazione`,`<p class="page-note" id="sync-status" role="status">${y(ut||`Spartiti e correzioni nel tuo account`)}</p>`+D(`sync`,`cloud-upload`,`Sincronizza ora`,`MP3 e batteria isolata restano sul dispositivo`))+(e?k(`Scegli uno spartito ospite da copiare`,e):``)}function pe(){if(E)return`<div class="login-image"></div>`+O(`Accedi a Drumfolio`,`Ritrova spartiti e correzioni sui tuoi dispositivi.`)+`<div class="providers"><button data-act="google" `+(T?``:`disabled`)+`>Continua con Google</button></div>`+(T?``:`<p class="page-note">Accesso Google non configurato in questa anteprima.</p>`)+`<div class="end-actions">`+_t(`repertorio`,`Continua come ospite`)+`</div>`;let e=a===`registrazione`,t=a===`password`,n=T?``:` disabled`;return`<div class="login-image"></div>`+O(t?`Cambia password`:e?`Crea un account`:`Accedi a Drumfolio`)+(T?``:`<div class="guest-access"><p>Il profilo ospite è disponibile su questo dispositivo. L’accesso online richiede il collegamento del servizio account.</p>`+_t(`repertorio`,`Continua come ospite`)+`</div>`)+`<form class="account-form" id="auth-form">${t?``:`<label>Email<input name="email" type="email" autocomplete="email" required`+n+`></label>`}<label>${t?`Nuova password`:`Password`}<input name="password" type="password" autocomplete="${e||t?`new-password`:`current-password`}" ${e||t?`minlength="8"`:``} required${n}></label><button class="mint-button" ${n}>${t?`Salva password`:e?`Crea account`:`Accedi`}</button></form>`+(t?``:`<div class="providers"><button data-act="google"${n}>Continua con Google</button><button data-act="apple"${n}>Continua con Apple</button></div>`)+(t?``:`<div class="end-actions"><button data-act="${e?`accesso`:`registrazione`}">${e?`Ho già un account`:`Registrati`}</button>${T?`<button data-act="repertorio">Continua come ospite</button>`:``}</div>`)}async function me(){if(a===`repertorio`)return ce();if(a===`supporto`)return ue();if(a===`account`)return de();if([`accesso`,`registrazione`,`password`].includes(a))return pe();if(a===`profilo`)return d=await re(),O(`Modifica profilo`)+`<form id="profile-form" class="account-form"><label>Nome visualizzato<input name="name" required maxlength="60" value="${y(d.name||l?.user_metadata?.display_name||``)}" placeholder="Il tuo nome"></label><button class="mint-button">Salva profilo</button></form>`;if(a===`plus`&&E)return de();if(a===`plus`)return O(`Drumfolio Plus`)+k(`Abbonamento`,`<div id="offers" class="balance" role="status">`+(He?`Caricamento piani…`:`Gli acquisti saranno disponibili con la distribuzione sugli store. Le trascrizioni locali sono già incluse.`)+`</div>`)+`<button class="secondary-btn" data-act="restore" ${He?``:`disabled`}>${_(`history`)}Ripristina acquisti</button>`;if(a===`numerazione`){let e=t.barInfo();return O(`Numera la battuta`,`Il cursore si trova nella battuta che inizia a `+e.time.toFixed(2).replace(`.`,`,`)+` s.`)+`<form id="bar-form" class="account-form"><label>Numero di battuta<input name="bar" type="number" inputmode="numeric" min="1" max="${e.max}" step="1" value="${Math.max(1,e.number)}" required></label><p class="page-note">La numerazione automatica conta anche le battute intere di pausa. Puoi scegliere qui un primo numero diverso.</p><button class="mint-button">Applica allo spartito</button></form><button class="secondary-btn reset-count" data-act="auto-bars">Conta tutte le battute intere</button>`}if(a===`legenda`)return O(`Legenda dello spartito`)+k(`Batteria`,Object.entries(bt).map(([e,t])=>`<div class="legend-row"><b>${y(b[e][0])}</b><span>${t}</span></div>`).join(``));if(a===`licenze`){let e=await fetch(`/drumfolio-beta/third-party.txt`);if(!e.ok)throw Error(`Licenze non disponibili.`);return O(`Licenze`)+`<pre class="licenses">`+y(await e.text())+`</pre>`}let n=``;try{let e=new URL(t.sourceLink());e.protocol===`https:`&&!e.username&&!e.password&&(n=k(`Fonte del brano`,`<a class="source-link" target="_blank" rel="noopener noreferrer" href="`+y(e.href)+`">`+y(e.hostname)+` `+_(`external-link`)+`</a>`))}catch{}return O(`Altro`)+n+k(`Studio`,(t.active()?D(`numerazione`,`list-music`,`Numera la battuta al cursore`):``)+D(`legenda`,`drum`,`Legenda dello spartito`)+D(`project`,`folder-open`,`Apri progetto .drums`)+D(`supporto`,`headset`,`Supporto`))+k(`Drumfolio`,(E?``:D(`plus`,`ticket`,`Piani e acquisti`))+D(`licenze`,`book-open`,`Licenze software`))+(E?`<p class="page-note"><a href="/drumfolio-beta/privacy.html">Privacy della beta</a></p>`:``)+`<p class="page-note">Drumfolio Studio · `+y(e.version)+`</p>`}async function he(e){try{let t=await tt(l);if(e!==c)return;f=t,a===`account`&&(i(`balance`).innerHTML=x(t)),a===`plus`&&(i(`offers`).innerHTML=x(t)+(t.packages.length?t.packages.map((e,t)=>D(`buy-`+t,`ticket`,e.product.title,e.product.priceString)).join(``):`<p>Nessun piano disponibile nello store.</p>`))}catch{e===c&&((i(`balance`)||i(`offers`)).textContent=`Store irraggiungibile. Riapri questa sezione per riprovare.`)}}async function S(){let e=++c;a=m();let r=a===`studio`;r||t.pause(),document.body.classList.toggle(`section-open`,!r),i(`workspace`).hidden=!r,n.hidden=r,document.querySelector(`.transport`).hidden=!r,document.querySelector(`.modes`).hidden=!r;let o=a===`repertorio`;(o||r)&&(s=a),document.body.classList.toggle(`home-open`,o),i(`home-account`).hidden=!o,i(`home-account`).innerHTML=_(`circle-user-round`)+(l?`Il mio account`:`Accedi`),i(`library`).hidden=o;let u=r?`Torna alla Home`:s===`studio`?`Torna allo spartito`:`Torna al repertorio`;if(i(`library`).setAttribute(`aria-label`,u),i(`library`).title=u,i(`library`).classList.toggle(`home-link`,r),i(`library`).innerHTML=r?_(`house`)+`<span>Home</span>`:_(`arrow-left`),i(`upgrade`).hidden=E||r||a===`plus`,se(),window.scrollTo(0,0),r)n.replaceChildren();else{n.setAttribute(`aria-busy`,`true`),n.replaceChildren();try{let t=await me();if(e!==c)return;n.innerHTML=t+`<p id="page-status" class="page-note" role="status"></p>`,He&&[`account`,`plus`].includes(a)&&he(e)}catch(t){e===c&&(n.textContent=t.message)}finally{e===c&&n.removeAttribute(`aria-busy`)}}}let ge=e=>{i(`page-status`)?i(`page-status`).textContent=e:t.notify(e)};async function _e(e){if(xt.has(e))g(e);else if(e===`sync`)await ht(),await S();else if(e.startsWith(`adopt-`)&&l)await ae(e.slice(6)),await S();else if(e===`auto-bars`)await t.numberBar(null);else if(e===`demo`)await t.openDemo();else if(e===`new`)t.create();else if(e===`file`)i(`song-file`).click();else if(e===`project`)i(`project-file`).click();else if(e===`resume`){let e=await u(`settings`,`pending-song`);e&&await t.resume(e)}else if(e===`discard`)await te(),await S();else if(e===`login`||e===`google`||e===`apple`)await Qe(e);else if(e===`logout`)await $e(),g(`account`);else if(e===`restore`||e.startsWith(`buy-`)){if(p)return;p=!0;try{e===`restore`?await rt(l):await nt(l,f.packages[Number(e.slice(4))]),await S(),ge(e===`restore`?`Verifica acquisti completata.`:`Acquisto completato.`)}finally{p=!1}}}return r.onclick=e=>{let n=e.target.closest(`button`);n&&(n.id===`new-action`?t.create():g(n.dataset.route))},n.onclick=e=>{let n=e.target.closest(`button`);n&&(n.dataset.score?u(`scores`,n.dataset.score).then(e=>t.open(e)).catch(ne):n.dataset.act&&_e(n.dataset.act).catch(e=>ge(e.message)))},n.onsubmit=async e=>{if(e.preventDefault(),p)return;p=!0;let n=e.target,r=new FormData(n),i=n.querySelector(`button[type=submit],.mint-button`);i.disabled=!0;try{if(n.id===`bar-form`)await t.numberBar(Number(r.get(`bar`)));else if(n.id===`profile-form`){let e=String(r.get(`name`)).trim();if(!e)throw Error(`Inserisci un nome.`);l&&await it(e),await h(`settings`,l?`profile:`+l.id:`profile:guest`,{...d,name:e}),g(`account`)}else{let e=a===`registrazione`,t=await Qe(a===`password`?`password`:e?`register`:`login`,r.get(`email`),r.get(`password`));e&&!t?.session?ge(`Controlla la tua email per confermare la registrazione.`):g(`account`)}}catch(e){ge(e.message)}finally{p=!1,i.disabled=!1}},i(`upgrade`).onclick=()=>g(`plus`),i(`home-account`).onclick=()=>g(l?`account`:`accesso`),i(`library`).onclick=()=>g(a===`studio`?`repertorio`:s),window.addEventListener(`hashchange`,S),ye.getPlatform()===`android`&&Re.addListener(`backButton`,()=>{let e=document.querySelector(`dialog[open]`);if(e){let t=new Event(`cancel`,{cancelable:!0});e.dispatchEvent(t)&&e.close()}else a===`repertorio`?Re.minimizeApp():g([`registrazione`,`profilo`,`plus`,`password`].includes(a)?`account`:`repertorio`)}),Ze(e=>{let n=l?.id!==e?.id||l?.email!==e?.email||l?.user_metadata?.display_name!==e?.user_metadata?.display_name;E&&(e?.id??null)!==o()?(document.body.inert=!0,t.pause(),location.replace(location.pathname+location.search+`#account`),location.reload()):(l=e,e&&[`accesso`,`registrazione`].includes(a)?g(`account`):n&&a!==`studio`&&S())},ne).catch(ne),window.addEventListener(`sync-status`,()=>{i(`sync-status`)&&(i(`sync-status`).textContent=ut)}),window.addEventListener(`remote-score`,()=>{a===`repertorio`&&S()}),{go:g,render:S}}var Ct=`audio/*,video/mp4,.mp3,.wav,.m4a,.aac,.flac,.ogg,.webm,.mp4,.mid,.midi`;function wt(e){return/(^|\.)(youtube\.com|youtu\.be|instagram\.com|tiktok\.com)$/.test(e.hostname.toLowerCase())}function Tt(e){let t;try{t=new URL(e.trim())}catch{throw Error(`Inserisci un collegamento HTTPS completo.`)}if(t.protocol!==`https:`||t.username||t.password)throw Error(`Usa un collegamento HTTPS pubblico.`);return t}async function Et(e,t){let n=await fetch(e,{signal:t,credentials:`omit`,referrerPolicy:`no-referrer`});if(!n.ok)throw Error(`Il link non ha restituito un file audio.`);let r=n.headers.get(`Content-Type`)?.split(`;`)[0]??``;if(r.startsWith(`text/`)||r===`application/json`)throw Error(`Il link apre una pagina. Abbina il file audio per trascriverlo.`);let i=decodeURIComponent(e.pathname.split(`/`).pop()||`Audio da link`);return new File([await n.blob()],i,{type:r})}async function Dt(){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error(`Il microfono non è accessibile. Puoi importare una registrazione dai File.`);let e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),t=()=>e.getTracks().forEach(e=>e.stop());try{let n=[`audio/mp4`,`audio/webm;codecs=opus`,`audio/ogg;codecs=opus`].find(e=>MediaRecorder.isTypeSupported(e)),r=new MediaRecorder(e,n?{mimeType:n}:{}),i=[],a=new Promise((e,a)=>{r.ondataavailable=e=>{e.data.size&&i.push(e.data)},r.onstop=()=>{t();let a=r.mimeType||i[0]?.type||n||`audio/mp4`,o=a.includes(`webm`)?`webm`:a.includes(`ogg`)?`ogg`:`m4a`,s=new Date().toISOString().slice(0,19).replace(`T`,` `).replaceAll(`:`,`-`);e(new File(i,`Registrazione `+s+`.`+o,{type:a}))},r.onerror=()=>{t(),a(Error(`La registrazione è stata interrotta.`))}});return r.start(1e3),{result:a,stop(){r.state===`inactive`?t():r.stop()}}}catch(e){throw t(),e}}function Ot({importFile:e,pause:t}){let n=e=>document.getElementById(e),r=n(`create-sheet`),i=n(`create-status`),a=n(`song-file`),o,s,c,l,u=0,d=n(`record-audio`),f=n(`pick-song`);a.accept=Ct;function p(e){n(`separation-mode`).disabled=e,f.disabled=e,n(`link-form`).querySelector(`button`).disabled=e,n(`import-url`).disabled=e}function m(){r.open&&r.close()}function h(){u++,o&&=(o.stop(),null),clearInterval(s),c?.abort(),c=null,l=null,n(`separation-mode`).value=`fast`,p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`,n(`link-form`).reset(),i.textContent=``,f.querySelector(`strong`).textContent=`Scegli un file`}function g(){r.open||(t(),h(),r.showModal())}function ee(e){i.textContent=e.name===`NotAllowedError`?`Consenti il microfono nelle impostazioni di Drumfolio.`:e.message||`Operazione interrotta.`}async function te(t,r){let i=n(`separation-mode`).value;m(),await e(t,r,i)}return r.addEventListener(`close`,h),r.onclick=e=>{if(e.target===r){let t=r.getBoundingClientRect();(e.clientY<t.top||e.clientX<t.left||e.clientX>t.right)&&m()}},n(`close-create`).onclick=m,f.onclick=()=>a.click(),a.onchange=async e=>{let t=e.target.files[0];a.value=``,t&&await te(t,l)},n(`import-url`).oninput=()=>{l=null,f.querySelector(`strong`).textContent=`Scegli un file`,i.textContent=``},n(`link-form`).onsubmit=async e=>{e.preventDefault();let t=u;try{let e=Tt(n(`import-url`).value);l=e.href,p(!0),d.disabled=!0,i.textContent=`Lettura del link…`,c=new AbortController;let r=wt(e);r&&(f.querySelector(`strong`).textContent=`Abbina il file del post`);let a=r?await at(e,c.signal):await Et(e,c.signal);if(!a){i.textContent=`Collega il file audio o video del post. Il link verrà salvato insieme allo spartito.`;return}t===u&&await te(a,e.href)}catch(e){t===u&&e.name!==`AbortError`&&(i.textContent=(e instanceof TypeError?`Il sito non consente di scaricare il file da questo link.`:e.message)+` Puoi scegliere il file dal dispositivo.`)}finally{t===u&&(p(!1),d.disabled=!1)}},d.onclick=async()=>{if(o){d.disabled=!0,o.stop();return}let e=u;p(!0),d.disabled=!0;try{let t=await Dt();if(e!==u){t.stop(),await t.result;return}o=t,d.disabled=!1,d.classList.add(`recording`);let n=Date.now(),r=()=>{d.querySelector(`span`).textContent=`Termina e trascrivi · `+le((Date.now()-n)/1e3)};r(),s=setInterval(r,300),i.textContent=`Registrazione in corso`;let a=await t.result;e===u&&await te(a)}catch(t){e===u&&ee(t)}finally{e===u&&(o=null,clearInterval(s),p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`)}},g}var kt=e=>86-b[e][1]*8/2,At=(e,t,n,r,i=1)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="currentColor" stroke-width="${i}"/>`,jt=(e,t,n,r=32)=>`<text class="musicglyph" x="${e}" y="${t}" font-size="${r}">&#x${n};</text>`,Mt=[32,16,8,4,2,1],Nt=[`E4E3`,`E4E4`,`E4E5`,`E4E6`,`E4E7`,`E4E8`],Pt={hi_hat_closed:`E0A9`,hi_hat_open:`E0B3`,crash:`E0BE`,ride:`E0DB`,unknown:`E0A9`};function Ft(e,t,n){let r=[],i=0;for(let a of[...e.keys(),t].sort((e,t)=>e-t))for(;i<a;){let t=e.get(i)??[],o=Mt.find(e=>e<=a-i&&i%e===0);t.length&&(o=Math.min(o,n&-n)),r.push({tick:i,value:o,hits:t}),i+=o}return r}function It(e,t,n,r,i){let a=t.bars[e],o=a.length,s=e=>33+e*307/o,c=``,l=``,u=``,d=``;for(let e=0;e<5;e++)c+=At(2,86-e*8,348,86-e*8,.72);c+=At(2,54,2,86)+At(348,54,348,86),c+=jt(4,70,`E069`,26);let f=[new Map,new Map],p=[];for(let{hit:e,tick:t}of n){let n=f[Number(de(e.instrument))];n.has(t)||n.set(t,[]),n.get(t).push(e)}let m=f.filter(e=>e.size).length,h=Number(i.split(`/`)[0])*t.beat,g=m===0&&o===h;g&&(c+=jt(s(o/2)-4,62,`E4E3`,28));for(let e=0;e<2&&!g;e++){if(!f[e].size&&(m||e))continue;let n=e===1,i=n?1:-1,a=Ft(f[e],o,t.beat);for(let e of a){let t=s(e.tick);if(!e.hits.length){m<2&&(c+=jt(t-2,70,Nt[Mt.indexOf(e.value)],28));continue}let i=e.hits.map(e=>kt(e.instrument));e.stemX=t+(n?4.3:-4.2),e.top=n?Math.min(...i)-23:Math.max(...i)+22,e.start=n?Math.max(...i):Math.min(...i),e.flags=Math.max(0,Math.log2(8/e.value));for(let n of e.hits){let i=kt(n.instrument);p.push({x:t,y:i,hit:n}),n.id===r&&(u+=`<circle cx="${t}" cy="${i}" r="8.3" class="focus-note"/>`),n.instrument===`crash`&&(u+=At(t-7,i,t+7,i,.75)),u+=`<g class="${n.instrument===`unknown`?`uncertain`:``}">`+jt(t-4.4,i,Pt[n.instrument]??(e.value>=16?`E0A3`:`E0A4`))+`</g>`}}for(let e=0;e<a.length;){let r=a[e];if(!r.hits.length||r.value===32){e++;continue}let o=e;for(;r.flags&&o+1<a.length&&a[o+1].flags&&Math.floor(a[o+1].tick/t.beat)===Math.floor(r.tick/t.beat);)o++;let s=a.slice(e,o+1),c=(n?Math.min:Math.max)(...s.map(e=>e.top));for(let e=0;e<s.length;e++){let t=s[e];if(l+=At(t.stemX,t.start,t.stemX,c,1.1),s.length===1&&t.flags)l+=jt(t.stemX,c,(57920+2*(t.flags-1)+ +!n).toString(16),28);else for(let n=0;n<t.flags;n++){let r=c+i*n*3.8;s[e+1]?.flags>n?l+=At(t.stemX,r,s[e+1].stemX,r,2.8):s[e-1]?.flags>n||(l+=At(t.stemX,r,t.stemX+(e?-5:5),r,2.8))}}e=o+1}}for(let e=0;e<o;e++){let n=e+h-o;n%t.beat===0&&(d+=`<text x="${s(e)}" y="129" class="beat">${1+n/t.beat}</text>`)}return{targets:p,html:`<svg class="staff" data-bar="${e}" viewBox="0 0 350 139" role="img" aria-label="${a.number>0?`Battuta `+a.number:o<h?`Anacrusi`:`Intro`}${g?`, pausa di battuta`:``}">${c}${l}${u}${d}<g class="cursor" visibility="hidden"><line y1="20" y2="114"/><circle cy="20" r="2.8"/></g></svg>`}}async function Lt(e,t){let n=await e.arrayBuffer(),r=n.byteLength>=4&&new DataView(n).getUint32(0)===1716281667;try{return await t.decodeAudioData(r?n.slice(0):n)}catch(e){if(!r)throw e}let{FLACDecoder:i}=await C(async()=>{let{FLACDecoder:e}=await import(`./flac-BqfAJ19Z.js`);return{FLACDecoder:e}},[]),a=new i;await a.ready;try{let{channelData:e,sampleRate:r,samplesDecoded:i,errors:o}=await a.decodeFile(new Uint8Array(n));if(!i||o.length)throw Error(`File FLAC incompleto.`);let s=t.createBuffer(e.length,i,r);if(e.forEach((e,t)=>s.copyToChannel(e,t)),r===t.sampleRate)return s;let c=Math.ceil(i*t.sampleRate/r),l=new OfflineAudioContext(e.length,c,t.sampleRate),u=l.createBufferSource();return u.buffer=s,u.connect(l.destination),u.start(),await l.startRendering()}finally{a.free()}}var A,Rt,zt,Bt=0,Vt=0,Ht=[],Ut=0,Wt,Gt=new Set,j=()=>A&&M()?A.currentTime-Bt:Vt,M=()=>Wt!==void 0;async function Kt(e=!0){A??=new AudioContext,await A.resume(),e&&(Rt??=Promise.all(Object.keys(b).filter(e=>e!==`unknown`).map(async e=>{let t=await fetch(`/drumfolio-beta/sounds/`+e+`.wav`);if(!t.ok)throw Error(`Campione audio non disponibile.`);return[e,await A.decodeAudioData(await t.arrayBuffer())]})).then(Object.fromEntries).catch(e=>{throw Rt=null,e}),zt=await Rt)}function qt(e,t,n){if(!zt?.[e])return;let r=A.createBufferSource(),i=A.createGain();r.buffer=zt[e],i.gain.value=n*.7,r.connect(i).connect(A.destination),Gt.add(r),r.onended=()=>{Gt.delete(r),i.disconnect()},r.start(t)}async function Jt(e){await Kt(),qt(e,A.currentTime,.8)}async function Yt(e){return await Kt(!1),Lt(e,A)}function Xt(){M()&&(Vt=j()),Wt=void 0;for(let e of Gt)e.stop();Gt.clear()}function Zt(e){Xt(),Vt=e}function Qt(e,t,n){if(Xt(),Vt=t,Bt=A.currentTime-t,Wt=n??null,Ht=e.filter(e=>e.time>=t-.001).sort((e,t)=>e.time-t.time),Ut=0,n&&t<n.duration){let e=A.createBufferSource();e.buffer=n,e.connect(A.destination),Gt.add(e),e.onended=()=>Gt.delete(e),e.start(0,t)}}function $t(e){if(!M()||Wt)return;let t=Math.min(e,j()+.12);for(;Ut<Ht.length&&Ht[Ut].time<t;){let e=Ht[Ut++];qt(e.instrument,Math.max(A.currentTime,Bt+e.time),e.velocity/127)}}var N=e=>document.getElementById(e);N(`app`).innerHTML=ue();var en=Object.keys(b),tn=matchMedia(`(min-width:760px)`);N(`instrument`).innerHTML=en.map(e=>`<option value="${e}">${b[e][0]}</option>`).join(``);var nn=null,rn,P,F,I,an,L=0,R=null,z=!1,B=null,on=null,V=``,H=!1,U=!1,sn=[],cn=[],ln=new Map,W=null,G=null,un,dn=0,fn=null,pn=!1,mn=!1,hn=!1,gn=-1,_n=Promise.resolve(),vn,yn=new Map,K=()=>z?2:tn.matches?4:2,bn=e=>I.bars[e].number>0?ce(I.bars[e].number):I.bars[e].length<I.full?`Lev.`:`Intro`,xn=()=>P.events.find(e=>e.id===R),Sn=()=>I.at(j()).bar,Cn=()=>H?on:null;function q(e){clearTimeout(un),N(`notice`).textContent=e,un=setTimeout(()=>N(`notice`).textContent=``,3800)}function J(e){q(e.message||`Operazione interrotta`)}function Y(e){return(...t)=>Promise.resolve().then(()=>e(...t)).catch(J)}function wn(){I=fe(P),an=I.bars.map(()=>[]);for(let e of P.events){let t=I.at(e.time,!0);an[t.bar].push({hit:e,tick:t.tick})}}function Tn(e){return{kick:`primo spazio dal basso`,snare:`terzo spazio dal basso`,low_tom:`secondo spazio dal basso`,mid_tom:`quarta linea`,high_tom:`quarto spazio dal basso`,hi_hat_closed:`croce sopra il rigo`,hi_hat_open:`croce cerchiata sopra il rigo`,crash:`triangolo sopra il rigo`,ride:`rombo sulla linea superiore`,unknown:`strumento da assegnare`}[e]}function X(){let e=K(),t=Math.min(I.bars.length,L+e),n=Sn();document.body.classList.toggle(`live`,z),N(`live`).setAttribute(`aria-pressed`,String(z)),N(`studio`).setAttribute(`aria-pressed`,String(!z));let r=P.name.indexOf(` - `);N(`title`).textContent=P.score_title||(r>0?P.name.slice(r+3):P.name),N(`artist`).textContent=P.artist||(r>0?P.name.slice(0,r):`Repertorio personale`),N(`bpm`).textContent=Number(P.bpm.toFixed(1)).toLocaleString(`it`)+` BPM`,N(`meter`).textContent=P.meter,N(`bar-total`).textContent=I.bars.length-I.bars.filter(e=>e.number<=0).length+` battute`,N(`page`).textContent=Math.floor(L/e)+1+` / `+Math.ceil(I.bars.length/e),N(`previous`).disabled=L===0,N(`next`).disabled=t===I.bars.length;let i=Object.entries(P.sections??{}).filter(([e])=>Number(e)<=I.bars[L].number).sort(([e],[t])=>Number(t)-Number(e))[0];N(`section-label`).textContent=z?`MODALITÀ LIVE`:`BATTUTE `+bn(L)+` — `+bn(t-1),N(`section-title`).textContent=z?`Battuta `+bn(n):i?.[1]||`Batteria`,N(`paper-meter`).textContent=P.meter,ln=new Map;let a=[];for(let e=L;e<t;e++){let t=It(e,I,an[e],z?null:R,P.meter);ln.set(e,t.targets),a.push(`<div class="measure" data-measure="${e}"><div class="measure-meta"><span class="index">${bn(e)}</span></div>${t.html}</div>`)}N(`bars`).innerHTML=a.join(``);for(let e of N(`bars`).querySelectorAll(`.staff`))if(!z)for(let t of ln.get(+e.dataset.bar)){let n=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);for(let[e,r]of Object.entries({cx:t.x,cy:t.y,r:7,fill:`transparent`}))n.setAttribute(e,r);n.style.touchAction=`none`,e.append(n)}N(`duration`).textContent=le(P.duration),document.querySelector(`.bar-tools`).hidden=z,N(`original-source`).hidden=!V&&!pn,N(`drums-source`).hidden=!pn,N(`original-source`).setAttribute(`aria-pressed`,String(H&&!U)),N(`drums-source`).setAttribute(`aria-pressed`,String(H&&U)),document.querySelector(`.source-switch`).classList.toggle(`has-audio`,!!(V||pn)),N(`source-name`).textContent=H?U?`Batteria isolata`:V:`Suoni dello spartito`,N(`seek`).max=P.duration,N(`grid-text`).textContent=`1/`+(P.grid??16),N(`undo`).disabled=!sn.length,N(`redo`).disabled=!cn.length,N(`remove`).disabled=!xn();let o=xn();o&&(N(`instrument`).value=o.instrument),N(`hint`).textContent=o?b[o.instrument][0]+` · `+Tn(o.instrument)+` · Trascina per spostare il colpo.`:`Tocca un colpo per selezionarlo. Doppio tocco sul rigo per inserirlo.`,N(`loop`).setAttribute(`aria-pressed`,String(B!==null)),gn=-1,En()}function En(){let e=Math.min(P.duration,Math.max(0,j())),{bar:t,tick:n}=I.at(e);if(M()&&(t<L||t>=L+K())){L=Math.floor(t/K())*K(),X();return}if(gn!==t){N(`bar-now`).textContent=bn(t),z&&(N(`section-title`).textContent=`Battuta `+bn(t));for(let e of N(`bars`).querySelectorAll(`.measure`)){let n=+e.dataset.measure===t;e.classList.toggle(`current`,n),e.querySelector(`.cursor`).setAttribute(`visibility`,n?`visible`:`hidden`)}gn=t}let r=33+n*307/I.bars[t].length;N(`bars`).querySelector(`[data-bar="${t}"] .cursor`)?.setAttribute(`transform`,`translate(`+r+` 0)`),N(`elapsed`).textContent=le(e),N(`seek`).value=e,N(`seek`).style.setProperty(`--progress`,e/P.duration*100+`%`)}function Dn(){N(`play`).innerHTML=_(M()?`pause`:`play`),N(`play`).setAttribute(`aria-label`,M()?`Pausa`:`Riproduci`)}function Z(){mn=!1,dn++,Xt(),Dn()}function On(e,t=!0){mn=!1,dn++,e=Math.max(0,Math.min(e,P.duration));let n=M();Zt(e),B!==null&&I.at(e).bar!==B&&(B=null),t&&(L=Math.floor(I.at(e).bar/K())*K()),n&&Qt(P.events,e,Cn()),X(),Dn()}async function kn(){if(hn&&$(!1),M()||mn){Z();return}mn=!0;let e=++dn;try{if(await Kt(!H),e!==dn)return;if(H&&!on){let t=await u(`audio`,U?[F,`drums`]:F);if(e!==dn)return;if(!t)throw Error(`Traccia audio non disponibile sul dispositivo.`);let n=await Yt(t);if(e!==dn)return;on=n}let t=j();t>=P.duration-.01&&(t=0),B!==null&&I.at(t).bar!==B&&(t=I.bars[B].start),Qt(P.events,t,Cn()),Dn(),An()}finally{e===dn&&(mn=!1)}}function An(){if(!M())return;let e=B===null?P.duration:Math.min(I.bars[B].end,P.duration);if(j()>=e){if(B===null){Z(),Zt(e),En();return}Qt(P.events,I.bars[B].start,Cn())}$t(e),En(),requestAnimationFrame(An)}async function jn(e){if($(!1),z=e,L=Math.floor(Sn()/K())*K(),R=null,X(),e&&navigator.wakeLock)try{vn=await navigator.wakeLock.request(`screen`)}catch{}!e&&vn&&(await vn.release(),vn=null)}function Mn(){return{events:P.events,grid:P.grid??16,selected:R,bpm:P.bpm,bar_times:P.bar_times,bar_source:P.bar_source,first_numbered_bar:P.first_numbered_bar}}function Q(e){let t=F,n=_n.then(()=>{if(F===t)return e()});return _n=n.catch(J),n}function Nn(e,t,n=P.grid??16,r={}){let i=Mn();return Pn({...Mn(),events:e,selected:t,grid:n,...r},()=>{sn.push(i),sn.length>80&&sn.shift(),cn=[]})}async function Pn(e,t){let{selected:n,...r}=e,i={...P,...r},a=i.bar_times!==P.bar_times||i.bpm!==P.bpm,s=o()&&F===`pocket-study`?crypto.randomUUID():F,c=await h(`scores`,s,{id:s,project:i},s===F?nn:void 0);s!==F&&(F=s,await h(`settings`,`active`,F)),nn=m(c),t(),P=i,R=n,wn(),a&&(B=null,L=Math.floor(Sn()/K())*K()),M()&&Qt(P.events,j(),Cn()),X()}function Fn(e=!1){if(!z)return Q(()=>{let t=e?cn:sn,n=e?sn:cn,r=Mn();if(t.length)return Pn(t.at(-1),()=>{n.push(r),t.pop()})})}function In(){if(z||!xn())return;let e=R;return Q(()=>{if(P.events.some(t=>t.id===e))return Nn(P.events.filter(t=>t.id!==e),null)})}function Ln(e,t,n){return Q(()=>{let r=P.events.find(t=>t.id===e.id);if(!r)return;let i=n??r.time;if(P.events.some(n=>n.id!==e.id&&n.instrument===t&&Math.abs(n.time-i)<5e-4))X(),q(`Questo colpo è già presente.`);else return Nn(P.events.map(n=>n.id===e.id?{...n,instrument:t,time:i}:n),e.id)})}function Rn(e,t){let n=e.getBoundingClientRect(),r=350/n.width;return{x:(t.clientX-n.left)*r,y:(t.clientY-n.top)*r}}function $(e){hn=e,W=null,G=null,N(`first-bar`).setAttribute(`aria-pressed`,String(e)),N(`bar-placement`).hidden=!e,N(`bars`).classList.toggle(`placing`,e),N(`bars`).querySelector(`.start-preview`)?.remove()}function zn(e,t){let n=Number(e.dataset.bar),r=Math.max(33,Math.min(340,Rn(e,t).x));return{x:r,t:I.seconds(n,(r-33)*I.bars[n].length/307)}}function Bn(e,t){let n=N(`bars`).querySelector(`.start-preview`);if(!e){n?.remove();return}let{x:r,t:i}=zn(e,t);i>=P.duration?n?.remove():(n||(n=document.createElementNS(`http://www.w3.org/2000/svg`,`path`),n.setAttribute(`class`,`start-preview`),n.setAttribute(`d`,`M -4 16 H 4 L 0 21 Z M 0 21 V 115`)),n.parentNode!==e&&e.append(n),n.setAttribute(`transform`,`translate(`+r+` 0)`))}function Vn(e){e>=P.duration?q(`Scegli un punto prima della fine del brano.`):($(!1),On(e),Q(async()=>{await Nn(P.events,null,P.grid??16,me(P,e,{firstBar:!0})),q(`Battuta 1 impostata a `+e.toLocaleString(`it`,{maximumFractionDigits:2})+` s`)}))}function Hn(e,t){let n=+e.dataset.bar,{x:r,y:i}=Rn(e,t),a=I.bars[n],o=Math.max(0,Math.min(Math.floor((a.length-1)/I.q)*I.q,Math.round((r-33)*a.length/307/I.q)*I.q)),s=I.seconds(n,o),c=(86-i)*2/8;return{bar:n,tick:o,t:s,key:en.filter(e=>e!==`unknown`).sort((e,t)=>Math.abs(b[e][1]-c)-Math.abs(b[t][1]-c))[0],x:r,y:i}}N(`bars`).onpointerdown=e=>{if(e.button!==0||W)return;let t=e.target.closest(`.staff`);if(!t)return;if(hn){W={id:e.pointerId},t.setPointerCapture(e.pointerId),Bn(t,e);return}let n=Hn(t,e),r=ln.get(n.bar).map(e=>({...e,distance:Math.hypot((e.x-n.x)*.84,e.y-n.y)})).filter(e=>e.distance<10).sort((e,t)=>e.distance-t.distance);W={id:e.pointerId,svg:t,hit:r[0]?.hit,x:e.clientX,y:e.clientY,drag:!1},t.setPointerCapture(e.pointerId)},N(`bars`).onpointermove=e=>{if(hn){W&&W.id!==e.pointerId||Bn(document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`),e);return}if(W?.id!==e.pointerId||z||!W.hit||(Math.hypot(e.clientX-W.x,e.clientY-W.y)>6&&(W.drag=!0),!W.drag))return;let t=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`)??W.svg,n=Hn(t,e);N(`hint`).textContent=b[n.key][0]+` · Battuta `+bn(n.bar)+` · `+Tn(n.key),N(`bars`).querySelector(`.drop-preview`)?.remove(),t.insertAdjacentHTML(`beforeend`,`<circle class="drop-preview" cx="${33+n.tick*307/I.bars[n.bar].length}" cy="${kt(n.key)}" r="7" fill="#73b896" stroke="#25543b" pointer-events="none"/>`)},N(`bars`).onpointerleave=()=>{hn&&N(`bars`).querySelector(`.start-preview`)?.remove()},N(`bars`).onpointercancel=()=>{W=null,X()},N(`bars`).onpointerup=e=>{if(W?.id!==e.pointerId)return;let{svg:t,hit:n,drag:r,x:i,y:a}=W;W=null;let o=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`);if(hn){o?Vn(zn(o,e).t):Bn(null,e);return}if(!o||!r&&Math.hypot(e.clientX-i,e.clientY-a)>8){X();return}let s=Hn(o,e);if(z){On(I.bars[s.bar].start);return}if(r&&n){G=null;let r=o!==t||Math.abs(e.clientX-i)>9,c=Math.abs(e.clientY-a)>4,l=r?s.t:n.time,u=c?s.key:n.instrument;l<P.duration?(Ln(n,u,l),Jt(u).catch(J)):X();return}let c=performance.now(),l=G&&c-G.now<375&&G.bar===s.bar&&Math.hypot(e.clientX-G.x,e.clientY-G.y)<16;if(G=l?null:{now:c,bar:s.bar,x:e.clientX,y:e.clientY},l&&!n&&s.t<P.duration){let e=s.key===`hi_hat_closed`&&N(`instrument`).value===`hi_hat_open`?`hi_hat_open`:s.key,t={id:crypto.randomUUID(),time:s.t,instrument:e,velocity:96};Q(()=>{if(!an[s.bar].some(t=>t.tick===s.tick&&t.hit.instrument===e))return Nn([...P.events,t],t.id)}),Jt(e).catch(J)}else n?(R=n.id,X(),Jt(n.instrument).catch(J)):(R=null,On(Math.min(P.duration,s.t),!1))};function Un(e,t){N(`dialog-title`).textContent=e,N(`dialog-body`).replaceChildren();for(let e of t){let t=document.createElement(`button`);t.className=`choice`,t.innerHTML=_(e.icon)+y(e.text)+(e.detail?`<small>`+y(e.detail)+`</small>`:``),t.onclick=Y(()=>(N(`dialog`).close(),e.go())),N(`dialog-body`).append(t)}N(`dialog`).open||N(`dialog`).showModal()}async function Wn(e,t=!0){await _n,$(!1),x(e.project),Z(),Zt(0),B=null,L=0,R=null,z=!1,sn=[],cn=[],vn&&=(await vn.release(),null),F=e.id,nn=m(e),P=e.project,on=null,V=``;let[n,r]=await Promise.all([g(`audio`,[F,`drums`]),g(`audio`,F)]);pn=n,r&&(V=P.original_name||`Originale`),U=pn,H=pn||r,wn(),X(),await h(`settings`,`active`,F),t&&rn.go(`studio`)}async function Gn(e,t=!1){if(H===e&&U===t)return;let n=M()||mn;Z(),H=e,U=t,on=null,X(),n&&await kn()}async function Kn(){let e=[{text:`Suoni dello spartito`,detail:H?``:`Attivi`,icon:`drum`,go:()=>Gn(!1)}];pn&&e.push({text:`Batteria isolata`,detail:H&&U?`Attiva`:``,icon:`audio-lines`,go:()=>Gn(!0,!0)}),V&&e.push({text:`Canzone originale`,detail:V,icon:`music-2`,go:()=>Gn(!0)}),pn&&V||e.push({text:`Abbina una traccia audio`,icon:`headphones`,go:()=>N(`audio-file`).click()}),Un(`Sorgente audio`,e)}async function qn(e){if(fn)return;let t=new AbortController;fn=t;let n=N(`import-progress`),r=(e,t,n)=>{N(`import-phase`).textContent=e,N(`import-meter`).value=t;let r=n>=60?Math.ceil(n/60)+` min`:Math.max(1,Math.ceil(n))+` s`;N(`import-detail`).textContent=Number.isFinite(n)&&n>0?`Separazione · circa `+r+` rimanenti`:`Analisi sul dispositivo`};N(`import-title`).textContent=e.file.name,N(`cancel-import`).disabled=!1,r(`Preparazione del brano`,0),Z(),on=null,n.showModal();let i;if(navigator.wakeLock)try{i=await navigator.wakeLock.request(`screen`)}catch{}try{await _n,await h(`settings`,`pending-song`,e);let{analyzeSong:n}=await C(async()=>{let{analyzeSong:e}=await import(`./import-song-CGDnBrq6.js`);return{analyzeSong:e}},[]),i=await n(e.file,t.signal,r,e.separation);t.signal.throwIfAborted(),e.sourceUrl&&(i.project.source_url=e.sourceUrl);let a={id:e.id,project:i.project};x(a.project),N(`cancel-import`).disabled=!0,r(`Salvataggio dello spartito`,.99),await Wn(await re(a,e.file,i.stem)),q(a.project.events.length?`Spartito pronto per la modifica.`:`Nessun colpo rilevato. Puoi aggiungerlo sul rigo.`)}catch(e){if(t.signal.aborted)await te(),q(`Importazione annullata.`);else throw e}finally{fn=null,n.close(),await i?.release(),window.location.hash&&window.location.hash!==`#repertorio`||await rn.render()}}N(`cancel-import`).onclick=()=>fn?.abort(),N(`import-progress`).oncancel=e=>{e.preventDefault(),N(`cancel-import`).disabled||fn?.abort()};var Jn=Ot({pause:Z,async importFile(e,t,n){try{if(/\.midi?$/i.test(e.name)||/audio\/(x-)?midi/i.test(e.type)){let{midiScore:n}=await C(async()=>{let{midiScore:e}=await import(`./midi-import-Blh9R_MR.js`);return{midiScore:e}},__vite__mapDeps([2,1])),r=await n(e);t&&(r.source_url=t),x(r);let i={id:crypto.randomUUID(),project:r};await Wn(await h(`scores`,i.id,i))}else await qn({id:crypto.randomUUID(),file:e,sourceUrl:t,separation:n})}catch(e){J(e)}}});function Yn(e){return St({user:e,pause:()=>{Z(),$(!1)},notify:q,active:()=>F,sourceLink:()=>P?.source_url,create:Jn,resume:qn,openDemo:async()=>{let e=await u(`scores`,`pocket-study`);e||=await h(`scores`,`pocket-study`,{id:`pocket-study`,project:pe()}),await Wn(e)},barInfo:()=>{let e=Sn(),t=I.bars[e];return{time:t.start,number:t.number,max:e+1}},numberBar:async e=>{await _n;let t=j(),n=e===null?I.firstComplete:he(P,t,e);if(await Q(()=>Nn(P.events,R,P.grid??16,{first_numbered_bar:n})),P.first_numbered_bar!==n)throw Error(`Impossibile salvare la numerazione.`);On(t),rn.go(`studio`)},open:async e=>{await _n,e.id===F&&m(e)===nn?rn.go(`studio`):await Wn(e)}})}N(`project-file`).onchange=Y(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n;try{n=JSON.parse(await t.text())}catch{throw Error(`Scegli un file progetto .drums.`)}x(n);let r={id:crypto.randomUUID(),project:n};await Wn(await h(`scores`,r.id,r))}),N(`audio-file`).onchange=Y(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n=F,r=(yn.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{let e=await Yt(t);await h(`audio`,n,t),F===n&&(Z(),on=e,H=!0,U=!1,V=t.name,X())});yn.set(n,r);try{await r}finally{yn.get(n)===r&&yn.delete(n)}}),N(`source`).onclick=Y(Kn),N(`original-source`).onclick=Y(()=>V?Gn(!0):N(`audio-file`).click()),N(`drums-source`).onclick=Y(()=>Gn(!0,!0)),N(`first-bar`).onclick=()=>{Z(),$(!hn)},N(`cancel-placement`).onclick=()=>{$(!1),N(`first-bar`).focus()},N(`use-playhead`).onclick=()=>Vn(j()),N(`align-bars`).onclick=()=>{Z(),$(!1);let e=j(),t=xn(),n=e=>Q(()=>Nn(P.events,R,P.grid??16,me(P,e))),r=[];t&&r.push({text:`Il colpo selezionato è sull’uno`,detail:b[t.instrument][0]+` · `+t.time.toFixed(2)+` s`,icon:`drum`,go:()=>n(t.time)}),e<P.duration&&r.push({text:`L’uno è al cursore`,detail:e.toFixed(2)+` s`,icon:`list-music`,go:()=>n(e)}),P.meter===`4/4`&&r.push({text:`Ricalcola dal ritmo`,detail:`Aggiorna BPM e battute dai colpi salvati`,icon:`list-music`,go:()=>Q(async()=>{let{estimateTiming:e}=await C(async()=>{let{estimateTiming:e}=await import(`./transcribe-BsBpUfYe.js`);return{estimateTiming:e}},__vite__mapDeps([3,1])),t=e([...P.events].sort((e,t)=>e.time-t.time),P.duration);if(!t.bar_times)throw Error(`Colpi insufficienti. Indica l’uno sullo spartito.`);await Nn(P.events,R,P.grid??16,t),q(`Battute ricalcolate · `+t.bpm.toFixed(1)+` BPM`)})}),Un(`Allinea battute`,r)},N(`close`).onclick=()=>N(`dialog`).close(),N(`dialog`).onclick=e=>{if(e.target===N(`dialog`)){let t=e.target.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&e.target.close()}},N(`play`).onclick=Y(kn),N(`rewind`).onclick=()=>On(I.bars[Sn()].start),N(`seek`).oninput=e=>On(+e.target.value),N(`loop`).onclick=()=>{B=B===null?Sn():null,M()&&Qt(P.events,j(),Cn()),X()},N(`studio`).onclick=Y(()=>jn(!1)),N(`live`).onclick=Y(()=>jn(!0)),N(`previous`).onclick=()=>On(I.bars[Math.max(0,L-K())].start),N(`next`).onclick=()=>On(I.bars[Math.min(I.bars.length-1,L+K())].start),N(`grid`).onclick=()=>Un(`Griglia spartito`,[8,16,32].map(e=>({text:`1/`+e,icon:`settings-2`,detail:(P.grid??16)===e?`Attiva`:``,go:()=>Q(()=>{if((P.grid??16)!==e)return Nn(P.events,R,e)})}))),N(`undo`).onclick=()=>Fn(),N(`redo`).onclick=()=>Fn(!0),N(`remove`).onclick=In,N(`instrument`).onchange=e=>{let t=xn(),n=e.target.value;t&&(Ln(t,n),Jt(n).catch(J))},document.onkeydown=e=>{hn&&e.key===`Escape`?(e.preventDefault(),$(!1),N(`first-bar`).focus()):!P||document.body.classList.contains(`section-open`)||N(`create-sheet`).open||[`INPUT`,`SELECT`,`TEXTAREA`].includes(e.target.tagName)||N(`dialog`).open||N(`import-progress`).open||(e.code===`Space`&&e.target.tagName!==`BUTTON`&&(e.preventDefault(),Y(kn)()),!z&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`z`&&(e.preventDefault(),Fn(e.shiftKey)),!z&&[`Backspace`,`Delete`].includes(e.key)&&(e.preventDefault(),In()))},tn.onchange=()=>{P&&(L=Math.floor(Sn()/K())*K(),X())},document.addEventListener(`visibilitychange`,()=>{document.hidden&&P&&Z()});async function Xn(){let e=await Xe().catch(e=>(J(e),null));a(e?.id??null),rn=Yn(e),[`#studio`,`#numerazione`].includes(window.location.hash)&&window.history.replaceState(null,``,window.location.pathname+window.location.search),await rn.render(),window.addEventListener(`score-conflict`,()=>q(`Due versioni modificate. Trovi la copia locale nel repertorio.`)),window.addEventListener(`remote-score`,async e=>{if(e.detail!==F||(await _n,F!==e.detail))return;let t=await u(`scores`,F);if(t&&m(t)!==nn){if(M()){q(`Versione aggiornata disponibile nel repertorio.`);return}await Wn(t,!1)}}),gt()}Xn().catch(J);export{be as i,C as n,xe as r,Lt as t};