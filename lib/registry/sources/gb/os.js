/**
 * OS OpenSpace WMS
 * Free access but needs an apikey for a url; register at:
 * https://www.ordnancesurvey.co.uk/innovate/innovate-with-open-space.html
 *
 * Code: gb/os
 * EPSG:27700
 * FIXME id and attribution fixed in English
 */

var ol = require('../../../ol.js');
var proj = require('../../projections/27700.js');

var extent = [0, 0, 800000, 1300000];
var resolutions = [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 2, 1];

var source;

module.exports = {
  // apikey should be passed in the options object
  getLayers: function(options) {
    source = new ol.source.TileWMS({
      url: 'https://openspace.ordnancesurvey.co.uk/osmapapi/ts',
      params: {
        'VERSION': '1.1.1',
        'LAYERS': options.zoom ? resolutions[options.zoom] : '2500', // initial value; see viewEvent below
        'KEY': options.apikey,
        'URL': document.URL
      },
      attributions: 'Topo maps &copy; Crown copyright and database rights ' +
            new Date().getFullYear() +
            ' <span style="white-space: nowrap;">Ordnance Survey.</span>' +
            '&nbsp;&nbsp;<span style="white-space: nowrap;">' +
            '<a href="http://openspace.ordnancesurvey.co.uk/openspace/developeragreement.html#enduserlicense"' +
            'target="_blank">End User License Agreement</a></span>',
      logo: 'https://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_4.0.0/OS/poweredby_free.png',
      extent: extent,
      projection: proj.projCode,
      // needs tilegrid otherwise uses inappropriate global grid
      tileGrid: new ol.tilegrid.TileGrid({
        extent: extent,
        tileSizes: [200, 200, 200, 200, 200, 200, 200, 200, 200, 250, 250],
        resolutions: resolutions,
        origin: [0, 0]
      })
    });
    return [new ol.layer.Tile({
      source: source,
      id: 'OpenSpace'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions,
  // listener fired whenever view resolution changes
  viewEvent: {
    type: 'change:resolution',
    func: function(evt) {
      // LAYERS param on source has to be set to resolution
      source.updateParams({LAYERS: evt.target.getResolution()});
    }
  }
};
