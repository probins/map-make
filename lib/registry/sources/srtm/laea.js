/**
 * SRTM Relief in LAEA EPSG:3035
 * FIXME: attribution English
 */
var ol = require('ol');
var proj = require('projections/3035');

var extent = [2409891.715, 1328424.080, 6143417.136, 5330401.505],
    resolutions = [4000, 3000, 2000, 1000];

module.exports = {
  getLayers: function(options) {
    return [new ol.layer.Tile({
      source: new ol.source.TileImage({
        projection: proj.projCode,
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
          return 'http://map-loader.appspot.com/cache/srtm3035/0'+coordinate[0]+
              '/000/000/0'+ x +'/000/000/0'+ y +'.png';
        },
        attributions: [new ol.Attribution({
          html: 'SRTM30 data from <a href="http://www2.jpl.nasa.gov/srtm/" target="_blank">NASA/JPL</a>'
        })]
      }),
      extent: extent,
      id: 'SRTM LAEA'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
