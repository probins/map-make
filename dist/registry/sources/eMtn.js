
/** 
 * Spanish IGN MTN WMS
 * EPSG:25830
 * http://www.ign.es/wms-inspire/mapa-raster?request=GetCapabilities&service=WMS
 * FIXME attribution/id English
 */
var ol=require("ol"),proj=require("../projections/25830"),extent=[-1e5,395e4,115e4,487e4];module.exports={getLayers:function(){return[new ol.layer.Tile({source:new ol.source.TileWMS({url:"http://www.idee.es/wms/MTN-Raster/MTN-Raster",attributions:[new ol.Attribution({html:'Cartographic base &copy; <a target="_blank" href="http://www.idee.es/">Instituto Geográfico Nacional de España</a>'})],params:{LAYERS:"mtn_rasterizado"},extent:extent,projection:proj.projCode}),id:"IGN topos"})]},extent:extent,projCode:proj.projCode,resolutions:[1800,900,450,225,120,50,25,10,4.5,3,2,1,.5]};
//# sourceMappingURL=dist/registry/sources/eMtn.js.map