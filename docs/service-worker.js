(()=>{"use strict";var e={923:()=>{try{self["workbox:core:5.1.4"]&&_()}catch(e){}},190:()=>{try{self["workbox:expiration:5.1.4"]&&_()}catch(e){}},437:()=>{try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}},185:()=>{try{self["workbox:routing:5.1.4"]&&_()}catch(e){}},833:()=>{try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{s(923);const e=function(e){let t=e;for(var s=arguments.length,n=new Array(s>1?s-1:0),a=1;a<s;a++)n[a-1]=arguments[a];return n.length>0&&(t+=` :: ${JSON.stringify(n)}`),t};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const n=new Set;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},r=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i={updateDetails:e=>{(e=>{for(const t of Object.keys(a))e(t)})((t=>{"string"===typeof e[t]&&(a[t]=e[t])}))},getGoogleAnalyticsName:e=>e||r(a.googleAnalytics),getPrecacheName:e=>e||r(a.precache),getPrefix:()=>a.prefix,getRuntimeName:e=>e||r(a.runtime),getSuffix:()=>a.suffix};const c=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),""),o=(e,t)=>e.filter((e=>t in e)),h=async e=>{let{request:t,mode:s,plugins:n=[]}=e;const a=o(n,"cacheKeyWillBeUsed");let r=t;for(const i of a)r=await i.cacheKeyWillBeUsed.call(i,{mode:s,request:r}),"string"===typeof r&&(r=new Request(r));return r},l=async e=>{let{cacheName:t,request:s,event:n,matchOptions:a,plugins:r=[]}=e;const i=await self.caches.open(t),c=await h({plugins:r,request:s,mode:"read"});let o=await i.match(c,a);for(const h of r)if("cachedResponseWillBeUsed"in h){const e=h.cachedResponseWillBeUsed;o=await e.call(h,{cacheName:t,event:n,matchOptions:a,cachedResponse:o,request:c})}return o},u=async e=>{let{cacheName:s,request:a,response:r,event:i,plugins:u=[],matchOptions:d}=e;const p=await h({plugins:u,request:a,mode:"write"});if(!r)throw new t("cache-put-with-no-response",{url:c(p.url)});const f=await(async e=>{let{request:t,response:s,event:n,plugins:a=[]}=e,r=s,i=!1;for(const c of a)if("cacheWillUpdate"in c){i=!0;const e=c.cacheWillUpdate;if(r=await e.call(c,{request:t,response:r,event:n}),!r)break}return i||(r=r&&200===r.status?r:void 0),r||null})({event:i,plugins:u,response:r,request:p});if(!f)return void 0;const g=await self.caches.open(s),m=o(u,"cacheDidUpdate"),w=m.length>0?await l({cacheName:s,matchOptions:d,request:p}):null;try{await g.put(p,f)}catch(y){throw"QuotaExceededError"===y.name&&await async function(){for(const e of n)await e()}(),y}for(const t of m)await t.cacheDidUpdate.call(t,{cacheName:s,event:i,oldResponse:w,newResponse:f,request:p})},d=l;let p;function f(e){e.then((()=>{}))}class g{constructor(e,t){let{onupgradeneeded:s,onversionchange:n}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let s=!1;setTimeout((()=>{s=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"===typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e){let{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return await this.transaction([e],"readonly",((i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(r?e:e.value),a&&l.length>=a?c(l):e.continue()):c(l)}}))}async transaction(e,t,s){return await this.open(),await new Promise(((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,(e=>n(e)))}))}async _call(e,t,s){for(var n=arguments.length,a=new Array(n>3?n-3:0),r=3;r<n;r++)a[r-3]=arguments[r];return await this.transaction([t],s,((s,n)=>{const r=s.objectStore(t),i=r[e].apply(r,a);i.onsuccess=()=>n(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}g.prototype.OPEN_TIMEOUT=2e3;const m={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[s,G]of Object.entries(m))for(const e of G)e in IDBObjectStore.prototype&&(g.prototype[e]=async function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];return await this._call(e,t,s,...a)});const w=async e=>{let{request:s,fetchOptions:n,event:a,plugins:r=[]}=e;if("string"===typeof s&&(s=new Request(s)),a instanceof FetchEvent&&a.preloadResponse){const e=await a.preloadResponse;if(e)return e}const i=o(r,"fetchDidFail"),c=i.length>0?s.clone():null;try{for(const e of r)if("requestWillFetch"in e){const t=e.requestWillFetch,n=s.clone();s=await t.call(e,{request:n,event:a})}}catch(l){throw new t("plugin-error-request-will-fetch",{thrownError:l})}const h=s.clone();try{let e;e="navigate"===s.mode?await fetch(s):await fetch(s,n);for(const t of r)"fetchDidSucceed"in t&&(e=await t.fetchDidSucceed.call(t,{event:a,request:h,response:e}));return e}catch(u){0;for(const e of i)await e.fetchDidFail.call(e,{error:u,event:a,originalRequest:c.clone(),request:h.clone()});throw u}};async function y(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,r=function(){if(void 0===p){const t=new Response("");if("body"in t)try{new Response(t.body),p=!0}catch(e){p=!1}p=!1}return p}()?s.body:await s.blob();return new Response(r,a)}s(190);const _="cache-entries",v=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class R{constructor(e){this._cacheName=e,this._db=new g("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(_,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const s={url:e=v(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(_,s)}async getTimestamp(e){return(await this._db.get(_,this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction(_,"readwrite",((s,n)=>{const a=s.objectStore(_).index("timestamp").openCursor(null,"prev"),r=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else n(r)}})),n=[];for(const a of s)await this._db.delete(_,a.id),n.push(a.url);return n}_getId(e){return this._cacheName+"|"+v(e)}}class x{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new R(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,f(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(437);const q=[],U={get:()=>q,add(e){q.push(...e)}};const N="__WB_REVISION__";function b(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set(N,s),{cacheKey:a.href,url:r.href}}class T{constructor(e){this._cacheName=i.getPrecacheName(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const s=[];for(const n of e){"string"===typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=b(n),r="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install(){let{event:e,plugins:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const s=[],n=[],a=await self.caches.open(this._cacheName),r=await a.keys(),i=new Set(r.map((e=>e.url)));for(const[o,h]of this._urlsToCacheKeys)i.has(h)?n.push(o):s.push({cacheKey:h,url:o});const c=s.map((s=>{let{cacheKey:n,url:a}=s;const r=this._cacheKeysToIntegrities.get(n),i=this._urlsToCacheModes.get(a);return this._addURLToCache({cacheKey:n,cacheMode:i,event:e,integrity:r,plugins:t,url:a})}));await Promise.all(c);return{updatedURLs:s.map((e=>e.url)),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache(e){let{cacheKey:s,url:n,cacheMode:a,event:r,plugins:i,integrity:c}=e;const o=new Request(n,{integrity:c,cache:a,credentials:"same-origin"});let h,l=await w({event:r,plugins:i,request:o});for(const t of i||[])"cacheWillUpdate"in t&&(h=t);if(!(h?await h.cacheWillUpdate({event:r,request:o,response:l}):l.status<400))throw new t("bad-precaching-response",{url:n,status:l.status});l.redirected&&(l=await y(l)),await u({event:r,plugins:i,response:l,request:s===n?o:new Request(s),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return async s=>{let{request:n}=s;try{const e=await this.matchPrecache(n);if(e)return e;throw new t("missing-precache-entry",{cacheName:this._cacheName,url:n instanceof Request?n.url:n})}catch(a){if(e)return fetch(n);throw a}}}createHandlerBoundToURL(e){let s=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),a=new Request(e);return()=>n({request:a})}}let E;const L=()=>(E||(E=new T),E);const K=(e,t)=>{const s=L().getURLsToCacheKeys();for(const n of function(e){let{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function*(){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}()}(e,t)){const e=s.get(n);if(e)return e}},C=function(){let{ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const a=i.getPrecacheName();self.addEventListener("fetch",(r=>{const i=K(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!i)return void 0;let c=self.caches.open(a).then((e=>e.match(i))).then((e=>e||fetch(i)));r.respondWith(c)}))};let M=!1;const A=e=>{const t=L(),s=U.get();e.waitUntil(t.install({event:e,plugins:s}).catch((e=>{throw e})))},O=e=>{const t=L();e.waitUntil(t.activate())};s(185);const S=e=>e&&"object"===typeof e?e:{handle:e};class k{constructor(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";this.handler=S(t),this.match=e,this.method=s}}class W extends k{constructor(e,t,s){super((t=>{let{url:s}=t;const n=e.exec(s.href);if(n&&(s.origin===location.origin||0===n.index))return n.slice(1)}),t,s)}}class D{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((e=>{"string"===typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest(e){let{request:t,event:s}=e;const n=new URL(t.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const{params:a,route:r}=this.findMatchingRoute({url:n,request:t,event:s});let i=r&&r.handler;if(!i&&this._defaultHandler&&(i=this._defaultHandler),!i)return void 0;let c;try{c=i.handle({url:n,request:t,event:s,params:a})}catch(o){c=Promise.reject(o)}return c instanceof Promise&&this._catchHandler&&(c=c.catch((e=>this._catchHandler.handle({url:n,request:t,event:s})))),c}findMatchingRoute(e){let{url:t,request:s,event:n}=e;const a=this._routes.get(s.method)||[];for(const r of a){let e;const a=r.match({url:t,request:s,event:n});if(a)return e=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"===typeof a)&&(e=void 0),{route:r,params:e}}return{}}setDefaultHandler(e){this._defaultHandler=S(e)}setCatchHandler(e){this._catchHandler=S(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let P;const I=()=>(P||(P=new D,P.addFetchListener(),P.addCacheListener()),P);function H(e,s,n){let a;if("string"===typeof e){const t=new URL(e,location.href);0;a=new k((e=>{let{url:s}=e;return s.href===t.href}),s,n)}else if(e instanceof RegExp)a=new W(e,s,n);else if("function"===typeof e)a=new k(e,s,n);else{if(!(e instanceof k))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return I().registerRoute(a),a}s(833);const F={cacheWillUpdate:async e=>{let{response:t}=e;return 200===t.status||0===t.status?t:null}};var j;self.addEventListener("activate",(()=>self.clients.claim())),function(e){L().addToCacheList(e),e.length>0&&(self.addEventListener("install",A),self.addEventListener("activate",O))}([{'revision':'31b36cf9b20b0a9d99801af5bc6ba677','url':'/tca-farkle/index.html'},{'revision':null,'url':'/tca-farkle/static/css/main.d923b91f.css'},{'revision':null,'url':'/tca-farkle/static/js/186.80f2ab56.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/225.2ea396a4.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/272.4c265bdf.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/372.df82a1a7.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/377.cafaffa1.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/572.3e96dd6b.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/573.0323a3ee.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/738.b4e266ab.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/841.f429fe43.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/856.542ae68d.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/862.796cdc81.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/883.acbb0cb2.chunk.js'},{'revision':null,'url':'/tca-farkle/static/js/main.bc9b6f51.js'},{'revision':null,'url':'/tca-farkle/static/media/farkleScoring.b8a00875e06fb14b8771.png'}]),function(e){M||(C(e),M=!0)}(j);const B=new RegExp("/[^/?]+\\.[^/]+$");var $;H((e=>{let{request:t,url:s}=e;return"navigate"===t.mode&&(!s.pathname.startsWith("/_")&&!s.pathname.match(B))}),($="/tca-farkle/index.html",L().createHandlerBoundToURL($))),H((e=>{let{url:t}=e;return t.origin===self.location.origin&&t.pathname.endsWith(".png")}),new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(this._cacheName=i.getRuntimeName(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[F,...e.plugins]}else this._plugins=[F];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle(e){let{event:s,request:n}=e;"string"===typeof n&&(n=new Request(n));const a=this._getFromNetwork({request:n,event:s});let r,i=await d({cacheName:this._cacheName,request:n,event:s,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(s)try{s.waitUntil(a)}catch(r){0}}else{0;try{i=await a}catch(c){r=c}}if(!i)throw new t("no-response",{url:n.url,error:r});return i}async _getFromNetwork(e){let{request:t,event:s}=e;const n=await w({request:t,event:s,fetchOptions:this._fetchOptions,plugins:this._plugins}),a=u({cacheName:this._cacheName,request:t,response:n.clone(),event:s,plugins:this._plugins});if(s)try{s.waitUntil(a)}catch(r){0}return n}}({cacheName:"images",plugins:[new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var t;this.cachedResponseWillBeUsed=async e=>{let{event:t,request:s,cacheName:n,cachedResponse:a}=e;if(!a)return null;const r=this._isResponseDateFresh(a),i=this._getCacheExpiration(n);f(i.expireEntries());const c=i.updateTimestamp(s.url);if(t)try{t.waitUntil(c)}catch(o){0}return r?a:null},this.cacheDidUpdate=async e=>{let{cacheName:t,request:s}=e;const n=this._getCacheExpiration(t);await n.updateTimestamp(s.url),await n.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),n.add(t))}_getCacheExpiration(e){if(e===i.getRuntimeName())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new x(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}))})()})();
//# sourceMappingURL=service-worker.js.map