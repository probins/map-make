import e from"./mapdef.htm.js";import t from"./component.js";var o=new t(e,"mapdef");import r from"../../utils.js";var a=r.$;import"./toolbar.js";a("#mapDef-content").appendChild(o.getTemplate("mapdef"));import m from"../../mapDef.js";import n from"../../ext/ol.js";import p from"../../olMap.js";var i=p.get();a("#mapdefurl").addEventListener("change",(function(){window.location.search="mapDef="+this.value}));a("#createMapDef").addEventListener("click",(function(){var e=m.get();var t=i.get("view");var o=n.proj.transform(t.get("center"),t.getProjection(),"EPSG:4326");e.center={lat:o[1],lon:o[0]};e.zoom=t.getZoom();a("#mapDefOP").value=JSON.stringify(e)}));