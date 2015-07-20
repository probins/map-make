/** 
 * OS OpenSpace WMS
 * EPSG:27700
 * FIXME id and attribution fixed in English
 */

var ol = require('ol');
var proj = require('projections/27700');

var extent = [0, 0, 800000, 1300000];
var resolutions = [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 2, 1];
var sourceOptions = {
  url: 'http://openspace.ordnancesurvey.co.uk/osmapapi/ts',
  params: {
    'VERSION': '1.1.1',
    'LAYERS': '2500', // initial value; see view resolution below
    'KEY': '',
    'URL': document.URL
  },
  attributions: [new ol.Attribution({
    html: 'Topo maps &copy; Crown copyright and database rights ' + 
        new Date().getFullYear() + 
        ' <span style="white-space: nowrap;">Ordnance Survey.</span>' +
        '&nbsp;&nbsp;<span style="white-space: nowrap;">' +
        '<a href="http://openspace.ordnancesurvey.co.uk/openspace/developeragreement.html#enduserlicense"' +
        'target="_blank">End User License Agreement</a></span>'
  })],
  logo: 'http://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_4.0.0/OS/poweredby_free.png',
  extent: extent,
  projection: proj.projCode,
  // needs tilegrid otherwise uses inappropriate global grid
  tileGrid: new ol.tilegrid.TileGrid({
    extent: extent,
    tileSizes: [200, 200, 200, 200, 200, 200, 200, 200, 200, 250, 250],
    resolutions: resolutions,
    origin: [0, 0]
  })
};

var layer = new ol.layer.Tile({
  source: new ol.source.TileWMS(sourceOptions),
  id: 'OpenSpace'
});

module.exports = {
  getLayers: function(options) {
    if (options) {
      if (options.zoom) {
        // set layers param initially if zoom set (not default)
        // needed because change:resolution isn't fired on initial set
        var res = resolutions[options.zoom];
        layer.getSource().updateParams({LAYERS: res});
      }
      if (options.apikey) {
        layer.getSource().updateParams({KEY: options.apikey});
      }
    }
    return [layer];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions,
  // listener fired whenever view resolution changes
  viewEvent: {
    type: 'change:resolution',
    func: function(evt) {
      // LAYERS param on source has to be set to resolution
      var res = evt.target.getResolution();
      layer.getSource().updateParams({LAYERS: res});
    }
  }
};