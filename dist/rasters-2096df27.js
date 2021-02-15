import{aF as e}from"./size-aa14a1dc.js";import{C as t,o as n}from"./olMap-5f1c27bb.js";import o from"./registry/components/toolbar.js";import{$ as i}from"./mapDef-32126832.js";const r=new t('\n<template id="layerswitchertemplate">\n  <style>\n    #layerswitchcontainer {\n      border:1px double #D2D8DE;\n    }\n    #layerswitchtitle {\n      background-color: #3fb;\n      text-align: center;\n    }\n  </style>\n  <div id="layerswitchcontainer">\n    <div id="layerswitchtitle"><i>Layer Switcher</i></div>\n    <div id="layerswitch"></div>\n  </div>\n</template>\n\n<template id="rasterstemplate">\n  <div><i>Rasters</i></div>\n  <div id="rasters"></div>\n</template>\n\n<template id="vectorstemplate">\n  <div><i>Vectors</i></div>\n  <div id="vectors"></div>\n</template>\n'),a=r.getTemplate("layerswitcher"),s=a.getElementById("layerswitch"),l=r.getTemplate("rasters"),c=l.getElementById("rasters"),d=r.getTemplate("vectors"),v=d.getElementById("vectors"),m={rasters:!1,vectors:!1,ls:!1};function u(){m.ls||(o.querySelector("#layers-content").appendChild(a),m.ls=!0)}var p={addRasterDiv:function(e){const t=document.createElement("input");t.name="rasters",t.value=e.getProperties().id,t.id=t.value.replace(/ |\(|\)/g,""),t.type="radio";const n=document.createElement("label");n.htmlFor=n.innerHTML=t.value,n.style.verticalAlign="bottom";const o=document.createElement("div");return o.appendChild(t),o.appendChild(n),c.appendChild(o),m.rasters?u():(t.checked=!0,s.appendChild(l),m.rasters=!0),o},addVectorDiv:function(e){const t=document.createElement("input");t.name=t.id=t.value=e.id,t.type="checkbox",t.checked=!e.noDisplay;const n=document.createElement("label");n.htmlFor=n.innerHTML=t.value,n.style.verticalAlign="baseline";const o=document.createElement("div");o.appendChild(t),o.appendChild(n),v.appendChild(o);let i=!1;return m.vectors||(s.appendChild(d),m.vectors=!0,i=!0),u(),[o,i]}};const g=n.get(),f=new t('\n<template id="zoomtemplate">\n  <style>\n    #zoomContainer {\n      position: absolute;\n      top: 80px;\n      left: 10px;\n      font-size: 1em;\n    }\n  </style>\n  <div id="zoomContainer" title="Zoom level">\n    <select id="zoomLevel" name="zoomLevel"></select>\n  </div>\n</template>\n').getTemplate("zoom");n.addControl(f);const h=document.querySelector("#zoomLevel");h.addEventListener("change",(function(){g.get("view").setZoom(h.value),this.blur()}));var y=function(){for(let e=0;e<g.get("view").zoomLevels;e++){const t=document.createElement("option");t.value=e,t.text=e,h.appendChild(t)}h.value=Math.round(g.get("view").getZoom()),g.get("view").on("change:resolution",e=>{h.value=Math.round(g.get("view").getZoom())})};const E=n.get();function w(){return E.getLayers().item(0).get("layers")}function b(e){const t=document.getElementById(e.target.htmlFor)||e.target;if(!t.value)return;L.bind(this)(t.value)}function L(t){const o=this.getLayers().item(0).get("layers").getArray(),r=o.filter((function(e){return!0===e.activeLayer})),a=o.filter((function(e){return e.getProperties().id==t}));r.forEach(e=>{e.set("visible",!1),e.activeLayer=!1}),a.forEach(e=>{e.set("visible",!0),e.activeLayer=!0});const s=a[0].get("source").getProjection(),l=s?s.getCode():"EPSG:3857",c=this.getLayers().item(1).get("layers"),d=0===c.get("length")?"":"EPSG:4326",v=r[0]?r[0].get("source").getProjection().getCode():d;if(l!=v){let t;if(""!==v){const n=this.get("view").calculateExtent();t=e(n,v,l),c.forEach(e=>{e.get("source").getFeatures().forEach(e=>{e.getGeometry().transform(v,l)})})}const o=i(".projcursor");o&&(o.style.display="EPSG:4326"==l?"none":""),this.set("view",n.views[l]),y(),""!==v&&this.get("view").fit(t)}}function C(t,o){o=o||{},t.forEach((t,i)=>{const r=(t=t.default).projCode||"EPSG:3857",a=n.views;if(!a[r])if(a[r]=n.createView(o,r,t.extent,t.resolutions),a[r].extent=t.extent||e([-180,-85,180,85],"EPSG:4326",r),a[r].zoomLevels=t.resolutions?t.resolutions.length:20,t.resolutions){const e=t.resolutions.reduce((function(e,t){return Math.abs(t-5)<Math.abs(e-5)?t:e}));a[r].zoomIn=t.resolutions.indexOf(e)}else a[r].zoomIn=15;let s,l;if(o.rasters&&"object"==typeof o.rasters[i])for(l in o.rasters[i])s=o.rasters[i][l];const c=t.getLayers({zoom:o.zoom,apikey:s});c.forEach(e=>{e.set("visible",!1),e.activeLayer=!1,w().push(e)});p.addRasterDiv(c[0]).addEventListener("click",b.bind(E)),t.viewEvent&&a[r].on(t.viewEvent.type,t.viewEvent.func)})}function z(){w().forEach(e=>{!0===e.activeLayer&&e.set("visible",!0)})}var x={addInitial:function(e,t){C(e,t);const o=e[0].default.projCode||"EPSG:3857";E.set("view",n.views[o]),w().item(0).activeLayer=!0,y(),t.vectors||z()},add:C,changeLayer:L,makeActiveLayerVisible:z,getLayers:w},j=Object.freeze({__proto__:null,default:x});export{j as a,x as r,p as s};
