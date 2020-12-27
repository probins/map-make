/**
 * EPSG:3912
 * Slovenian Transverse Mercator, Bessel ellipsoid
 */

import projDef from 'myproj/defs/epsg3912.js';
import 'myproj/dist/esbare/tmerc.js';
import common from './common.js';

const projCode = 'EPSG:3912';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
