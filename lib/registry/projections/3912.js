/**
 * EPSG:3912
 * Slovenian Transverse Mercator, Bessel ellipsoid
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.3.2/defs/epsg3912.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.3.0/dist/esbare/tmerc.js';
import common from './common.js';

const projCode = 'EPSG:3912';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
