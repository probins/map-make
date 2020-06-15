/**
 * EPSG:21781
 * Swiss Oblique Mercator, Bessel ellipsoid
 */

const projCode = 'EPSG:21781';
const projDef = '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/somerc.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
