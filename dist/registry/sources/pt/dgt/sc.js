import e from"../../../../ext/ol.js";import t from"../../../projections/3763.js";var r=[-17e4,-325e3,18e4,29e4];var o=[1191.40625,595.703125,297.8515625,148.92578125,74.462890625,37.2314453125];var s=["sc2500k","sc2500k","sc1500k","sc1500k","sc1500k","sc500k","sc200k","sc200k","sc100k","sc100k","sc50k","sc50k"];var i="http://mapas.dgterritorio.pt/wms/";var a={url:i+s[0]+"?",params:{LAYERS:s[0]},attributions:'Topo maps &copy; <a target="_blank" href="http://mapas.dgterritorio.pt/">DGT</a>',extent:r,projection:t.projCode,tileGrid:new e.tilegrid.TileGrid({extent:r,resolutions:o})};var n=new e.layer.Tile({source:new e.source.TileWMS(a),id:"DGT (PT)"});function c(e){n.get("source").updateParams({LAYERS:s[e]});n.get("source").setUrl(i+s[e]+"?")}export default{getLayers:function(e){if(e){if(e.zoom){c(e.zoom)}}return[n]},extent:r,projCode:t.projCode,resolutions:o,viewEvent:{type:"change:resolution",func:function(e){c(o.indexOf(e.target.get("resolution")))}}};