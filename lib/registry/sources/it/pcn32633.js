/** 
 * WARNING: do not use; doesn't work!
 * Italian government Geoportal WMS
 * EPSG:32633
 * FIXME id and attribution fixed in English
 */

var ol = require('ol');
var proj = require('projections/32633');

var extent = [-250078, 3.85602e+006, 889638, 5.27362e+006];
var resolutions = [5,0.007,0.002,0.0007,0.0004,0.0002,0.0001,0.00005,0.000025,0.00001];

var baseUrl = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/";
var mapTypes = ['de_agostini','de_agostini','de_agostini','de_agostini','de_agostini','IGM_100000','IGM_100000','IGM_25000','IGM_25000','IGM_25000'];
var layerNames = ['CB.DEAGOSTINI','CB.DEAGOSTINI','CB.DEAGOSTINI','CB.DEAGOSTINI','CB.DEAGOSTINI','MB.IGM100000','MB.IGM100000','CB.IGM25000','CB.IGM25000','CB.IGM25000'];

var sourceOptions = {
  url: baseUrl+mapTypes[0]+'.map',
  params: {
    'LAYERS': layerNames[0] // initial value; see view resolution below
  },
  attributions: 'De Agostini and IGM topo maps &copy; <a target="_blank" href="http://www.pcn.minambiente.it/PCN/">PCN</a>',
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
  id: 'Italian Geoportal'
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
      layer.getSource().updateParams({LAYERS: layerNames[i]});
      // layer.getSource().setUrl(baseUrl+mapTypes[i]+".map&amp;");
    }
  }
};
