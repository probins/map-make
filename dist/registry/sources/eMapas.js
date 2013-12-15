
/** 
 * Spanish IGN Topo WMTS
 * http://www.idee.es/web/guest/directorio-de-servicios?p_p_id=DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_tipoServicio=WMTS&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_supertipo=OGC&_DirServiciosIDEE_WAR_DirServiciosIDEEportlet_INSTANCE_d3Xf_descSrv=VISUALIZACION
 * EPSG:25830
 * FIXME attribution English
 * limited resolutions in 25830 - more in 3857
 */
var ol=require("ol"),proj=require("../projections/25830"),extent=[-87120,3849419,77e4,4879828],resolutions=[76.4370282999999,38.21851415,19.109257075,9.55462853749999,4.77731426875,2.388657134375,1.1943285671875];module.exports={getLayers:function(){return[new ol.layer.Tile({source:new ol.source.WMTS({url:"http://www.ign.es/wmts/mapa-raster?",layer:"MTN",matrixSet:proj.projCode,projection:proj.projCode,tileGrid:new ol.tilegrid.WMTS({origin:ol.extent.getTopLeft(extent),resolutions:resolutions,matrixIds:[10,11,12,13,14,15,16]}),style:"default",extent:extent,attributions:[new ol.Attribution({html:'Map base: &copy; <a href="http://www.ign.es/" target="_blank">Instituto Geográfico Nacional de España</a>'})]}),id:"IGN Mapas"})]},extent:extent,projCode:proj.projCode,resolutions:resolutions};
//# sourceMappingURL=dist/registry/sources/eMapas.js.map