/**
 * Slovenian government Geoportal WMS
 * Code: si/gurs
 * EPSG:3912
 * does not appear to be accessible via https
 * FIXME id and attribution fixed in English
 */

var ol = require('../../../ol.js');
var proj = require('../../projections/3912.js');

var extent = [369832.5829557097, 25060.632245599554, 630781.624406076, 207724.961260856];
var resolutions = [300, 150, 50, 25, 10, 5];

var prefix = 'raster_gurs_pub:SI.GURS.RASTRI.';
var mapTypes = [prefix + 'DPK1000', prefix + 'DPK1000', prefix + 'DPK500', prefix + 'DPK250', prefix + 'DTK50', prefix + 'DTK50'];

var sourceOptions = {
  url: 'http://prostor2.gov.si:80/ows2-m-pub/ows?',
  params: {
    'VERSION': '1.3',
    'LAYERS': mapTypes[0] // initial value; see view resolution below
  },
  attributions: 'Topo maps &copy; <a target="_blank" href="http://e-prostor.gov.si/">Geodetska uprava RS</a>',
  extent: extent,
  projection: proj.projCode,
  // needs tilegrid otherwise uses inappropriate global grid
  tileGrid: new ol.tilegrid.TileGrid({
    extent: extent,
    resolutions: resolutions
  })
};

var layer = new ol.layer.Tile({
  source: new ol.source.TileWMS(sourceOptions),
  id: 'Slovenian Geoportal'
});

module.exports = {
  getLayers: function(options) {
    if (options) {
      if (options.zoom) {
        // set layers param initially if zoom set (not default)
        // needed because change:resolution isn't fired on initial set
        layer.getSource().updateParams({LAYERS: mapTypes[options.zoom]});
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
      // LAYERS param on source has to be set based on resolution
      var i = resolutions.indexOf(evt.target.getResolution());
      layer.getSource().updateParams({LAYERS: mapTypes[i]});
    }
  }
};
