/** 
 * Catalan Topo WMS
 * http://www.icc.cat/eng/Home-ICC/Digital-geoinformation/Online-services-Geoservices/Quick-WMS-WMTS-of-raster-cartography
 * Code: es/icc/topo
 * EPSG:25831
 * does not appear to be accessible via https
 * FIXME id and attribution English
 */

var ol = require('ol');
var proj = require('projections/25831');

var extent = [258000, 4485000, 536000, 4752000];
var resolutions = [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25];
module.exports = {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: 'http://mapcache.icc.cat/map/bases/service?',
        attributions: 'Cartographic base from <a target="_blank" ' +
              'href="http://www.icc.cat/">Institut Cartogràfic de Catalunya</a>',
        params: {
          'VERSION': '1.1.1',
          'LAYERS': 'topo'
        },
        tileGrid: new ol.tilegrid.TileGrid({
          resolutions: resolutions,
          extent: extent
        }),
        projection: proj.projCode
      }),
      id: 'Catalan topos'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
