import{C as e,o as t}from"../../olMap-8ffb7ea3.js";import{$ as a,m as n}from"../../mapDef-32126832.js";import"./toolbar.js";import{aE as o}from"../../size-aa14a1dc.js";const i=new e('\n<template id="mapdeftemplate">\n  <div>A map definition is a file containing the options needed to recreate a map. Click on the Create MapDef button and save as a file. You can then either incorporate that file into the map program or enter the URL below to recreate the same map without entering the options individually.</div>\n  <button id="createMapDef">Create MapDef</button>\n  <textarea rows="5" id="mapDefOP"></textarea>\n  <input type="text" id="mapdefurl" size="60" placeholder="Enter URL of mapDef">\n</template>\n',"mapdef");a("#mapDef-content").appendChild(i.getTemplate("mapdef"));const r=t.get();a("#mapdefurl").addEventListener("change",(function(){window.location.search="mapDef="+this.value})),a("#createMapDef").addEventListener("click",()=>{const e=n.get(),t=r.get("view"),i=o(t.get("center"),t.getProjection(),"EPSG:4326");e.center={lat:i[1],lon:i[0]},e.zoom=t.getZoom(),a("#mapDefOP").value=JSON.stringify(e)});
