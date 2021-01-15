/**
 * WARNING: do not use; doesn't work!
 * Italian government Geoportal WMS
 * EPSG:32633
 * FIXME id and attribution fixed in English
 */

import { TileGrid, TileLayer, TileWMS } from '../../../deps.js';
import proj from '../../projections/32633.js';

const extent = [-250078, 3.85602e+006, 889638, 5.27362e+006];
const resolutions = [5,0.007,0.002,0.0007,0.0004,0.0002,0.0001,0.00005,0.000025,0.00001];

const baseUrl = 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/';
const mapTypes = ['de_agostini','de_agostini','de_agostini','de_agostini','de_agostini','IGM_100000','IGM_100000','IGM_25000','IGM_25000','IGM_25000'];
const layerNames = ['CB.DEAGOSTINI','CB.DEAGOSTINI','CB.DEAGOSTINI','CB.DEAGOSTINI','CB.DEAGOSTINI','MB.IGM100000','MB.IGM100000','CB.IGM25000','CB.IGM25000','CB.IGM25000'];

const sourceOptions = {
  url: baseUrl + mapTypes[0] + '.map',
  params: {
    'LAYERS': layerNames[0] // initial value; see view resolution below
  },
  attributions: 'De Agostini and IGM topo maps &copy; <a target="_blank" href="http://www.pcn.minambiente.it/PCN/">PCN</a>',
  extent: extent,
  projection: proj.projCode,
  // needs tilegrid otherwise uses inappropriate global grid
  tileGrid: new TileGrid({
    extent: extent,
    resolutions: resolutions
  })
};

const layer = new TileLayer({
  source: new TileWMS(sourceOptions),
  id: 'Italian Geoportal'
});

export default {
  getLayers: function(options) {
    if (options) {
      if (options.zoom) {
        // set layers param initially if zoom set (not default)
        // needed because change:resolution isn't fired on initial set
        const res = resolutions[options.zoom];
        layer.get('source').updateParams({LAYERS: res});
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
      const i = resolutions.indexOf(evt.target.get('resolution'));
      layer.get('source').updateParams({LAYERS: layerNames[i]});
      // layer.get('source').setUrl(baseUrl+mapTypes[i]+".map&amp;");
    }
  }
};
