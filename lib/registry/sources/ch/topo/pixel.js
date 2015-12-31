/** 
 * Swisstopo WMTS
 * http://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml
 * Needs registration, which must be at domain level, and cannot be a simple page;
 * there is however no API key
 * see http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/services/web_services/webaccess.html
 * Code: ch/topo/pixel
 * EPSG:21781
 * FIXME id and attribution English
 */

var ol = require('ol');
var proj = require('projections/21781');

var extent = [420000, 30000, 900000, 350000],
    resolutions = [500, 250, 100, 50, 20, 10, 5, 2.5, 2];

module.exports = {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.WMTS({
        url: "http://wmts{0-4}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/20151231/21781/{TileMatrix}/{TileRow}/{TileCol}.jpeg",
        layer: 'ch.swisstopo.pixelkarte-farbe',
        matrixSet: '21781',
        projection: proj.projCode,
        tileGrid: new ol.tilegrid.WMTS({
          extent: extent,
          resolutions: resolutions,
          matrixIds: [15, 16, 17, 18, 19, 20, 21, 22, 23]
        }),
        style: 'default',
        requestEncoding: 'REST',
        attributions: [new ol.Attribution({
          html: 'Topomaps &copy; <a target="_blank" href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/services/web_services/webaccess.html">swisstopo</a>'
        })]
      }),
      extent: extent,
      id: 'Swiss Topo'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
