import t from"../../common.js";import e from"../../../projections/25830.js";const o=[-1079526.585009098,2450926.618387835,1462559.4951461395,5127818.100512035],r=[2445.984905625,1222.9924528125,611.49622640625,305.748113203125,152.8740566015625,76.4370282999999,38.21851415,19.109257075,9.55462853749999,4.77731426875,2.388657134375,1.1943285671875],s={type:"WMTS",extent:o,id:"IGN Mapas",sourceOptions:{url:"https://www.ign.es/wmts/mapa-raster?",layer:"MTN",matrixSet:e.projCode,projection:e.projCode,style:"default",attributions:'Map base: &copy; <a href="http://www.ign.es/" target="_blank">Instituto Geográfico Nacional de España</a>'},tileGridOptions:{extent:o,sizes:[[5,-8],[10,-15],[20,-29],[40,-57],[79,-114],[158,-228],[315,-456],[630,-911],[1259,-1821],[2517,-3641],[5034,-7283],[10067,-14565]],origins:[[-1968157.095,7827955],[-1968157.095,7514869],[-1968157.095,7358326],[-1968157.095,7280055],[-1968157.095,7280055],[-1968157.095,7280055],[-1968157.095,7280055],[-1968157.095,7275163],[-1968157.095,7272717],[-1968157.095,7271494],[-1968157.095,7272105],[-1968157.095,7271800]],resolutions:r,matrixIds:[5,6,7,8,9,10,11,12,13,14,15,16]}};export default{getLayers:function(){return t(s)},extent:o,projCode:e.projCode,resolutions:r};