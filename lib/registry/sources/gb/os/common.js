/**
 * Common code for OS Data Hub XYZ
 * https://osdatahub.os.uk/
 *
 * EPSG:27700
 * FIXME handle premium resolutions for non-leisure layers
 */

import getLayers from '../../common.js';
import proj from '../../../projections/27700.js';

const resolutions = [896, 448, 224, 112, 56, 28, 14, 7, 3.5, 1.75];
const extent = [0, 0, 800000, 1300000];

const baseURL = 'https://api.os.uk/maps/raster/v1/zxy/LAYER/{z}/{x}/{y}.png?key=';

const options = {
  type: "XYZ",
  sourceOptions: {
    projection: proj.projCode,
    attributions: 'Map base Ordnance Survey &copy; Crown copyright and database rights ' +
        new Date().getFullYear()
  },
  tileGridOptions: {
    resolutions: resolutions,
    extent: extent,
    origin: [ -238375, 1376256 ]
  }
};

export default {
  getLayers: function(inOptions) {
    options.sourceOptions.url += inOptions.apikey;
    return getLayers(options);
  },
  baseURL: baseURL,
  options: options,
  projCode: proj.projCode,
  resolutions: resolutions,
  extent: extent
};
