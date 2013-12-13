/** 
 * OS OpenSpace WMS
 * EPSG:27700
 * Needs 2 layers, one for each tilegrid
 * FIXME id and attribution fixed in English
 */

var ol = require('ol');
var proj = require('../projections/27700');

var extent = [0, 0, 800000, 1300000];
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
  projection: proj.projCode
};

/**
 * OpenSpace has non-standard WMS setup, so must create two layers/sources,
 * one for 200x200 tilegrid, one for 250x250 tilegrid
 * resolution determines which one is requested
 * layer vars used by view listener - see below
 */
sourceOptions.tileGrid = new ol.tilegrid.TileGrid({
  resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5],
  origin: [0, 0],
  tileSize: [200, 200]
});
var l200 = new ol.layer.Tile({
  source: new ol.source.TileWMS(sourceOptions),
  minResolution: 5,
  id: 'OpenSpace'
});
sourceOptions.tileGrid = new ol.tilegrid.TileGrid({
  resolutions: [2, 1],
  origin: [0, 0],
  tileSize: [250, 250]
});
var l250 = new ol.layer.Tile({
  source: new ol.source.TileWMS(sourceOptions),
  maxResolution: 5,
  id: 'OpenSpace'
});
var resolutions = [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 2, 1];

module.exports = {
  getLayers: function(options) {
    if (options) {
      if (options.zoom) {
        // set layers param initially if zoom set (not default)
        // needed because change:resolution isn't fired on initial set
        var res = resolutions[options.zoom];
        if (res > 2) {
          l200.getSource().updateParams({LAYERS: res});
        } else {    
          l250.getSource().updateParams({LAYERS: res});
        }
      }
      if (options.apikey) {
          l200.getSource().updateParams({KEY: options.apikey});
          l250.getSource().updateParams({KEY: options.apikey});
      }
    }
    // add both layers
    return [l200, l250];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions,
  // listener fired whenever view resolution changes
  viewEvent: {
    type: 'change:resolution',
    func: function(evt) {
      // LAYERS param on source has to be set to resolution
      // l200/l250 closures
      var res = evt.target.getResolution();
      if (res > 2) {
        l200.getSource().updateParams({LAYERS: res});
      } else {    
        l250.getSource().updateParams({LAYERS: res});
      }
    }
  }
};
