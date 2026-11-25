const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/esm-nB_Tb61a.js","assets/rolldown-runtime-CNTWBRIl.js","assets/midi-import-D59-PdqX.js"])))=>i.map(i=>d[i]);
(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={name:`drumfolio-studio`,version:`0.1.0`,private:!0,type:`module`,scripts:{dev:`vite`,build:`vite build`,sync:`npm run build && cap sync`,test:`node --test tests/*.test.js`,"test:ui":`playwright test`,"test:services":`playwright test --config=playwright.services.config.js`},dependencies:{"@capacitor/android":`^8.6.2`,"@capacitor/app":`^8.1.2`,"@capacitor/browser":`^8.0.5`,"@capacitor/core":`^8.6.2`,"@capacitor/ios":`^8.6.2`,"@fontsource-variable/dm-sans":`^5.3.0`,"@fontsource/ibm-plex-mono":`^5.3.0`,"@revenuecat/purchases-capacitor":`^14.1.2`,"@supabase/supabase-js":`^2.119.2`,"@tonejs/midi":`^2.0.28`,"@vexflow-fonts/bravura":`^1.0.2`,"@wasm-audio-decoders/flac":`0.2.12`,"fft.js":`^4.0.4`,"lucide-static":`^1.79.0`,"onnxruntime-web":`^1.22.0`},devDependencies:{"@capacitor/cli":`^8.6.2`,"@playwright/test":`^1.65.1`,vite:`^8.3.8`}};function t(e){return new Promise((t,n)=>{let r=indexedDB.open(e,1);r.onupgradeneeded=()=>{for(let e of[`scores`,`audio`,`settings`])r.result.createObjectStore(e)},r.onsuccess=()=>t(r.result),r.onerror=()=>n(r.error)})}var n=t(`drumfolio-studio`),r=n,i=null;function a(e){i=e,r=e?t(`drumfolio-studio-user-`+e):n}var o=()=>i;async function s(e,t,n,i=r){let a=await i;return new Promise((r,i)=>{let o=a.transaction(e,t),s=n(o.objectStore(e));o.oncomplete=()=>r(s.result),o.onerror=o.onabort=()=>i(o.error??Error(`Salvataggio interrotto.`))})}function c(e){return e?.bytes instanceof ArrayBuffer?new File([e.bytes],e.name,{type:e.type}):e}async function l(e){return{name:e.name,type:e.type,bytes:await e.arrayBuffer()}}async function u(e,t){let n=await s(e,`readonly`,e=>e.get(t));return e===`audio`?c(n):t===`pending-song`&&n?{...n,file:c(n.file)}:n}function d(e,t){return!i||e.id===`pocket-study`?e:{...e,revision:t?.revision??null,change:crypto.randomUUID()}}function f(e){i&&e?.id!==`pocket-study`&&window.dispatchEvent(new Event(`score-written`))}async function p(e,t){let n=await r;return new Promise((r,i)=>{let a=n.transaction(`scores`,`readwrite`),o=a.objectStore(`scores`),s=o.get(e),c,l;s.onsuccess=()=>{try{c=t(s.result),c&&o.put(c,e)}catch(e){l=e,a.abort()}},a.oncomplete=()=>r(c),a.onabort=a.onerror=()=>i(l??a.error??Error(`Salvataggio interrotto.`))})}var m=e=>e?.change??e?.revision??null;async function h(e,t,n,r){if(e===`scores`){let e=await p(t,e=>{if(r!==void 0&&m(e)!==r)throw Error(`Lo spartito è stato aggiornato. Riaprilo dal repertorio per continuare.`);return d(n,e)});return f(e),e}return e===`audio`&&(n=await l(n)),t===`pending-song`&&(n={...n,file:await l(n.file)}),s(e,`readwrite`,e=>e.put(n,t))}var g=(e,t)=>s(e,`readonly`,e=>e.count(t)).then(e=>e>0),ee=()=>s(`scores`,`readonly`,e=>e.getAll());function _(){return s(`settings`,`readwrite`,e=>e.delete(`pending-song`))}async function te(e,t,n,i=!1){let a=await r;return new Promise((r,o)=>{let s=a.transaction([`scores`,`audio`,`settings`],`readwrite`);s.oncomplete=()=>{f(e),r(e)},s.onabort=s.onerror=()=>o(s.error??Error(`Spazio insufficiente per salvare il brano.`));try{let r=s.objectStore(`scores`),a=s.objectStore(`audio`),o=s.objectStore(`settings`);r.add(e,e.id),t&&a.put(t,e.id),n&&a.put(n,[e.id,`drums`]),i||(o.put(e.id,`active`),o.delete(`pending-song`))}catch(e){s.abort(),o(e)}})}async function ne(e,t,n){let[r,i]=await Promise.all([l(t),l(n)]);return te(d(e),r,i)}async function re(){if(!i)return[];let[e,t]=await Promise.all([s(`scores`,`readonly`,e=>e.getAll(),n),ee()]),r=new Set(t.map(e=>e.id));return e.filter(e=>e.id!==`pocket-study`&&!r.has(e.id))}async function ie(e){if(!i)throw Error(`Accedi per associare uno spartito.`);let[t,r,a]=await Promise.all([s(`scores`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get(e),n),s(`audio`,`readonly`,t=>t.get([e,`drums`]),n)]);if(!t||e===`pocket-study`)throw Error(`Spartito ospite non disponibile.`);return te(d({id:e,project:t.project}),r,a,!0)}async function ae(e){let t=await r;return new Promise((n,r)=>{let i=t.transaction([`scores`,`audio`],`readwrite`),a=i.objectStore(`scores`),o=i.objectStore(`audio`),s=a.get(e.id),c;s.onsuccess=()=>{let t=s.result;if(t?.revision!==e.revision){if(t?.change===e.revision)a.put({...t,revision:e.revision,change:null},e.id);else{if(t?.change){let n=crypto.randomUUID(),r=(t.project.score_title||t.project.name)+` (copia locale)`;a.add(d({id:n,project:{...t.project,name:r,score_title:r}}),n);for(let t of[!1,!0]){let r=o.get(t?[e.id,`drums`]:e.id);r.onsuccess=()=>{r.result&&o.put(r.result,t?[n,`drums`]:n)}}c=`conflict`}else c=`updated`;a.put({id:e.id,revision:e.revision,change:null,project:{...t?.project,...e.score}},e.id)}}},i.oncomplete=()=>n(c),i.onerror=i.onabort=()=>r(i.error??Error(`Salvataggio interrotto.`))})}var oe=Object.assign({"/node_modules/lucide-static/icons/activity.svg":`<!-- @license lucide-static v1.79.0 - ISC -->
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
`});function v(e){return oe[`/node_modules/lucide-static/icons/`+e+`.svg`]??``}function y(e,t,n,r=``){return`<button id="${e}" class="icon-button ${r}" title="${t}" aria-label="${t}">${v(n)}</button>`}var se=e=>String(e).padStart(2,`0`),ce=e=>Math.floor(e/60)+`:`+se(Math.floor(e%60)),b=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);function le(){return`<header class="top"><div class="top-inner"><div class="wordmark"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>drumfolio<span>.</span></div>
<div class="modes" hidden aria-label="Modalità"><button id="studio">${v(`sliders-horizontal`)}Studio</button><button id="live">${v(`radio`)}Live</button></div>
<button id="home-account" hidden></button><button id="upgrade" hidden>Drumfolio Plus</button><button id="library" class="icon-button" aria-label="Repertorio" hidden>${v(`folder-open`)}</button></div></header>
<main id="workspace" hidden>
<div class="song"><div class="cover" aria-hidden="true"><i></i><b>df.</b></div><div class="song-name"><span class="eyebrow" id="artist"></span><h1 id="title"></h1><div class="spec"><span id="bpm"></span><i></i><span id="meter"></span><i></i><span id="bar-total"></span></div></div></div>
<section class="score-panel" aria-label="Spartito"><div class="sheet-tools"><div class="sheet-label">${v(`book-open`)}<h2>Spartito</h2></div><div class="sheet-nav">${y(`previous`,`Pagina precedente`,`chevron-left`)}<span id="page" class="mono"></span>${y(`next`,`Pagina successiva`,`chevron-right`)}</div></div>
<div class="paper"><div class="paper-heading"><div><div class="section-meta"><span class="section-rule"></span><span id="section-label"></span></div><h3 id="section-title"></h3></div><div id="paper-meter"></div></div><div id="bars"></div></div>
<div class="editor"><div class="ins-select"><label for="instrument">Strumento</label><select id="instrument"></select></div><div class="edit-buttons">${y(`undo`,`Annulla`,`undo-2`)}${y(`redo`,`Ripristina`,`redo-2`)}<i></i>${y(`remove`,`Elimina colpo`,`trash-2`)}</div></div></section>
<div class="hint"><span class="hint-dot"></span><span id="hint"></span></div>
</main>
<footer class="transport" hidden><div class="transport-inner"><div class="track-row"><button id="source">${v(`headphones`)}<span id="source-name">Spartito</span>${v(`chevron-down`)}</button><span class="mono"><span id="elapsed">0:00</span><em> / </em><span id="duration"></span></span></div>
<label class="seek"><span class="sr">Posizione nel brano</span><input type="range" id="seek" min="0" step=".01" value="0"></label>
<div class="transport-row"><div class="bar-now"><span class="eyebrow">Battuta</span><strong id="bar-now"></strong></div><div class="play-group">${y(`rewind`,`Torna a inizio battuta`,`skip-back`)}${y(`play`,`Riproduci`,`play`,`play`)}${y(`loop`,`Ripeti battuta`,`repeat`)}</div><button id="grid" class="grid-button"><span class="eyebrow">Griglia</span><strong id="grid-text"></strong></button></div></div></footer>
<main id="section-screen"><p class="page-note" role="status">Apertura del repertorio…</p></main>
<nav id="app-nav" aria-label="Navigazione principale"><div class="nav-inner">
<button data-route="repertorio">${v(`book-open`)}<span>Repertorio</span></button>
<button data-route="supporto">${v(`headset`)}<span>Supporto</span></button>
<button id="new-action" aria-label="Nuova trascrizione"><span>${v(`plus`)}</span></button>
<button data-route="account">${v(`circle-user-round`)}<span>Account</span></button>
<button data-route="altro">${v(`ellipsis`)}<span>Altro</span></button>
</div></nav>
<dialog id="create-sheet" aria-labelledby="create-title"><div class="grip"></div><div class="dialog-head"><h2 id="create-title">Nuova trascrizione</h2>${y(`close-create`,`Chiudi`,`x`)}</div>
<button class="file-tile" id="pick-song">${v(`cloud-upload`)}<strong>Scegli un file</strong><small>MP3, WAV, M4A, FLAC, MP4 o MIDI</small></button>
<form id="link-form"><label for="import-url">Importa da un link</label><div class="field-action"><input required type="url" id="import-url" inputmode="url" placeholder="https://…" autocomplete="off"><button aria-label="Apri link" type="submit">${v(`chevron-right`)}</button></div><small>Link audio, YouTube, Instagram o TikTok</small></form>
<button id="record-audio" class="record-row">${v(`mic`)}<span>Registra al microfono</span></button><p id="create-status" role="status"></p>
</dialog>
<dialog id="dialog"><div class="dialog-head"><h2 id="dialog-title"></h2>${y(`close`,`Chiudi`,`x`)}</div><div id="dialog-body"></div></dialog>
<dialog id="import-progress" aria-labelledby="import-title"><div class="import-symbol">${v(`audio-lines`)}</div>
<span class="eyebrow">Importa brano</span><h2 id="import-title"></h2>
<p id="import-phase" role="status"></p><progress id="import-meter" max="1" value="0"></progress>
<div class="import-foot"><span>Analisi sul dispositivo</span><button id="cancel-import">Annulla</button></div></dialog>
<input type="file" id="song-file" accept="audio/mpeg,.mp3" hidden>
<div id="notice" role="status" aria-live="polite"></div>
<input type="file" id="project-file" accept="*/*" hidden><input type="file" id="audio-file" accept="audio/*,.mp3,.wav,.m4a" hidden>`}var x={kick:[`Cassa`,1],low_tom:[`Tom basso`,3],snare:[`Rullante`,5],mid_tom:[`Tom medio`,6],high_tom:[`Tom alto`,7],ride:[`Ride`,8],hi_hat_closed:[`Hi-hat chiuso`,9],hi_hat_open:[`Hi-hat aperto`,9],crash:[`Crash`,10],unknown:[`Da assegnare`,14]},ue=e=>[`hi_hat_closed`,`hi_hat_open`,`crash`,`ride`,`unknown`].includes(e);function S(e){if(!e||typeof e.name!=`string`||e.version!==1||!Number.isFinite(e.bpm)||e.bpm<10||e.bpm>500||!Number.isFinite(e.duration)||e.duration<=0||!/^(?:[1-9]|[12]\d|3[0-2])\/(?:2|4|8|16)$/.test(e.meter)||![8,16,32].includes(e.grid??16)||!Array.isArray(e.events)||!Array.isArray(e.automatic))throw Error(`Formato del progetto non valido.`);for(let t of[e.events,e.automatic]){let n=new Set;for(let r of t){if(!r||typeof r.id!=`string`||n.has(r.id)||!Object.hasOwn(x,r.instrument)||!Number.isFinite(r.time)||r.time<0||r.time>e.duration||!Number.isInteger(r.velocity)||r.velocity<1||r.velocity>127)throw Error(`Il progetto contiene un colpo non valido.`);n.add(r.id)}}if(e.bar_times!==void 0&&(!Array.isArray(e.bar_times)||!e.bar_times.length||e.bar_times.some((t,n,r)=>!Number.isFinite(t)||t<0||t>=e.duration||n&&t<=r[n-1])))throw Error(`Mappa delle battute non valida.`)}function de(e){let[t,n]=e.meter.split(`/`).map(Number),r=32/n,i=t*r,a=32/(e.grid??16),o=e.bar_times??[0],s=i*60/(8*e.bpm),c=o.length>1?o[1]-o[0]:s,l=o.length>1?o.at(-1)-o.at(-2):s,u=Math.ceil(o[0]/c-1e-9),d=[],f=e=>d.push({start:e,length:i});for(let e=0;e<u;e++)f(Math.max(0,o[0]-(u-e)*c));for(o.forEach(f);d.at(-1).start+l<e.duration-1e-8;)f(d.at(-1).start+l);d.forEach((e,t)=>{e.end=d[t+1]?.start??e.start+l}),u&&(d[0].length=Math.max(1,Math.round(i*(d[0].end-d[0].start)/c)));let p=+(d[0].length<i),m=Number.isInteger(e.first_numbered_bar)&&e.first_numbered_bar>=0&&e.first_numbered_bar<d.length?e.first_numbered_bar:e.bar_source===`manual`?u:p;d.forEach((e,t)=>{e.number=t-m+1});function h(e,t=!1){let n=0,r=d.length;for(;n+1<r;){let t=n+r>>1;d[t].start<=e?n=t:r=t}let i=d[n],o=i.length*(e-i.start)/(i.end-i.start);if(!t)return{bar:n,tick:Math.max(0,Math.min(o,i.length))};let s=Math.floor((i.length-1)/a)*a;return n+1<d.length&&o>=(s+i.length)/2?{bar:n+1,tick:0}:{bar:n,tick:Math.max(0,Math.min(s,Math.round(o/a)*a))}}return{bars:d,at:h,seconds:(e,t)=>d[e].start+(d[e].end-d[e].start)*t/d[e].length,beat:r,q:a,full:i,firstComplete:p}}function fe(){let e=60/96,t=[];for(let n=0;n<12;n++){let r=(r,i,a)=>t.push({id:`pocket-`+t.length,time:(4*n+r)*e,instrument:i,velocity:a});for(let e=0;e<8;e++)r(e/2,n%4==0&&!e?`crash`:e===7&&n%3==2?`hi_hat_open`:`hi_hat_closed`,e%2?68:87);for(let e of n%2?[0,1.5,2.5]:[0,2,2.5])r(e,`kick`,104);r(1,`snare`,104),r(3,`snare`,106),n%4==3&&(r(3.5,`high_tom`,88),r(3.75,`low_tom`,96))}return{version:1,name:`Midnight Pocket`,artist:`Drumfolio Sessions`,bpm:96,meter:`4/4`,duration:48*e,grid:16,tracks:{},mode:`stem`,sections:{1:`Groove`,5:`Variazione`,9:`Ripresa`},events:t,automatic:structuredClone(t)}}function pe(e,t,n){let r=de(e).at(t).bar;if(!Number.isInteger(n)||n<1||n>r+1)throw Error(`Scegli un numero fra 1 e `+(r+1)+`.`);return r-n+1}var me;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(me||={});var C=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},he=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,ge=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?he(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new C(`"${e}" plugin is not implemented on ${c}`,me.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}throw new C(`"${e}.${t}()" is not implemented on ${c}`,me.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,"name",{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),ee=(e,t)=>{let n=h({eventName:e},t).then(e=>e),r=async()=>{let t=await n;await g({eventName:e,callbackId:t})},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},_=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?ee:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=_,l.set(e,{name:e,proxy:_,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),_},n.Exception=C,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},_e=(e=>e.Capacitor=ge(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),ve=_e.registerPlugin,ye=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(r)r.forEach(e=>e(t));else if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new _e.Exception(e,me.Unimplemented)}unavailable(e=`not available`){return new _e.Exception(e,me.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);r!==-1&&this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},be=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),xe=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Se=class extends ye{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=xe(n).trim(),r=xe(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=be(e.key),n=be(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};ve(`CapacitorCookies`,{web:()=>new Se});var Ce=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),we=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},Te=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,Ee=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=we(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else(r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},De=class extends ye{async request(e){let t=Ee(e,e.webFetchExtra),n=Te(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await Ce(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};ve(`CapacitorHttp`,{web:()=>new De});var Oe;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(Oe||={});var ke;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(ke||={});var Ae=class extends ye{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};ve(`SystemBars`,{web:()=>new Ae});var je=`modulepreload`,Me=function(e){return`/drumfolio-beta/`+e},Ne={},Pe=function(e){return e.pathname.endsWith(`.css`)},Fe=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},w=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Me(t,n);let r=s(t),i=Pe(r);return Fe(Ne,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:je,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ie=ve(`App`,{web:()=>w(()=>import(`./web-Ded2H9q3.js`).then(e=>new e.AppWeb),[])}),Le=ve(`Browser`,{web:()=>w(()=>import(`./web-DGIjyXgw.js`).then(e=>new e.BrowserWeb),[])}),T={BASE_URL:`/drumfolio-beta/`,DEV:!1,MODE:`production`,PROD:!0,SSR:!1,VITE_SUPABASE_PUBLISHABLE_KEY:`sb_publishable_TEyTU3tuJHc9kGNAHSJOhg_AJdzNgss`,VITE_SUPABASE_URL:`https://eskaigregmpgljwkhtph.supabase.co`},E=!!(T.VITE_SUPABASE_URL&&T.VITE_SUPABASE_PUBLISHABLE_KEY),D=_e.isNativePlatform(),Re={ios:T.VITE_RC_IOS_KEY,android:T.VITE_RC_ANDROID_KEY}[_e.getPlatform()],ze=!!(D&&Re),O=!D,Be=D?`drumfolio://auth/callback`:location.origin+location.pathname,Ve,He,Ue,We;async function Ge(){if(!E)throw Error(`L’accesso online sarà disponibile dopo la configurazione del servizio.`);return He??=w(async()=>{let{createClient:e}=await import(`./dist-DwhOg3L3.js`);return{createClient:e}},[]).then(({createClient:e})=>e(T.VITE_SUPABASE_URL,T.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:`pkce`,detectSessionInUrl:!D}})),Ve=await He,Ve}async function Ke(){return(await Ge()).auth}async function qe(){if(!O||!E)return null;let{data:e,error:t}=await(await Ke()).getSession();if(t)throw t;return e.session?.user??null}async function Je(e,t){if(!E)return;let n=await Ke();if(n.onAuthStateChange((t,n)=>setTimeout(()=>e(n?.user??null),0)),!D)return;async function r(e){let r=new URL(e);if(r.protocol!==`drumfolio:`||r.host!==`auth`||r.pathname!==`/callback`)return;let i=r.searchParams.get(`code`);if(i&&i!==We){We=i;try{let{error:e}=await n.exchangeCodeForSession(i);if(e)throw e}catch(e){We=null,t(e)}finally{await Le.close().catch(()=>{})}}}await Ie.addListener(`appUrlOpen`,({url:e})=>r(e).catch(t));let i=await Ie.getLaunchUrl();i?.url&&await r(i.url)}async function Ye(e,t,n){let r=await Ke();if(e===`google`||e===`apple`){let{data:t,error:n}=await r.signInWithOAuth({provider:e,options:{redirectTo:Be,skipBrowserRedirect:D}});if(n)throw n;D&&await Le.open({url:t.url});return}let i;if(i=e===`register`?await r.signUp({email:t,password:n,options:{emailRedirectTo:Be}}):e===`password`?await r.updateUser({password:n}):await r.signInWithPassword({email:t,password:n}),i.error)throw i.error;return i.data}async function Xe(){let{error:e}=await(await Ke()).signOut({scope:`local`});if(e)throw e}async function Ze(e){if(!ze)throw Error(`Lo store non è attivo in questa versione.`);Ue||=(async()=>{let e=await w(()=>import(`./esm-nB_Tb61a.js`).then(e=>e.t),__vite__mapDeps([0,1]));return await e.Purchases.configure({apiKey:Re}),e})().catch(e=>{throw Ue=null,e});let t=await Ue,n=t.Purchases,r=await n.getAppUserID();return e&&r.appUserID!==e.id?await n.logIn({appUserID:e.id}):!e&&!(await n.isAnonymous()).isAnonymous&&await n.logOut(),t}async function Qe(e){if(!ze)return{active:!1,credits:null,packages:[]};let{Purchases:t}=await Ze(e),[{customerInfo:n},r,i]=await Promise.all([t.getCustomerInfo(),t.getOfferings(),t.getVirtualCurrencies().then(({virtualCurrencies:e})=>Object.values(e.all)).catch(()=>null)]);return{active:!!n.entitlements.active[T.VITE_RC_ENTITLEMENT||`plus`],credits:i,packages:r.current?.availablePackages??[]}}async function $e(e,t){await(await Ze(e)).Purchases.purchasePackage({aPackage:t})}async function et(e){await(await Ze(e)).Purchases.restorePurchases()}async function tt(e){let{error:t}=await(await Ke()).updateUser({data:{display_name:e}});if(t)throw t}async function nt(e,t){let n=T.VITE_MEDIA_RESOLVER_URL;if(!n||!E)return null;let r=new URL(n);if(r.protocol!==`https:`&&!(r.protocol===`http:`&&[`localhost`,`127.0.0.1`].includes(r.hostname)))throw Error(`Il servizio per i link richiede HTTPS.`);let{data:i,error:a}=await(await Ke()).getSession();if(a)throw a;if(!i.session)return null;let o=await fetch(r,{method:`POST`,signal:t,redirect:`error`,credentials:`omit`,headers:{"Content-Type":`application/json`,Authorization:`Bearer `+i.session.access_token},body:JSON.stringify({url:e.href})});if(!o.ok)throw Error(`Il servizio non ha potuto leggere questo post.`);let s=decodeURIComponent(o.headers.get(`X-Audio-Title`)||`Audio dal post`);return new File([await o.blob()],s+`.m4a`,{type:`audio/mp4`})}function rt(e){S(e);let t=e=>typeof e==`string`?e.slice(0,500):void 0,n=e=>e.map(({id:e,time:t,instrument:n,velocity:r})=>({id:e,time:t,instrument:n,velocity:r}));return{version:1,name:t(e.name),score_title:t(e.score_title),artist:t(e.artist),bpm:e.bpm,meter:e.meter,duration:e.duration,grid:e.grid??16,bar_times:e.bar_times,bar_source:t(e.bar_source),first_numbered_bar:Number.isInteger(e.first_numbered_bar)?e.first_numbered_bar:void 0,sections:e.sections?Object.fromEntries(Object.entries(e.sections).filter(([e,t])=>/^\d+$/.test(e)&&typeof t==`string`).map(([e,n])=>[e,t(n)])):void 0,events:n(e.events),automatic:n(e.automatic)}}var it,at=!1,ot,st=``;function ct(e){st=e,window.dispatchEvent(new Event(`sync-status`))}function lt(e=800){o()&&(clearTimeout(ot),ot=setTimeout(ft,e))}function ut(e){if(e.error)throw e.error;return e.data}async function dt(){let e=o(),t=await Ge(),n=()=>t.from(`drumfolio_scores`),r=await ee(),i=new Map(r.map(e=>[e.id,e])),a=new Set,s=new Map;for(let t=0;;t+=250){let r=ut(await n().select(`id,revision`).eq(`owner_id`,e).order(`id`).range(t,t+249));for(let e of r)s.set(e.id,e.revision);if(r.length<250)break}for(let[e,t]of s){let n=i.get(e);t!==n?.revision&&t!==n?.change&&a.add(e)}for(let t of r)if(t.change&&!a.has(t.id)){if(s.get(t.id)!==t.change){let r={score:rt(t.project),revision:t.change};if(t.revision){if(ut(await n().update(r).eq(`owner_id`,e).eq(`id`,t.id).eq(`revision`,t.revision).select(`id`)).length===0){a.add(t.id);continue}}else{let i=await n().insert({...r,id:t.id,owner_id:e});if(i.error?.code===`23505`){a.add(t.id);continue}ut(i)}}await p(t.id,e=>{if(e&&e.revision===t.revision)return{...e,revision:t.change,change:e.change===t.change?null:e.change}})}for(let t of a){let r=ut(await n().select(`id,score,revision`).eq(`owner_id`,e).eq(`id`,t).single());S(r.score);let i=await ae(r);i===`conflict`&&(at=!0,window.dispatchEvent(new Event(`score-conflict`))),i&&window.dispatchEvent(new CustomEvent(`remote-score`,{detail:t}))}}function ft(){if(!o())return;if(it)return at=!0,it;let e=async()=>{do at=!1,await dt();while(at);ct(`Spartiti sincronizzati`)};return ct(`Sincronizzazione in corso…`),it=Promise.resolve().then(()=>navigator.locks?navigator.locks.request(`drumfolio-sync-`+o(),e):e()).catch(()=>ct(`Sincronizzazione in attesa. Le modifiche sono salvate sul dispositivo.`)).finally(()=>{it=null}),it}function pt(){o()&&(window.addEventListener(`score-written`,()=>lt()),window.addEventListener(`online`,()=>lt(0)),document.addEventListener(`visibilitychange`,()=>{document.hidden||lt(0)}),setInterval(()=>{!document.hidden&&navigator.onLine&&lt(0)},6e4),ft())}var k=(e,t,n,r=``)=>`<button class="menu-row" data-act="${b(e)}"><i>${v(t)}</i><span><strong>${b(n)}</strong>${r?`<small>`+b(r)+`</small>`:``}</span>${v(`chevron-right`)}</button>`,A=(e,t=``)=>`<div class="page-head"><h1>${b(e)}</h1>${t?`<p>`+b(t)+`</p>`:``}</div>`,j=(e,t)=>`<section class="section-group"><h2>${b(e)}</h2><div class="section-card">${t}</div></section>`,mt=(e,t)=>`<button class="mint-button" data-act="${e}">${b(t)}</button>`,ht=(e,t)=>`<details><summary>${b(e)}${v(`chevron-down`)}</summary><p>${b(t)}</p></details>`,gt=[[`Come importo un brano?`,`Tocca il +, scegli un file da File o Download e tieni Drumfolio in primo piano. La batteria viene separata sul dispositivo. Al termine si apre lo spartito.`],[`Come correggo un colpo?`,`In Studio tocca la nota e scegli lo strumento, oppure trascinala sul rigo. Un doppio tocco aggiunge un colpo. Usa il cestino per eliminarlo e la freccia Annulla per recuperarlo.`],[`Come ascolto soltanto la batteria?`,`Nel player tocca la sorgente audio e scegli Batteria isolata. Per confrontarla con la trascrizione scegli Suoni dello spartito.`],[`Come suono con la modalità Live?`,`Apri un brano, tocca Live e avvia il player. Il cursore segue il tempo. Il pulsante con le due frecce mette in loop la battuta corrente.`],[`Dove sono i miei brani?`,`Da ospite i brani restano sul dispositivo. Nella beta web, accedendo con Google puoi sincronizzare spartiti e correzioni. Originale e batteria isolata restano sul dispositivo.`],[`Posso usare il link di un post?`,`Incolla il link nella nuova trascrizione. Per YouTube, Instagram e TikTok scegli anche il file del post. Drumfolio conserva il riferimento accanto al brano.`]],_t={kick:`Primo spazio dal basso`,snare:`Terzo spazio dal basso`,low_tom:`Secondo spazio`,mid_tom:`Quarta linea`,high_tom:`Quarto spazio`,hi_hat_closed:`Croce sopra il rigo`,hi_hat_open:`Croce cerchiata sopra il rigo`,ride:`Rombo`,crash:`Triangolo`,unknown:`Croce arancione, da assegnare`},vt=new Set([`studio`,`repertorio`,`supporto`,`account`,`altro`,`accesso`,`registrazione`,`profilo`,`plus`,`legenda`,`licenze`,`password`,`numerazione`]);function yt(t){let n=document.getElementById(`section-screen`),r=document.getElementById(`app-nav`),i=e=>document.getElementById(e),a=`repertorio`,s=`repertorio`,c=0,l=t.user,d=null,f=null,p=!1;function m(){let e=location.hash.slice(1);return!vt.has(e)||[`studio`,`numerazione`].includes(e)&&!t.active()?`repertorio`:e}function g(e){m()===e?C():location.hash=e}function te(e){t.notify(e?.message||`Operazione interrotta.`)}async function ne(){let e=l?`profile:`+l.id:`profile:guest`,t=await u(`settings`,e);return t||(t={id:l?.id??crypto.randomUUID(),name:``},await h(`settings`,e,t)),t}let ae=()=>d?.name||l?.user_metadata?.display_name||l?.email||`Musicista ospite`;function oe(){let e=[`accesso`,`registrazione`,`profilo`,`password`,`plus`].includes(a)?`account`:[`legenda`,`licenze`,`numerazione`].includes(a)?`altro`:a;r.querySelectorAll(`[data-route]`).forEach(t=>{t.dataset.route===e?t.setAttribute(`aria-current`,`page`):t.removeAttribute(`aria-current`)})}function y(e){let n=e.project,r=n.artist||n.name.split(` - `).slice(0,-1).join(` - `),i=n.score_title||n.name.split(` - `).at(-1),a=[r,ce(n.duration),Math.round(n.bpm)+` BPM`].filter(Boolean).join(` · `);return`<button class="song-row" data-score="${b(e.id)}"><i class="record-disc">${v(`disc-3`)}</i><span><strong>${b(i)}</strong><small>${b(a)}</small></span>${e.id===t.active()?`<b class="open-dot" title="Spartito aperto"></b>`:v(`chevron-right`)}</button>`}async function se(){let[e,t]=await Promise.all([ee(),u(`settings`,`pending-song`)]),n=e.filter(e=>e.id!==`pocket-study`).sort((e,t)=>e.project.name.localeCompare(t.project.name,`it`)),r=`<section class="home-hero"><div class="home-hero-content"><h1>${n.length?`Nuova trascrizione`:`Il tuo primo brano`}</h1>
      <p>Importa una canzone per ottenere lo spartito modificabile della batteria.</p>
      <button class="home-upload" data-act="new">${v(`upload`)}Carica un brano</button></div></section>`,i=n.length?`<div class="section-card">${n.map(y).join(``)}</div>`:`<div class="home-empty">${v(`folder-open`)}<div><strong>Nessun brano salvato</strong><p>${l&&O?`Qui ritrovi anche gli spartiti sincronizzati.`:`I brani che importi vengono salvati su questo dispositivo.`}</p></div></div>`;return r+(t?j(`Importazione incompleta`,k(`resume`,`history`,`Riprendi importazione`,t.file.name)+k(`discard`,`trash-2`,`Scarta importazione incompleta`)):``)+`<section aria-labelledby="home-songs"><div class="catalog-title"><h2 id="home-songs">Il tuo repertorio</h2>${n.length?`<span>`+n.length+`</span>`:``}</div>${i}</section>
      <div class="home-shortcuts">${k(`project`,`folder-open`,`Apri un progetto`,`File .drums`)}${k(`demo`,`headphones`,`Prova una demo`,`Midnight Pocket`)}</div>`}function le(){return A(`Supporto`,`Guida a Drumfolio Studio`)+j(`Domande frequenti`,gt.map(([e,t])=>ht(e,t)).join(``))+k(`legenda`,`book-open`,`Legenda dello spartito`)}async function ue(){d=await ne();let e=ae();return A(`Account`)+`<div class="profile-card"><div class="avatar">${b(e.trim().slice(0,1).toUpperCase())}</div><h2>${b(e)}</h2><p>${b(l?.email||`Profilo su questo dispositivo`)}</p><small>ID · ${b(d.id)}</small>${mt(`profilo`,`Modifica profilo`)}</div>`+(l?``:j(`Accesso`,k(`accesso`,`log-in`,`Accedi o registrati`)))+(O?``:j(`Crediti e abbonamento`,`<div id="balance" class="balance" aria-live="polite">${ze?`Caricamento saldo…`:`Trascrizione locale inclusa`}</div>`+k(`plus`,`ticket`,`Drumfolio Plus`,`Piani e ripristino acquisti`)))+(O&&l?await de():``)+(l?j(`Gestione account`,(O?``:k(`password`,`lock-keyhole`,`Cambia password`))+k(`logout`,`log-in`,`Esci dall’account`)):``)}let S=e=>`<strong>${e.active?`Drumfolio Plus`:`Piano Studio`}</strong>${e.credits===null?`<p>Saldo crediti temporaneamente non disponibile.</p>`:e.credits.map(e=>`<p>`+b(e.name)+` · `+b(e.balance)+`</p>`).join(``)}`;async function de(){let e=(await re()).map(e=>k(`adopt-`+e.id,`cloud-upload`,e.project.score_title||e.project.name,`Copia nel mio account`)).join(``);return j(`Sincronizzazione`,`<p class="page-note" id="sync-status" role="status">${b(st||`Spartiti e correzioni nel tuo account`)}</p>`+k(`sync`,`cloud-upload`,`Sincronizza ora`,`MP3 e batteria isolata restano sul dispositivo`))+(e?j(`Scegli uno spartito ospite da copiare`,e):``)}function fe(){if(O)return`<div class="login-image"></div>`+A(`Accedi a Drumfolio`,`Ritrova spartiti e correzioni sui tuoi dispositivi.`)+`<div class="providers"><button data-act="google" `+(E?``:`disabled`)+`>Continua con Google</button></div>`+(E?``:`<p class="page-note">Accesso Google non configurato in questa anteprima.</p>`)+`<div class="end-actions">`+mt(`repertorio`,`Continua come ospite`)+`</div>`;let e=a===`registrazione`,t=a===`password`,n=E?``:` disabled`;return`<div class="login-image"></div>`+A(t?`Cambia password`:e?`Crea un account`:`Accedi a Drumfolio`)+(E?``:`<div class="guest-access"><p>Il profilo ospite è disponibile su questo dispositivo. L’accesso online richiede il collegamento del servizio account.</p>`+mt(`repertorio`,`Continua come ospite`)+`</div>`)+`<form class="account-form" id="auth-form">${t?``:`<label>Email<input name="email" type="email" autocomplete="email" required`+n+`></label>`}<label>${t?`Nuova password`:`Password`}<input name="password" type="password" autocomplete="${e||t?`new-password`:`current-password`}" ${e||t?`minlength="8"`:``} required${n}></label><button class="mint-button" ${n}>${t?`Salva password`:e?`Crea account`:`Accedi`}</button></form>`+(t?``:`<div class="providers"><button data-act="google"${n}>Continua con Google</button><button data-act="apple"${n}>Continua con Apple</button></div>`)+(t?``:`<div class="end-actions"><button data-act="${e?`accesso`:`registrazione`}">${e?`Ho già un account`:`Registrati`}</button>${E?`<button data-act="repertorio">Continua come ospite</button>`:``}</div>`)}async function pe(){if(a===`repertorio`)return se();if(a===`supporto`)return le();if(a===`account`)return ue();if([`accesso`,`registrazione`,`password`].includes(a))return fe();if(a===`profilo`)return d=await ne(),A(`Modifica profilo`)+`<form id="profile-form" class="account-form"><label>Nome visualizzato<input name="name" required maxlength="60" value="${b(d.name||l?.user_metadata?.display_name||``)}" placeholder="Il tuo nome"></label><button class="mint-button">Salva profilo</button></form>`;if(a===`plus`&&O)return ue();if(a===`plus`)return A(`Drumfolio Plus`)+j(`Abbonamento`,`<div id="offers" class="balance" role="status">`+(ze?`Caricamento piani…`:`Gli acquisti saranno disponibili con la distribuzione sugli store. Le trascrizioni locali sono già incluse.`)+`</div>`)+`<button class="secondary-btn" data-act="restore" ${ze?``:`disabled`}>${v(`history`)}Ripristina acquisti</button>`;if(a===`numerazione`){let e=t.barInfo();return A(`Numera la battuta`,`Il cursore si trova nella battuta che inizia a `+e.time.toFixed(2).replace(`.`,`,`)+` s.`)+`<form id="bar-form" class="account-form"><label>Numero di battuta<input name="bar" type="number" inputmode="numeric" min="1" max="${e.max}" step="1" value="${Math.max(1,e.number)}" required></label><p class="page-note">La numerazione automatica conta anche le battute intere di pausa. Puoi scegliere qui un primo numero diverso.</p><button class="mint-button">Applica allo spartito</button></form><button class="secondary-btn reset-count" data-act="auto-bars">Conta tutte le battute intere</button>`}if(a===`legenda`)return A(`Legenda dello spartito`)+j(`Batteria`,Object.entries(_t).map(([e,t])=>`<div class="legend-row"><b>${b(x[e][0])}</b><span>${t}</span></div>`).join(``));if(a===`licenze`){let e=await fetch(`/drumfolio-beta/third-party.txt`);if(!e.ok)throw Error(`Licenze non disponibili.`);return A(`Licenze`)+`<pre class="licenses">`+b(await e.text())+`</pre>`}let n=``;try{let e=new URL(t.sourceLink());e.protocol===`https:`&&!e.username&&!e.password&&(n=j(`Fonte del brano`,`<a class="source-link" target="_blank" rel="noopener noreferrer" href="`+b(e.href)+`">`+b(e.hostname)+` `+v(`external-link`)+`</a>`))}catch{}return A(`Altro`)+n+j(`Studio`,(t.active()?k(`numerazione`,`list-music`,`Numera la battuta al cursore`):``)+k(`legenda`,`drum`,`Legenda dello spartito`)+k(`project`,`folder-open`,`Apri progetto .drums`)+k(`supporto`,`headset`,`Supporto`))+j(`Drumfolio`,(O?``:k(`plus`,`ticket`,`Piani e acquisti`))+k(`licenze`,`book-open`,`Licenze software`))+(O?`<p class="page-note"><a href="/drumfolio-beta/privacy.html">Privacy della beta</a></p>`:``)+`<p class="page-note">Drumfolio Studio · `+b(e.version)+`</p>`}async function me(e){try{let t=await Qe(l);if(e!==c)return;f=t,a===`account`&&(i(`balance`).innerHTML=S(t)),a===`plus`&&(i(`offers`).innerHTML=S(t)+(t.packages.length?t.packages.map((e,t)=>k(`buy-`+t,`ticket`,e.product.title,e.product.priceString)).join(``):`<p>Nessun piano disponibile nello store.</p>`))}catch{e===c&&((i(`balance`)||i(`offers`)).textContent=`Store irraggiungibile. Riapri questa sezione per riprovare.`)}}async function C(){let e=++c;a=m();let r=a===`studio`;r||t.pause(),document.body.classList.toggle(`section-open`,!r),i(`workspace`).hidden=!r,n.hidden=r,document.querySelector(`.transport`).hidden=!r,document.querySelector(`.modes`).hidden=!r;let o=a===`repertorio`;(o||r)&&(s=a),document.body.classList.toggle(`home-open`,o),i(`home-account`).hidden=!o,i(`home-account`).innerHTML=v(`circle-user-round`)+(l?`Il mio account`:`Accedi`),i(`library`).hidden=o;let u=r?`Repertorio`:s===`studio`?`Torna allo spartito`:`Torna al repertorio`;if(i(`library`).setAttribute(`aria-label`,u),i(`library`).title=u,i(`library`).innerHTML=v(r?`folder-open`:`arrow-left`),i(`upgrade`).hidden=O||r||a===`plus`,oe(),window.scrollTo(0,0),r)n.replaceChildren();else{n.setAttribute(`aria-busy`,`true`),n.replaceChildren();try{let t=await pe();if(e!==c)return;n.innerHTML=t+`<p id="page-status" class="page-note" role="status"></p>`,ze&&[`account`,`plus`].includes(a)&&me(e)}catch(t){e===c&&(n.textContent=t.message)}finally{e===c&&n.removeAttribute(`aria-busy`)}}}let he=e=>{i(`page-status`)?i(`page-status`).textContent=e:t.notify(e)};async function ge(e){if(vt.has(e))g(e);else if(e===`sync`)await ft(),await C();else if(e.startsWith(`adopt-`)&&l)await ie(e.slice(6)),await C();else if(e===`auto-bars`)await t.numberBar(null);else if(e===`demo`)await t.openDemo();else if(e===`new`)t.create();else if(e===`file`)i(`song-file`).click();else if(e===`project`)i(`project-file`).click();else if(e===`resume`){let e=await u(`settings`,`pending-song`);e&&await t.resume(e)}else if(e===`discard`)await _(),await C();else if(e===`login`||e===`google`||e===`apple`)await Ye(e);else if(e===`logout`)await Xe(),g(`account`);else if(e===`restore`||e.startsWith(`buy-`)){if(p)return;p=!0;try{e===`restore`?await et(l):await $e(l,f.packages[Number(e.slice(4))]),await C(),he(e===`restore`?`Verifica acquisti completata.`:`Acquisto completato.`)}finally{p=!1}}}return r.onclick=e=>{let n=e.target.closest(`button`);n&&(n.id===`new-action`?t.create():g(n.dataset.route))},n.onclick=e=>{let n=e.target.closest(`button`);n&&(n.dataset.score?u(`scores`,n.dataset.score).then(e=>t.open(e)).catch(te):n.dataset.act&&ge(n.dataset.act).catch(e=>he(e.message)))},n.onsubmit=async e=>{if(e.preventDefault(),p)return;p=!0;let n=e.target,r=new FormData(n),i=n.querySelector(`button[type=submit],.mint-button`);i.disabled=!0;try{if(n.id===`bar-form`)await t.numberBar(Number(r.get(`bar`)));else if(n.id===`profile-form`){let e=String(r.get(`name`)).trim();if(!e)throw Error(`Inserisci un nome.`);l&&await tt(e),await h(`settings`,l?`profile:`+l.id:`profile:guest`,{...d,name:e}),g(`account`)}else{let e=a===`registrazione`,t=await Ye(a===`password`?`password`:e?`register`:`login`,r.get(`email`),r.get(`password`));e&&!t?.session?he(`Controlla la tua email per confermare la registrazione.`):g(`account`)}}catch(e){he(e.message)}finally{p=!1,i.disabled=!1}},i(`upgrade`).onclick=()=>g(`plus`),i(`home-account`).onclick=()=>g(l?`account`:`accesso`),i(`library`).onclick=()=>g(a===`studio`?`repertorio`:s),window.addEventListener(`hashchange`,C),_e.getPlatform()===`android`&&Ie.addListener(`backButton`,()=>{let e=document.querySelector(`dialog[open]`);if(e){let t=new Event(`cancel`,{cancelable:!0});e.dispatchEvent(t)&&e.close()}else a===`repertorio`?Ie.minimizeApp():g([`registrazione`,`profilo`,`plus`,`password`].includes(a)?`account`:`repertorio`)}),Je(e=>{let n=l?.id!==e?.id||l?.email!==e?.email||l?.user_metadata?.display_name!==e?.user_metadata?.display_name;O&&(e?.id??null)!==o()?(document.body.inert=!0,t.pause(),location.replace(location.pathname+location.search+`#account`),location.reload()):(l=e,e&&[`accesso`,`registrazione`].includes(a)?g(`account`):n&&a!==`studio`&&C())},te).catch(te),window.addEventListener(`sync-status`,()=>{i(`sync-status`)&&(i(`sync-status`).textContent=st)}),window.addEventListener(`remote-score`,()=>{a===`repertorio`&&C()}),{go:g,render:C}}var bt=`audio/*,video/mp4,.mp3,.wav,.m4a,.aac,.flac,.ogg,.webm,.mp4,.mid,.midi`;function xt(e){return/(^|\.)(youtube\.com|youtu\.be|instagram\.com|tiktok\.com)$/.test(e.hostname.toLowerCase())}function St(e){let t;try{t=new URL(e.trim())}catch{throw Error(`Inserisci un collegamento HTTPS completo.`)}if(t.protocol!==`https:`||t.username||t.password)throw Error(`Usa un collegamento HTTPS pubblico.`);return t}async function Ct(e,t){let n=await fetch(e,{signal:t,credentials:`omit`,referrerPolicy:`no-referrer`});if(!n.ok)throw Error(`Il link non ha restituito un file audio.`);let r=n.headers.get(`Content-Type`)?.split(`;`)[0]??``;if(r.startsWith(`text/`)||r===`application/json`)throw Error(`Il link apre una pagina. Abbina il file audio per trascriverlo.`);let i=decodeURIComponent(e.pathname.split(`/`).pop()||`Audio da link`);return new File([await n.blob()],i,{type:r})}async function wt(){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Error(`Il microfono non è accessibile. Puoi importare una registrazione dai File.`);let e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),t=()=>e.getTracks().forEach(e=>e.stop());try{let n=[`audio/mp4`,`audio/webm;codecs=opus`,`audio/ogg;codecs=opus`].find(e=>MediaRecorder.isTypeSupported(e)),r=new MediaRecorder(e,n?{mimeType:n}:{}),i=[],a=new Promise((e,a)=>{r.ondataavailable=e=>{e.data.size&&i.push(e.data)},r.onstop=()=>{t();let a=r.mimeType||i[0]?.type||n||`audio/mp4`,o=a.includes(`webm`)?`webm`:a.includes(`ogg`)?`ogg`:`m4a`,s=new Date().toISOString().slice(0,19).replace(`T`,` `).replaceAll(`:`,`-`);e(new File(i,`Registrazione `+s+`.`+o,{type:a}))},r.onerror=()=>{t(),a(Error(`La registrazione è stata interrotta.`))}});return r.start(1e3),{result:a,stop(){r.state===`inactive`?t():r.stop()}}}catch(e){throw t(),e}}function Tt({importFile:e,pause:t}){let n=e=>document.getElementById(e),r=n(`create-sheet`),i=n(`create-status`),a=n(`song-file`),o,s,c,l,u=0,d=n(`record-audio`),f=n(`pick-song`);a.accept=bt;function p(e){f.disabled=e,n(`link-form`).querySelector(`button`).disabled=e,n(`import-url`).disabled=e}function m(){r.open&&r.close()}function h(){u++,o&&=(o.stop(),null),clearInterval(s),c?.abort(),c=null,l=null,p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`,n(`link-form`).reset(),i.textContent=``,f.querySelector(`strong`).textContent=`Scegli un file`}function g(){r.open||(t(),h(),r.showModal())}function ee(e){i.textContent=e.name===`NotAllowedError`?`Consenti il microfono nelle impostazioni di Drumfolio.`:e.message||`Operazione interrotta.`}async function _(t,n){m(),await e(t,n)}return r.addEventListener(`close`,h),r.onclick=e=>{if(e.target===r){let t=r.getBoundingClientRect();(e.clientY<t.top||e.clientX<t.left||e.clientX>t.right)&&m()}},n(`close-create`).onclick=m,f.onclick=()=>a.click(),a.onchange=async e=>{let t=e.target.files[0];a.value=``,t&&await _(t,l)},n(`import-url`).oninput=()=>{l=null,f.querySelector(`strong`).textContent=`Scegli un file`,i.textContent=``},n(`link-form`).onsubmit=async e=>{e.preventDefault();let t=u;try{let e=St(n(`import-url`).value);l=e.href,p(!0),d.disabled=!0,i.textContent=`Lettura del link…`,c=new AbortController;let r=xt(e);r&&(f.querySelector(`strong`).textContent=`Abbina il file del post`);let a=r?await nt(e,c.signal):await Ct(e,c.signal);if(!a){i.textContent=`Collega il file audio o video del post. Il link verrà salvato insieme allo spartito.`;return}t===u&&await _(a,e.href)}catch(e){t===u&&e.name!==`AbortError`&&(i.textContent=(e instanceof TypeError?`Il sito non consente di scaricare il file da questo link.`:e.message)+` Puoi scegliere il file dal dispositivo.`)}finally{t===u&&(p(!1),d.disabled=!1)}},d.onclick=async()=>{if(o){d.disabled=!0,o.stop();return}let e=u;p(!0),d.disabled=!0;try{let t=await wt();if(e!==u){t.stop(),await t.result;return}o=t,d.disabled=!1,d.classList.add(`recording`);let n=Date.now(),r=()=>{d.querySelector(`span`).textContent=`Termina e trascrivi · `+ce((Date.now()-n)/1e3)};r(),s=setInterval(r,300),i.textContent=`Registrazione in corso`;let a=await t.result;e===u&&await _(a)}catch(t){e===u&&ee(t)}finally{e===u&&(o=null,clearInterval(s),p(!1),d.disabled=!1,d.classList.remove(`recording`),d.querySelector(`span`).textContent=`Registra al microfono`)}},g}var Et=e=>86-x[e][1]*8/2,Dt=(e,t,n,r,i=1)=>`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="currentColor" stroke-width="${i}"/>`,Ot=(e,t,n,r=32)=>`<text class="musicglyph" x="${e}" y="${t}" font-size="${r}">&#x${n};</text>`,kt=[32,16,8,4,2,1],At=[`E4E3`,`E4E4`,`E4E5`,`E4E6`,`E4E7`,`E4E8`],jt={hi_hat_closed:`E0A9`,hi_hat_open:`E0B3`,crash:`E0BE`,ride:`E0DB`,unknown:`E0A9`};function Mt(e,t,n){let r=[],i=0;for(let a of[...e.keys(),t].sort((e,t)=>e-t))for(;i<a;){let t=e.get(i)??[],o=kt.find(e=>e<=a-i&&i%e===0);t.length&&(o=Math.min(o,n&-n)),r.push({tick:i,value:o,hits:t}),i+=o}return r}function Nt(e,t,n,r,i){let a=t.bars[e],o=a.length,s=e=>33+e*307/o,c=``,l=``,u=``,d=``;for(let e=0;e<5;e++)c+=Dt(2,86-e*8,348,86-e*8,.72);c+=Dt(2,54,2,86)+Dt(348,54,348,86),c+=Ot(4,70,`E069`,26);let f=[new Map,new Map],p=[];for(let{hit:e,tick:t}of n){let n=f[Number(ue(e.instrument))];n.has(t)||n.set(t,[]),n.get(t).push(e)}let m=f.filter(e=>e.size).length,h=Number(i.split(`/`)[0])*t.beat,g=m===0&&o===h;g&&(c+=Ot(s(o/2)-4,62,`E4E3`,28));for(let e=0;e<2&&!g;e++){if(!f[e].size&&(m||e))continue;let n=e===1,i=n?1:-1,a=Mt(f[e],o,t.beat);for(let e of a){let t=s(e.tick);if(!e.hits.length){m<2&&(c+=Ot(t-2,70,At[kt.indexOf(e.value)],28));continue}let i=e.hits.map(e=>Et(e.instrument));e.stemX=t+(n?4.3:-4.2),e.top=n?Math.min(...i)-23:Math.max(...i)+22,e.start=n?Math.max(...i):Math.min(...i),e.flags=Math.max(0,Math.log2(8/e.value));for(let n of e.hits){let i=Et(n.instrument);p.push({x:t,y:i,hit:n}),n.id===r&&(u+=`<circle cx="${t}" cy="${i}" r="8.3" class="focus-note"/>`),n.instrument===`crash`&&(u+=Dt(t-7,i,t+7,i,.75)),u+=`<g class="${n.instrument===`unknown`?`uncertain`:``}">`+Ot(t-4.4,i,jt[n.instrument]??(e.value>=16?`E0A3`:`E0A4`))+`</g>`}}for(let e=0;e<a.length;){let r=a[e];if(!r.hits.length||r.value===32){e++;continue}let o=e;for(;r.flags&&o+1<a.length&&a[o+1].flags&&Math.floor(a[o+1].tick/t.beat)===Math.floor(r.tick/t.beat);)o++;let s=a.slice(e,o+1),c=(n?Math.min:Math.max)(...s.map(e=>e.top));for(let e=0;e<s.length;e++){let t=s[e];if(l+=Dt(t.stemX,t.start,t.stemX,c,1.1),s.length===1&&t.flags)l+=Ot(t.stemX,c,(57920+2*(t.flags-1)+ +!n).toString(16),28);else for(let n=0;n<t.flags;n++){let r=c+i*n*3.8;s[e+1]?.flags>n?l+=Dt(t.stemX,r,s[e+1].stemX,r,2.8):s[e-1]?.flags>n||(l+=Dt(t.stemX,r,t.stemX+(e?-5:5),r,2.8))}}e=o+1}}for(let e=0;e<o;e++){let n=e+h-o;n%t.beat===0&&(d+=`<text x="${s(e)}" y="129" class="beat">${1+n/t.beat}</text>`)}return{targets:p,html:`<svg class="staff" data-bar="${e}" viewBox="0 0 350 139" role="img" aria-label="${a.number>0?`Battuta `+a.number:o<h?`Anacrusi`:`Intro`}${g?`, pausa di battuta`:``}">${c}${l}${u}${d}<g class="cursor" visibility="hidden"><line y1="20" y2="114"/><circle cy="20" r="2.8"/></g></svg>`}}async function Pt(e,t){let n=await e.arrayBuffer(),r=n.byteLength>=4&&new DataView(n).getUint32(0)===1716281667;try{return await t.decodeAudioData(r?n.slice(0):n)}catch(e){if(!r)throw e}let{FLACDecoder:i}=await w(async()=>{let{FLACDecoder:e}=await import(`./flac-BqfAJ19Z.js`);return{FLACDecoder:e}},[]),a=new i;await a.ready;try{let{channelData:e,sampleRate:r,samplesDecoded:i,errors:o}=await a.decodeFile(new Uint8Array(n));if(!i||o.length)throw Error(`File FLAC incompleto.`);let s=t.createBuffer(e.length,i,r);if(e.forEach((e,t)=>s.copyToChannel(e,t)),r===t.sampleRate)return s;let c=Math.ceil(i*t.sampleRate/r),l=new OfflineAudioContext(e.length,c,t.sampleRate),u=l.createBufferSource();return u.buffer=s,u.connect(l.destination),u.start(),await l.startRendering()}finally{a.free()}}var M,Ft,It,Lt=0,Rt=0,zt=[],Bt=0,Vt,Ht=new Set,N=()=>M&&P()?M.currentTime-Lt:Rt,P=()=>Vt!==void 0;async function Ut(){M??=new AudioContext,await M.resume(),Ft??=Promise.all(Object.keys(x).filter(e=>e!==`unknown`).map(async e=>{let t=await fetch(`/drumfolio-beta/sounds/`+e+`.wav`);if(!t.ok)throw Error(`Campione audio non disponibile.`);return[e,await M.decodeAudioData(await t.arrayBuffer())]})).then(Object.fromEntries).catch(e=>{throw Ft=null,e}),It=await Ft}function Wt(e,t,n){if(!It?.[e])return;let r=M.createBufferSource(),i=M.createGain();r.buffer=It[e],i.gain.value=n*.7,r.connect(i).connect(M.destination),Ht.add(r),r.onended=()=>{Ht.delete(r),i.disconnect()},r.start(t)}async function Gt(e){await Ut(),Wt(e,M.currentTime,.8)}async function Kt(e){return await Ut(),Pt(e,M)}function qt(){P()&&(Rt=N()),Vt=void 0;for(let e of Ht)e.stop();Ht.clear()}function Jt(e){qt(),Rt=e}function Yt(e,t,n){if(qt(),Rt=t,Lt=M.currentTime-t,Vt=n??null,zt=e.filter(e=>e.time>=t-.001).sort((e,t)=>e.time-t.time),Bt=0,n&&t<n.duration){let e=M.createBufferSource();e.buffer=n,e.connect(M.destination),Ht.add(e),e.onended=()=>Ht.delete(e),e.start(0,t)}}function Xt(e){if(!P()||Vt)return;let t=Math.min(e,N()+.12);for(;Bt<zt.length&&zt[Bt].time<t;){let e=zt[Bt++];Wt(e.instrument,Math.max(M.currentTime,Lt+e.time),e.velocity/127)}}var F=e=>document.getElementById(e);F(`app`).innerHTML=le();var Zt=Object.keys(x),Qt=matchMedia(`(min-width:760px)`);F(`instrument`).innerHTML=Zt.map(e=>`<option value="${e}">${x[e][0]}</option>`).join(``);var $t=null,en,I,L,R,tn,z=0,B=null,V=!1,H=null,U=null,W=``,G=!1,K=!1,nn=[],rn=[],an=new Map,q=null,on=null,sn,cn=0,ln=null,un=!1,dn=-1,fn=Promise.resolve(),pn,mn=new Map,J=()=>V?2:Qt.matches?4:2,hn=e=>R.bars[e].number>0?se(R.bars[e].number):R.bars[e].length<R.full?`Lev.`:`Intro`,gn=()=>I.events.find(e=>e.id===B),_n=()=>R.at(N()).bar,vn=()=>G?U:null;function yn(e){clearTimeout(sn),F(`notice`).textContent=e,sn=setTimeout(()=>F(`notice`).textContent=``,3800)}function Y(e){yn(e.message||`Operazione interrotta`)}function X(e){return(...t)=>Promise.resolve().then(()=>e(...t)).catch(Y)}function bn(){R=de(I),tn=R.bars.map(()=>[]);for(let e of I.events){let t=R.at(e.time,!0);tn[t.bar].push({hit:e,tick:t.tick})}}function xn(e){return{kick:`primo spazio dal basso`,snare:`terzo spazio dal basso`,low_tom:`secondo spazio dal basso`,mid_tom:`quarta linea`,high_tom:`quarto spazio dal basso`,hi_hat_closed:`croce sopra il rigo`,hi_hat_open:`croce cerchiata sopra il rigo`,crash:`triangolo sopra il rigo`,ride:`rombo sulla linea superiore`,unknown:`strumento da assegnare`}[e]}function Z(){let e=J(),t=Math.min(R.bars.length,z+e),n=_n();document.body.classList.toggle(`live`,V),F(`live`).setAttribute(`aria-pressed`,String(V)),F(`studio`).setAttribute(`aria-pressed`,String(!V));let r=I.name.indexOf(` - `);F(`title`).textContent=I.score_title||(r>0?I.name.slice(r+3):I.name),F(`artist`).textContent=I.artist||(r>0?I.name.slice(0,r):`Repertorio personale`),F(`bpm`).textContent=Number(I.bpm.toFixed(1)).toLocaleString(`it`)+` BPM`,F(`meter`).textContent=I.meter,F(`bar-total`).textContent=R.bars.length-R.bars.filter(e=>e.number<=0).length+` battute`,F(`page`).textContent=Math.floor(z/e)+1+` / `+Math.ceil(R.bars.length/e),F(`previous`).disabled=z===0,F(`next`).disabled=t===R.bars.length;let i=Object.entries(I.sections??{}).filter(([e])=>Number(e)<=R.bars[z].number).sort(([e],[t])=>Number(t)-Number(e))[0];F(`section-label`).textContent=V?`MODALITÀ LIVE`:`BATTUTE `+hn(z)+` — `+hn(t-1),F(`section-title`).textContent=V?`Battuta `+hn(n):i?.[1]||`Batteria`,F(`paper-meter`).textContent=I.meter,an=new Map;let a=[];for(let e=z;e<t;e++){let t=Nt(e,R,tn[e],V?null:B,I.meter);an.set(e,t.targets),a.push(`<div class="measure" data-measure="${e}"><div class="measure-meta"><span class="index">${hn(e)}</span></div>${t.html}</div>`)}F(`bars`).innerHTML=a.join(``);for(let e of F(`bars`).querySelectorAll(`.staff`))if(!V)for(let t of an.get(+e.dataset.bar)){let n=document.createElementNS(`http://www.w3.org/2000/svg`,`circle`);for(let[e,r]of Object.entries({cx:t.x,cy:t.y,r:7,fill:`transparent`}))n.setAttribute(e,r);n.style.touchAction=`none`,e.append(n)}F(`duration`).textContent=ce(I.duration),F(`source-name`).textContent=G?K?`Batteria isolata`:W:`Suoni dello spartito`,F(`seek`).max=I.duration,F(`grid-text`).textContent=`1/`+(I.grid??16),F(`undo`).disabled=!nn.length,F(`redo`).disabled=!rn.length,F(`remove`).disabled=!gn();let o=gn();o&&(F(`instrument`).value=o.instrument),F(`hint`).textContent=o?x[o.instrument][0]+` · `+xn(o.instrument)+` · Trascina per spostare il colpo.`:`Tocca un colpo per selezionarlo. Doppio tocco sul rigo per inserirlo.`,F(`loop`).setAttribute(`aria-pressed`,String(H!==null)),dn=-1,Sn()}function Sn(){let e=Math.min(I.duration,Math.max(0,N())),{bar:t,tick:n}=R.at(e);if(P()&&(t<z||t>=z+J())){z=Math.floor(t/J())*J(),Z();return}if(dn!==t){F(`bar-now`).textContent=hn(t),V&&(F(`section-title`).textContent=`Battuta `+hn(t));for(let e of F(`bars`).querySelectorAll(`.measure`)){let n=+e.dataset.measure===t;e.classList.toggle(`current`,n),e.querySelector(`.cursor`).setAttribute(`visibility`,n?`visible`:`hidden`)}dn=t}let r=33+n*307/R.bars[t].length;F(`bars`).querySelector(`[data-bar="${t}"] .cursor`)?.setAttribute(`transform`,`translate(`+r+` 0)`),F(`elapsed`).textContent=ce(e),F(`seek`).value=e,F(`seek`).style.setProperty(`--progress`,e/I.duration*100+`%`)}function Cn(){F(`play`).innerHTML=v(P()?`pause`:`play`),F(`play`).setAttribute(`aria-label`,P()?`Pausa`:`Riproduci`)}function Q(){cn++,qt(),Cn()}function $(e,t=!0){cn++,e=Math.max(0,Math.min(e,I.duration));let n=P();Jt(e),H!==null&&R.at(e).bar!==H&&(H=null),t&&(z=Math.floor(R.at(e).bar/J())*J()),n&&Yt(I.events,e,vn()),Z(),Cn()}async function wn(){if(P()){Q();return}let e=++cn;if(await Ut(),e!==cn)return;if(G&&!U){let t=await u(`audio`,K?[L,`drums`]:L);if(!t)throw Error(`Traccia audio non disponibile sul dispositivo.`);let n=await Kt(t);if(e!==cn)return;U=n}let t=N();t>=I.duration-.01&&(t=0),H!==null&&R.at(t).bar!==H&&(t=R.bars[H].start),Yt(I.events,t,vn()),Cn(),Tn()}function Tn(){if(!P())return;let e=H===null?I.duration:Math.min(R.bars[H].end,I.duration);if(N()>=e){if(H===null){Q(),Jt(e),Sn();return}Yt(I.events,R.bars[H].start,vn())}Xt(e),Sn(),requestAnimationFrame(Tn)}async function En(e){if(V=e,z=Math.floor(_n()/J())*J(),B=null,Z(),e&&navigator.wakeLock)try{pn=await navigator.wakeLock.request(`screen`)}catch{}!e&&pn&&(await pn.release(),pn=null)}function Dn(){return{events:I.events,grid:I.grid??16,selected:B,first_numbered_bar:I.first_numbered_bar}}function On(e){let t=L,n=fn.then(()=>{if(L===t)return e()});return fn=n.catch(Y),n}function kn(e,t,n=I.grid??16,r={}){let i=Dn();return An({...Dn(),events:e,selected:t,grid:n,...r},()=>{nn.push(i),nn.length>80&&nn.shift(),rn=[]})}async function An(e,t){let n={...I,events:e.events,grid:e.grid,first_numbered_bar:e.first_numbered_bar},r=o()&&L===`pocket-study`?crypto.randomUUID():L,i=await h(`scores`,r,{id:r,project:n},r===L?$t:void 0);r!==L&&(L=r,await h(`settings`,`active`,L)),$t=m(i),t(),I=n,B=e.selected,bn(),P()&&Yt(I.events,N(),vn()),Z()}function jn(e=!1){if(!V)return On(()=>{let t=e?rn:nn,n=e?nn:rn,r=Dn();if(t.length)return An(t.at(-1),()=>{n.push(r),t.pop()})})}function Mn(){if(V||!gn())return;let e=B;return On(()=>{if(I.events.some(t=>t.id===e))return kn(I.events.filter(t=>t.id!==e),null)})}function Nn(e,t,n){return On(()=>{let r=I.events.find(t=>t.id===e.id);if(!r)return;let i=n??r.time;if(I.events.some(n=>n.id!==e.id&&n.instrument===t&&Math.abs(n.time-i)<5e-4))Z(),yn(`Questo colpo è già presente.`);else return kn(I.events.map(n=>n.id===e.id?{...n,instrument:t,time:i}:n),e.id)})}function Pn(e,t){let n=e.getBoundingClientRect(),r=350/n.width;return{x:(t.clientX-n.left)*r,y:(t.clientY-n.top)*r}}function Fn(e,t){let n=+e.dataset.bar,{x:r,y:i}=Pn(e,t),a=R.bars[n],o=Math.max(0,Math.min(Math.floor((a.length-1)/R.q)*R.q,Math.round((r-33)*a.length/307/R.q)*R.q)),s=R.seconds(n,o),c=(86-i)*2/8;return{bar:n,tick:o,t:s,key:Zt.filter(e=>e!==`unknown`).sort((e,t)=>Math.abs(x[e][1]-c)-Math.abs(x[t][1]-c))[0],x:r,y:i}}F(`bars`).onpointerdown=e=>{if(e.button!==0||q)return;let t=e.target.closest(`.staff`);if(!t)return;let n=Fn(t,e),r=an.get(n.bar).map(e=>({...e,distance:Math.hypot((e.x-n.x)*.84,e.y-n.y)})).filter(e=>e.distance<10).sort((e,t)=>e.distance-t.distance);q={id:e.pointerId,svg:t,hit:r[0]?.hit,x:e.clientX,y:e.clientY,drag:!1},t.setPointerCapture(e.pointerId)},F(`bars`).onpointermove=e=>{if(q?.id!==e.pointerId||V||!q.hit||(Math.hypot(e.clientX-q.x,e.clientY-q.y)>6&&(q.drag=!0),!q.drag))return;let t=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`)??q.svg,n=Fn(t,e);F(`hint`).textContent=x[n.key][0]+` · Battuta `+hn(n.bar)+` · `+xn(n.key),F(`bars`).querySelector(`.drop-preview`)?.remove(),t.insertAdjacentHTML(`beforeend`,`<circle class="drop-preview" cx="${33+n.tick*307/R.bars[n.bar].length}" cy="${Et(n.key)}" r="7" fill="#73b896" stroke="#25543b" pointer-events="none"/>`)},F(`bars`).onpointercancel=()=>{q=null,Z()},F(`bars`).onpointerup=e=>{if(q?.id!==e.pointerId)return;let{svg:t,hit:n,drag:r,x:i,y:a}=q;q=null;let o=document.elementFromPoint(e.clientX,e.clientY)?.closest(`.staff`);if(!o||!r&&Math.hypot(e.clientX-i,e.clientY-a)>8){Z();return}let s=Fn(o,e);if(V){$(R.bars[s.bar].start);return}if(r&&n){on=null;let r=o!==t||Math.abs(e.clientX-i)>9,c=Math.abs(e.clientY-a)>4,l=r?s.t:n.time,u=c?s.key:n.instrument;l<I.duration?(Nn(n,u,l),Gt(u).catch(Y)):Z();return}let c=performance.now(),l=on&&c-on.now<375&&on.bar===s.bar&&Math.hypot(e.clientX-on.x,e.clientY-on.y)<16;if(on=l?null:{now:c,bar:s.bar,x:e.clientX,y:e.clientY},l&&!n&&s.t<I.duration){let e=s.key===`hi_hat_closed`&&F(`instrument`).value===`hi_hat_open`?`hi_hat_open`:s.key,t={id:crypto.randomUUID(),time:s.t,instrument:e,velocity:96};On(()=>{if(!tn[s.bar].some(t=>t.tick===s.tick&&t.hit.instrument===e))return kn([...I.events,t],t.id)}),Gt(e).catch(Y)}else n?(B=n.id,Z(),Gt(n.instrument).catch(Y)):(B=null,$(Math.min(I.duration,s.t),!1))};function In(e,t){F(`dialog-title`).textContent=e,F(`dialog-body`).replaceChildren();for(let e of t){let t=document.createElement(`button`);t.className=`choice`,t.innerHTML=v(e.icon)+b(e.text)+(e.detail?`<small>`+b(e.detail)+`</small>`:``),t.onclick=X(()=>(F(`dialog`).close(),e.go())),F(`dialog-body`).append(t)}F(`dialog`).open||F(`dialog`).showModal()}async function Ln(e,t=!0){if(await fn,S(e.project),Q(),Jt(0),H=null,z=0,B=null,V=!1,nn=[],rn=[],pn&&=(await pn.release(),null),L=e.id,$t=m(e),I=e.project,U=null,W=``,un=I.mobile_stem===!0&&await g(`audio`,[L,`drums`]),K=un,G=un,un)W=I.original_name;else{let e=await u(`audio`,L);e&&(W=e.name||`Originale`)}bn(),Z(),await h(`settings`,`active`,L),t&&en.go(`studio`)}function Rn(e,t=!1){Q(),G=e,K=t,U=null,Z()}async function zn(){Q();let e=[{text:`Suoni dello spartito`,detail:G?``:`Attivi`,icon:`drum`,go:()=>Rn(!1)}];un&&e.push({text:`Batteria isolata`,detail:G&&K?`Attiva`:``,icon:`audio-lines`,go:()=>Rn(!0,!0)}),W&&e.push({text:W,detail:G&&!K?`Attiva`:``,icon:`music-2`,go:()=>Rn(!0)}),un||e.push({text:`Abbina una traccia audio`,icon:`headphones`,go:()=>F(`audio-file`).click()}),In(`Sorgente audio`,e)}async function Bn(e){if(ln)return;let t=new AbortController;ln=t;let n=F(`import-progress`),r=(e,t)=>{F(`import-phase`).textContent=e,F(`import-meter`).value=t};F(`import-title`).textContent=e.file.name,F(`cancel-import`).disabled=!1,r(`Preparazione del brano`,0),Q(),U=null,n.showModal();let i;if(navigator.wakeLock)try{i=await navigator.wakeLock.request(`screen`)}catch{}try{await fn,await h(`settings`,`pending-song`,e);let{analyzeSong:n}=await w(async()=>{let{analyzeSong:e}=await import(`./import-song-CB94CR5x.js`);return{analyzeSong:e}},[]),i=await n(e.file,t.signal,r);t.signal.throwIfAborted(),e.sourceUrl&&(i.project.source_url=e.sourceUrl);let a={id:e.id,project:i.project};S(a.project),F(`cancel-import`).disabled=!0,r(`Salvataggio dello spartito`,.99),await Ln(await ne(a,e.file,i.stem)),yn(a.project.events.length?`Spartito pronto per la modifica.`:`Nessun colpo rilevato. Puoi aggiungerlo sul rigo.`)}catch(e){if(t.signal.aborted)await _(),yn(`Importazione annullata.`);else throw e}finally{ln=null,n.close(),await i?.release(),window.location.hash&&window.location.hash!==`#repertorio`||await en.render()}}F(`cancel-import`).onclick=()=>ln?.abort(),F(`import-progress`).oncancel=e=>{e.preventDefault(),F(`cancel-import`).disabled||ln?.abort()};var Vn=Tt({pause:Q,async importFile(e,t){try{if(/\.midi?$/i.test(e.name)||/audio\/(x-)?midi/i.test(e.type)){let{midiScore:n}=await w(async()=>{let{midiScore:e}=await import(`./midi-import-D59-PdqX.js`);return{midiScore:e}},__vite__mapDeps([2,1])),r=await n(e);t&&(r.source_url=t),S(r);let i={id:crypto.randomUUID(),project:r};await Ln(await h(`scores`,i.id,i))}else await Bn({id:crypto.randomUUID(),file:e,sourceUrl:t})}catch(e){Y(e)}}});function Hn(e){return yt({user:e,pause:Q,notify:yn,active:()=>L,sourceLink:()=>I?.source_url,create:Vn,resume:Bn,openDemo:async()=>{let e=await u(`scores`,`pocket-study`);e||=await h(`scores`,`pocket-study`,{id:`pocket-study`,project:fe()}),await Ln(e)},barInfo:()=>{let e=_n(),t=R.bars[e];return{time:t.start,number:t.number,max:e+1}},numberBar:async e=>{await fn;let t=N(),n=e===null?R.firstComplete:pe(I,t,e);if(await On(()=>kn(I.events,B,I.grid??16,{first_numbered_bar:n})),I.first_numbered_bar!==n)throw Error(`Impossibile salvare la numerazione.`);$(t),en.go(`studio`)},open:async e=>{await fn,e.id===L&&m(e)===$t?en.go(`studio`):await Ln(e)}})}F(`project-file`).onchange=X(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n;try{n=JSON.parse(await t.text())}catch{throw Error(`Scegli un file progetto .drums.`)}S(n);let r={id:crypto.randomUUID(),project:n};await Ln(await h(`scores`,r.id,r))}),F(`audio-file`).onchange=X(async e=>{let t=e.target.files[0];if(e.target.value=``,!t)return;let n=L,r=(mn.get(n)??Promise.resolve()).catch(()=>{}).then(async()=>{let e=await Kt(t);await h(`audio`,n,t),L===n&&(Q(),U=e,G=!0,K=!1,W=t.name,Z())});mn.set(n,r);try{await r}finally{mn.get(n)===r&&mn.delete(n)}}),F(`source`).onclick=X(zn),F(`close`).onclick=()=>F(`dialog`).close(),F(`dialog`).onclick=e=>{if(e.target===F(`dialog`)){let t=e.target.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&e.target.close()}},F(`play`).onclick=X(wn),F(`rewind`).onclick=()=>$(R.bars[_n()].start),F(`seek`).oninput=e=>$(+e.target.value),F(`loop`).onclick=()=>{H=H===null?_n():null,P()&&Yt(I.events,N(),vn()),Z()},F(`studio`).onclick=X(()=>En(!1)),F(`live`).onclick=X(()=>En(!0)),F(`previous`).onclick=()=>$(R.bars[Math.max(0,z-J())].start),F(`next`).onclick=()=>$(R.bars[Math.min(R.bars.length-1,z+J())].start),F(`grid`).onclick=()=>In(`Griglia spartito`,[8,16,32].map(e=>({text:`1/`+e,icon:`settings-2`,detail:(I.grid??16)===e?`Attiva`:``,go:()=>On(()=>{if((I.grid??16)!==e)return kn(I.events,B,e)})}))),F(`undo`).onclick=()=>jn(),F(`redo`).onclick=()=>jn(!0),F(`remove`).onclick=Mn,F(`instrument`).onchange=e=>{let t=gn(),n=e.target.value;t&&(Nn(t,n),Gt(n).catch(Y))},document.onkeydown=e=>{!I||document.body.classList.contains(`section-open`)||F(`create-sheet`).open||[`INPUT`,`SELECT`,`TEXTAREA`].includes(e.target.tagName)||F(`dialog`).open||F(`import-progress`).open||(e.code===`Space`&&e.target.tagName!==`BUTTON`&&(e.preventDefault(),X(wn)()),!V&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`z`&&(e.preventDefault(),jn(e.shiftKey)),!V&&[`Backspace`,`Delete`].includes(e.key)&&(e.preventDefault(),Mn()))},Qt.onchange=()=>{I&&(z=Math.floor(_n()/J())*J(),Z())},document.addEventListener(`visibilitychange`,()=>{document.hidden&&I&&Q()});async function Un(){let e=await qe().catch(e=>(Y(e),null));a(e?.id??null),en=Hn(e),[`#studio`,`#numerazione`].includes(window.location.hash)&&window.history.replaceState(null,``,window.location.pathname+window.location.search),await en.render(),window.addEventListener(`score-conflict`,()=>yn(`Due versioni modificate. Trovi la copia locale nel repertorio.`)),window.addEventListener(`remote-score`,async e=>{if(e.detail!==L||(await fn,L!==e.detail))return;let t=await u(`scores`,L);if(t&&m(t)!==$t){if(P()){yn(`Versione aggiornata disponibile nel repertorio.`);return}await Ln(t,!1)}}),pt()}Un().catch(Y);export{ve as i,w as n,ye as r,Pt as t};