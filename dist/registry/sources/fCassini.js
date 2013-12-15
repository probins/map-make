
/** 
 * French IGN Cassini WTMS
 * EPSG:3857
 * needs an apikey
 * FIXME id and attribution English
 */
var ol=require("ol"),projCode="EPSG:3857",extent=[-20037508.342789244,-20037508.342789244,20037508.342789244,20037508.342789244],resolutions=[4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,305.7481131407048,152.8740565703525,76.43702828517624,38.21851414258813,19.10925707129406,9.554628535647032,4.777314267823516];module.exports={getLayers:function(e){return[new ol.layer.Tile({source:new ol.source.WMTS({url:"http://gpp3-wxs.ign.fr/"+e.apikey+"/wmts",layer:"GEOGRAPHICALGRIDSYSTEMS.CASSINI",matrixSet:"PM",projection:projCode,tileGrid:new ol.tilegrid.WMTS({origin:ol.extent.getTopLeft(extent),resolutions:resolutions,matrixIds:[5,6,7,8,9,10,11,12,13,14,15]}),style:"normal",attributions:[new ol.Attribution({html:'Map base: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank"><img src="http://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a><a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf"alt="TOS" title="TOS" target="_blank">Terms of Service</a>'})]}),id:"Cassini"})]},extent:extent,projCode:projCode,resolutions:resolutions};
//# sourceMappingURL=dist/registry/sources/fCassini.js.map