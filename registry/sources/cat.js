/** dependencies:
 * Proj4js loaded
 * ol loaded
 */
Proj4js.defs['EPSG:25831'] = '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs';

(function(CM) {
  var extent = [258000, 4485000, 536000, 4752000],
    projCode = 'EPSG:25831';
  CM.rasters = CM.rasters || {};
  CM.rasters.cat = {
  	layer: new ol.layer.Tile({
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
      id: 'cat'
    }),
    extent: extent,
    projCode: projCode,
    resolutions: [1100, 550, 275, 100, 50, 25, 10, 5, 2, 1, 0.5, 0.25]
  };
})(window.CM = window.CM || {});
