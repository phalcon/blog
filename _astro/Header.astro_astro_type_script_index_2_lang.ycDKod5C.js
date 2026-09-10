import{t as e}from"./preload-helper.CxFQXtKk.js";function t(e){return e.replace(/\/index\.html$/,`/`).replace(/\.html$/,``)}var n;async function r(){return n===void 0&&(n=await e(()=>import(new URL(`pagefind/pagefind.js`,window.location.origin).href),[])),n}var i=document.getElementById(`header-search-input`),a=document.getElementById(`header-search-results`),o=document.getElementById(`articles`);if(i&&a&&o){let e,n=e=>`
            <div class="phalcon-blog__item">
                <div class="phalcon-blog__item-content">
                    <div class="phalcon-blog__item-title">
                        <a href="${t(e.url)}">${e.meta.title??`Untitled`}</a>
                    </div>
                    ${e.meta.date?`<div class="phalcon-blog__item-date">${e.meta.date}</div>`:``}
                    <div class="phalcon-blog__item-article">${e.excerpt}</div>
                </div>
            </div>
        `,s=async e=>{let t=await(await r()).search(e),i=await Promise.all(t.results.slice(0,10).map(e=>e.data()));o.innerHTML=i.length>0?i.map(n).join(``):`<p>No results found.</p>`,a.hidden=!1};i.addEventListener(`input`,()=>{let t=i.value.trim();if(clearTimeout(e),t.length===0){a.hidden=!0,o.innerHTML=``;return}e=setTimeout(()=>{s(t).catch(()=>{a.hidden=!0})},150)}),document.addEventListener(`click`,e=>{e.target instanceof Node&&!a.contains(e.target)&&e.target!==i&&(a.hidden=!0)}),i.addEventListener(`keydown`,e=>{e.key===`Escape`&&(a.hidden=!0,i.focus())})}