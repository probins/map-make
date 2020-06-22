/**
 * EPSG:21781
 * Swiss Oblique Mercator, Bessel ellipsoid
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.3.0/defs/epsg21781.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/somerc.js';
import common from './common.js';

const projCode = 'EPSG:21781';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
