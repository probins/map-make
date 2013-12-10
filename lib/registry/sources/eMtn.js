/** 
 * Spanish IGN MTN WMS
 * EPSG:25830
 * http://www.ign.es/wms-inspire/mapa-raster?request=GetCapabilities&service=WMS
 */

var ol = require('ol');
// FIXME
window.Proj4js = require('proj');

var extent = [-100000, 3950000, 1150000, 4870000],
    projCode = 'EPSG:25830';
window.Proj4js.defs[projCode] = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
module.exports = {
  getLayers: function() {
    // FIXME id and attribution fixed in English
    return [new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://www.idee.es/wms/MTN-Raster/MTN-Raster',
        attributions: [new ol.Attribution({
          html: 'Cartographic base &copy; <a target="_blank" ' +
              'href="http://www.idee.es/">Instituto Geográfico Nacional de España</a>'
        })],
        params: {
          'LAYERS': 'mtn_rasterizado'
        },
        extent: extent,
        projection: projCode
      }),
      id: 'IGN topos'
    })];
  },
  extent: extent,
  projCode: projCode,
  resolutions: [1800,900,450,225,120,50,25,10,4.5,3,2,1,0.5]
};
