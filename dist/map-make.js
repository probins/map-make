import{m as t,$ as s}from"./mapDef-32126832.js";let o,a=!1;function e(t,o){console.log(t);const a=`Unable to load ${o} module(s)`;s("#status").innerHTML=a,s("#status").style.display=""}t.init().then(async t=>{o=t,o.rasters&&await async function(){const t=[import("./rasters-f91a0263.js").then((function(t){return t.a}))];let s;o.rasters.forEach(o=>{s="object"==typeof o?Object.keys(o)[0]:o,t.push(import("./registry/sources/"+s+".js"))});try{const s=await Promise.all(t);if(s){s.shift().default.addInitial(s,o)}}catch(t){e(t,"raster"),a=!0}}(),o.vectors&&await async function(){try{(await import("./vectors-2b27bbf4.js").then((function(t){return t.f}))).default.addInitial(o)}catch(t){e(t,"vector"),a=!0}}(),o.components&&o.components.forEach(t=>{try{import("./registry/components/"+t+".js")}catch(t){e(t,"component"),a=!0}}),o.rasters||o.vectors||await async function(){try{await import("./registry/components/toolbar.js");s("#slide-toggle").dispatchEvent(new MouseEvent("click"))}catch(t){e(t,"toolbar"),a=!0}}(),a||o.vectors&&!o.center&&!o.zoom||(s("#status").style.display="none")}).catch(t=>e(t,"mapdef"));
