import{TileGrid as e,TileLayer as t,TileWMS as o}from"../../../../deps.js";import r from"../../../projections/3763.js";const s=[-17e4,-325e3,18e4,29e4],n=[1191.40625,595.703125,297.8515625,148.92578125,74.462890625,37.2314453125],c=["sc2500k","sc2500k","sc1500k","sc1500k","sc1500k","sc500k","sc200k","sc200k","sc100k","sc100k","sc50k","sc50k"],i="http://mapas.dgterritorio.pt/wms/",p=new t({source:new o({url:i+c[0]+"?",params:{LAYERS:c[0]},attributions:'Topo maps &copy; <a target="_blank" href="http://mapas.dgterritorio.pt/">DGT</a>',extent:s,projection:r.projCode,tileGrid:new e({extent:s,resolutions:n})}),id:"DGT (PT)"});function a(e){p.get("source").updateParams({LAYERS:c[e]}),p.get("source").setUrl(i+c[e]+"?")}export default{getLayers:function(e){return e&&e.zoom&&a(e.zoom),[p]},extent:s,projCode:r.projCode,resolutions:n,viewEvent:{type:"change:resolution",func:function(e){a(n.indexOf(e.target.get("resolution")))}}};