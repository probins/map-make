(()=>{const e={tag:"3.2.0",css:"css/map-make.css",font:"font/fontello.woff2"};const t=document.createDocumentFragment(),n=document.currentScript,s=n.getAttribute("src");let o=s.substring(0,s.lastIndexOf("/")+1);const a=JSON.parse(n.getAttribute("data-configVars"));for(const t in a)switch(t){case"css":e.font=a[t].replace(e.css,e.font),e.css=a[t];break;case"baseURL":o=a[t]}0===o.indexOf(".")&&(o=new URL(o,document.baseURI).href),-1!==o.indexOf("master")&&(o=o.replace("master",e.tag));let c=document.createElement("link");c.rel="preload",c.href=0==e.css.indexOf("h")?e.font:o+e.font,c.as="font",c.type="font/woff2",c.setAttribute("crossorigin",""),t.appendChild(c),c=document.createElement("link"),c.rel="stylesheet",c.href=0==e.css.indexOf("h")?e.css:o+e.css,c.onload=()=>{const e=document.createElement("div");e.id="status",e.innerHTML='<i class="fa fa-spinner fa-pulse fa-5x"></i>',document.body.appendChild(e)},t.appendChild(c),document.head.appendChild(t),window.addEventListener("load",(()=>{import(`${o}map-make.js`).catch((e=>{console.log(e),document.body.innerHTML="Error loading module(s)"}))}))})();
