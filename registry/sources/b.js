/** 
 * Belgian Topo WMS
 * EPSG:3812
 */

// needs setUrl

var ol = require('ol');
// FIXME
window.Proj4js = require('proj');

var extent = [517999.999000, 798000.139000, 517999.886500, 758000.006500],
    projCode = 'EPSG:3812';
window.Proj4js.defs[projCode] = "+proj=lcc +lat_1=49.83333333333334 +lat_2=51.16666666666666 +lat_0=50.797815 +lon_0=4.359215833333333 +x_0=649328 +y_0=665262 +ellps=GRS80 +units=m +no_defs";
// var proj = ol.proj.configureProj4jsProjection({
//     code: 'EPSG:3812',
//     extent: extent
// });

var params = {
    'VERSION': '1.1.1',
    'LAYERS': '0'
};
var service = 'top100r_l08_fr';
var baseUrl = 'http://www.ngi.be/testbed/wms/';
var url = baseUrl + service + '?';

module.exports = {
  getLayers: function() {
    // FIXME id and attribution fixed in English
    return [new ol.layer.TileLayer({
      source: new ol.source.TiledWMS({
        url: url,
        attributions: [new ol.Attribution(
          'Topo maps from <a target="_blank" href="http://www.ngi.be/testbed/">IGN/NGI</a>'
        )],
        params: params,
        // tileGrid: tileGrid,
        extent: extent
      })
    })];
  },
  extent: extent,
  projCode: projCode,
  resolutions: [500, 200, 100, 60, 35, 18, 9, 4, 2.5],
  viewEvent: {
    type: 'change:resolution',
    func: function(evt) {console.log(evt);
      var zoom = evt.target.getZoom();
                if (zoom<7) {
                    service = "top100r_l08_fr";
                } else {
                    service = zoom<8 ? "top50r_l08_fr" : "top10r_l08_fr";
                }
                url = baseUrl + service + '?';
    }
  }
};
