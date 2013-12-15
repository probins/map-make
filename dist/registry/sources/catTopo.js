
/** 
 * Catalan Topo WMS
 * EPSG:25831
 * http://www.icc.cat/eng/Home-ICC/Digital-geoinformation/Online-services-Geoservices/Quick-WMS-WMTS-of-raster-cartography
 * FIXME id and attribution English
 */
var ol=require("ol"),proj=require("../projections/25831"),extent=[258e3,4485e3,536e3,4752e3];module.exports={getLayers:function(){return[new ol.layer.Tile({source:new ol.source.TileWMS({url:"http://mapcache.icc.cat/map/bases/service?",attributions:[new ol.Attribution({html:'Cartographic base from <a target="_blank" href="http://www.icc.cat/">Institut Cartogràfic de Catalunya</a>'})],params:{VERSION:"1.1.1",LAYERS:"topo"},extent:extent,projection:proj.projCode}),id:"Catalan topos"})]},extent:extent,projCode:proj.projCode,resolutions:[1100,550,275,100,50,25,10,5,2,1,.5,.25]};
//# sourceMappingURL=dist/registry/sources/catTopo.js.map