/** 
 * Catalan Topo WMS
 * EPSG:25831
 */

var ol = require('ol');
// FIXME
window.Proj4js = require('proj');

var extent = [258000, 4485000, 536000, 4752000],
    projCode = 'EPSG:25831';
window.Proj4js.defs[projCode] = '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs';
module.exports = {
  getLayer: function() {
    // FIXME id and attribution fixed in English
    return new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://mapcache.icc.cat/map/bases/service?',
        attributions: [new ol.Attribution({
          html: 'Cartographic base from <a target="_blank" ' +
              'href="http://www.icc.cat/">Institut Cartogràfic de Catalunya</a>'
        })],
        params: {
          'VERSION': '1.1.1',
          'LAYERS': 'topo'
        },
        extent: extent,
        projection: projCode
      }),
      id: 'Catalan topos'
    });
  },
  extent: extent,
  projCode: projCode,
  resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25]
};
