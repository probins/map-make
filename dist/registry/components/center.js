import e from"./center.htm.js";import t from"./component.js";var o=new t(e,"center");import r from"../../utils.js";var n=r.$;import"./toolbar.js";n("#components-content").appendChild(o.getTemplate("center"));import a from"../../ext/ol.js";import i from"../../olMap.js";var m=i.get();n("#setLatLon").addEventListener("click",(function(){var e=[parseFloat(n("#lon").value),parseFloat(n("#lat").value)];e=a.proj.transform(e,"EPSG:4326",m.get("view").getProjection());var t=m.get("view").extent;t[0]<=e[0]&&e[0]<=t[2]&&t[1]<=e[1]&&e[1]<=t[3]?(m.get("view").setCenter(e),m.get("view").setZoom(m.get("view").zoomIn)):alert("Coordinate outside map extent")}));