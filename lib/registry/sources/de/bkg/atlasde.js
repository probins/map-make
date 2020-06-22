/**
 * German WebAtlasDE.light WMTS
 * http://sg.geodatenzentrum.de/wmts_webatlasde.light?request=GetCapabilities&service=wmts
 * Code: de/bkg/atlasde
 * EPSG:25832
 * FIXME attribution English
 */

import getLayers from '../../common.js';
import proj from '../../../projections/25832.js';

const extent = [-46133.17, 5048875.268575671, 1206211.101424329, 6301219.54],
    resolutions = [1.7471320750895232E7 * 0.28E-3, 8735660.375447616 * 0.28E-3,
      4367830.187723808 * 0.28E-3, 2183915.093861904 * 0.28E-3, 1091957.546930952 * 0.28E-3,
      545978.7734654777 * 0.28E-3, 272989.3867327382 * 0.28E-3, 136494.6933663689 * 0.28E-3,
      68247.34668318463 * 0.28E-3, 34123.67334159224 * 0.28E-3, 17061.83667079614 * 0.28E-3];

const options = {
  type: "WMTS",
  extent: extent,
  id: 'BKG-DE',
  sourceOptions: {
    url: 'https://sg.geodatenzentrum.de/wmts_webatlasde.light?',
    layer: 'webatlasde.light',
    matrixSet: 'DE_EPSG_25832_LIGHT',
    projection: proj.projCode,
    style: 'default',
    attributions: 'Map base: &copy; GeoBasis-DE / <a href="http://www.bkg.bund.de/" target="_blank">' +
          'BKG</a> ' + new Date().getFullYear()
  },
  tileGridOptions: {
    extent: extent,
    sizes: [[1, -1], [2, -2], [4, -4], [8, -8], [16, -16], [32, -32], [64, -64],
        [128, -128], [256, -256], [512, -512], [1024, -1024]],
    origin: [extent[0], extent[3]],
    resolutions: resolutions,
    matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }
};

export default {
  getLayers: function() {
    return getLayers(options);
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
