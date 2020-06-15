/**
 * EPSG:3912
 * Slovenian Transverse Mercator, Bessel ellipsoid
 */

const projCode = 'EPSG:3912';
const projDef = '+proj=tmerc +lat_0=0 +lon_0=15 +k=0.9999 +x_0=500000 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/tmerc.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
