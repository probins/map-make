"es6-transpile";
define(
  [],
  function() {
    "use strict";
    var ol = require('ol');
    var proj = require('../projections/3812');
    var extent = [450000, 515000, 800000, 800000],
        resolutions = [3779761.90476 * 0.28E-3, 1889880.95238 * 0.28E-3, 755952.380952 * 0.28E-3, 472470.238095 * 0.28E-3, 236235.119048 * 0.28E-3, 94494.047619 * 0.28E-3, 47247.0238095 * 0.28E-3, 23623.5119048 * 0.28E-3, 9449.4047619 * 0.28E-3, 4724.70238095 * 0.28E-3, 2362.35119048 * 0.28E-3];
    module.exports = {
      getLayers: function() {
        return [new ol.layer.Tile({
          source: new ol.source.WMTS({
            url: 'http://www.ngi.be/cartoweb/1.0.0/topo/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png',
            layer: 'topo',
            matrixSet: '3812',
            projection: proj.projCode,
            tileGrid: new ol.tilegrid.WMTS({
              origin: ol.extent.getTopLeft(extent),
              resolutions: resolutions,
              matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }),
            style: 'default',
            extent: extent,
            requestEncoding: ol.source.WMTSRequestEncoding.REST,
            attributions: [new ol.Attribution({html: 'Map base: &copy;NGI/IGN <a href="http://www.ngi.be/cartoweb/" target="_blank">' + 'Cartoweb</a>'})]
          }),
          id: 'NGI/IGN Cartoweb Topo'
        })];
      },
      extent: extent,
      projCode: proj.projCode,
      resolutions: resolutions
    };
  });