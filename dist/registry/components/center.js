import t from"./center.htm.js";import e from"./component.js";import{$ as o}from"../../utils.js";import"./toolbar.js";import{transform as n}from"../../deps.js";import r from"../../olMap.js";const s=new e(t,"center");o("#components-content").appendChild(s.getTemplate("center"));const m=r.get();o("#setLatLon").addEventListener("click",(()=>{let t=[parseFloat(o("#lon").value),parseFloat(o("#lat").value)];const e=m.get("view");t=n(t,"EPSG:4326",e.getProjection());const r=e.extent;r[0]<=t[0]&&t[0]<=r[2]&&r[1]<=t[1]&&t[1]<=r[3]?(e.setCenter(t),e.setZoom(e.zoomIn)):alert("Coordinate outside map extent")}));