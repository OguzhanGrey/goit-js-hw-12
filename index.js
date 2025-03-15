import{a as g,i as f,S as b}from"./assets/vendor-DtRopbQG.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=l(t);fetch(t.href,e)}})();const L=document.querySelector("#button"),m=document.querySelector("#input"),p=document.querySelector(".gallery"),w="49258483-ada97ff0ca07db67d4b766dd0",a=document.querySelector(".loader"),r=document.querySelector("#load-button");let v=p.getBoundingClientRect(),y=1,u="",d,n=0;L.addEventListener("click",async()=>{const s=m.value.trim();s!==""&&(a.style.display="block",s!==u&&(y=1,n=0,p.innerHTML=""),u=s,await h())});r.addEventListener("click",async()=>{a.style.display="inline-block",y++,await h(),window.scrollBy({top:v.top*7.3,behavior:"smooth"})});async function h(){var i,l;const s=`https://pixabay.com/api/?key=${w}&q=${encodeURIComponent(u)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${y}`;try{const{data:o}=await g.get(s);if(a.style.display="none",o.hits.length===0)throw new Error("Sorry, no images found! Please try another query.");n+=o.hits.length,n>=o.totalHits?(r.style.display="none",f.info({title:"Info",message:"We're sorry, but you've reached the end of search results",position:"topRight",timeout:3e3})):r.style.display="inline-block";const t=o.hits.map(e=>`
        <li class="gallery-item">
          <div class="photo-cards">
            <ul class="photo-information">
              <li class="photo-information-list"><b>Likes:</b> ${e.likes}</li>
              <li class="photo-information-list"><b>Views:</b> ${e.views}</li>
              <li class="photo-information-list"><b>Comments:</b> ${e.comments}</li>
              <li class="photo-information-list"><b>Downloads:</b> ${e.downloads}</li>
            </ul>
          </div>
          <a class="gallery-link" href="${e.largeImageURL}">
            <img class="gallery-image" src="${e.webformatURL}" 
                 data-source="${e.largeImageURL}" alt="${e.tags}" />
          </a>
        </li>`).join("");p.insertAdjacentHTML("beforeend",t),m.value="",d?d.refresh():d=new b(".gallery a",{captionDelay:250,captionsData:"alt"}),n>=o.totalHits?r.style.display="none":r.style.display="inline-block"}catch(o){a.style.display="none",f.error({title:"Error",message:((l=(i=o.response)==null?void 0:i.data)==null?void 0:l.message)||o.message,position:"topRight",timeout:5e3})}}
//# sourceMappingURL=index.js.map
