"es6-transpile";
define(
  [],
  function() {
    "use strict";
    var ol = require('ol');
    var proj = require('../projections/25830');
    var extent = [- 87120, 3849419, 770000, 4879828],
        resolutions = [272989.38678571396 * 0.28E-3, 136494.69339285715 * 0.28E-3, 68247.34669642858 * 0.28E-3, 34123.67334821425 * 0.28E-3, 17061.836674107144 * 0.28E-3, 8530.918337053572 * 0.28E-3, 4265.459168526786 * 0.28E-3];
    module.exports = {
      getLayers: function() {
        return [new ol.layer.Tile({
          source: new ol.source.WMTS({
            url: 'http://www.ign.es/wmts/mapa-raster?',
            layer: 'MTN',
            matrixSet: proj.projCode,
            projection: proj.projCode,
            tileGrid: new ol.tilegrid.WMTS({
              origin: ol.extent.getTopLeft(extent),
              resolutions: resolutions,
              matrixIds: [10, 11, 12, 13, 14, 15, 16]
            }),
            style: 'default',
            extent: extent,
            attributions: [new ol.Attribution({html: 'Map base: &copy; <a href="http://www.ign.es/" target="_blank">' + 'Instituto Geográfico Nacional de España</a>'})]
          }),
          id: 'IGN Mapas'
        })];
      },
      extent: extent,
      projCode: proj.projCode,
      resolutions: resolutions
    };
  });