/**
 * SRTM Relief in EPSG:4326
 * Uses old tilecache directory structure
 * FIXME: attribution English
 */
var ol = require('ol');

var extent = [-11, 35, 30, 70],
    resolutions = [0.06,0.04,0.02,0.01];

module.exports = {
  getLayers: function(options) {
    return [new ol.layer.Tile({
      source: new ol.source.TileImage({
        projection: 'EPSG:4326',
        tileGrid: new ol.tilegrid.TileGrid({
          extent: extent,
          tileSize: [200, 200],
          origin: [extent[0], extent[1]],
          resolutions: resolutions
        }),
        tileUrlFunction: function(coordinate) {
          if (coordinate === null) {
            return undefined;
          }
          // pad x/y coords to 2 digits
          // in this case, they are never >2
          var x = (''+coordinate[1]);
          if (x.length === 1) {
            x = '0'+x;
          }
          var y = (''+coordinate[2]);
          if (y.length === 1) {
            y = '0'+y;
          }
          return 'http://map-loader.appspot.com/cache/srtm/0'+coordinate[0]+
              '/000/000/0'+ x +'/000/000/0'+ y +'.png';
        },
        attributions: [new ol.Attribution({
          html: 'SRTM30 data from <a href="http://www2.jpl.nasa.gov/srtm/" target="_blank">NASA/JPL</a>'
        })]
      }),
      extent: extent,
      id: 'SRTM 4326'
    })];
  },
  extent: extent,
  projCode: 'EPSG:4326',
  resolutions: resolutions
};
