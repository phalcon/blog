import{t as e}from"./preload-helper.CxFQXtKk.js";var t;async function n(){return t===void 0&&(t=await e(()=>import(new URL(`pagefind/pagefind.js`,window.location.origin).href),[])),t}var r=document.getElementById(`header-search-input`),i=document.getElementById(`header-search-results`),a=document.getElementById(`articles`);if(r&&i&&a){let e,t=e=>`
            <div class="phalcon-blog__item">
                <div class="phalcon-blog__item-content">
                    <div class="phalcon-blog__item-title">
                        <a href="${e.url.replace(/\/index\.html$/,`/`).replace(/\.html$/,``)}">${e.meta.title??`Untitled`}</a>
                    </div>
                    ${e.meta.date?`<div class="phalcon-blog__item-date">${e.meta.date}</div>`:``}
                    <div class="phalcon-blog__item-article">${e.excerpt}</div>
                </div>
            </div>
        `,o=async e=>{let r=await(await n()).search(e),o=await Promise.all(r.results.slice(0,10).map(e=>e.data()));a.innerHTML=o.length>0?o.map(t).join(``):`<p>No results found.</p>`,i.hidden=!1};r.addEventListener(`input`,()=>{let t=r.value.trim();if(clearTimeout(e),t.length===0){i.hidden=!0,a.innerHTML=``;return}e=setTimeout(()=>{o(t).catch(()=>{i.hidden=!0})},150)}),document.addEventListener(`click`,e=>{e.target instanceof Node&&!i.contains(e.target)&&e.target!==r&&(i.hidden=!0)}),r.addEventListener(`keydown`,e=>{e.key===`Escape`&&(i.hidden=!0,r.focus())})}