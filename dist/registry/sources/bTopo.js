
/** 
 * Belgian Cartoweb Topo WMTS
 * http://www.ngi.be/cartoweb/
 * EPSG:3812
 * FIXME id and attribution English
 */
var ol=require("ol"),proj=require("../projections/3812"),extent=[45e4,515e3,8e5,8e5],resolutions=[1058.3333333327998,529.1666666663999,211.66666666656,132.29166666659998,66.14583333344,26.45833333332,13.22916666666,6.614583333344,2.6458333333319994,1.3229166666659997,.6614583333343999];module.exports={getLayers:function(){return[new ol.layer.Tile({source:new ol.source.WMTS({url:"http://www.ngi.be/cartoweb/1.0.0/topo/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png",layer:"topo",matrixSet:"3812",projection:proj.projCode,tileGrid:new ol.tilegrid.WMTS({origin:ol.extent.getTopLeft(extent),resolutions:resolutions,matrixIds:[0,1,2,3,4,5,6,7,8,9,10]}),style:"default",extent:extent,requestEncoding:ol.source.WMTSRequestEncoding.REST,attributions:[new ol.Attribution({html:'Map base: &copy;NGI/IGN <a href="http://www.ngi.be/cartoweb/" target="_blank">Cartoweb</a>'})]}),id:"NGI/IGN Cartoweb Topo"})]},extent:extent,projCode:proj.projCode,resolutions:resolutions};
//# sourceMappingURL=dist/registry/sources/bTopo.js.map