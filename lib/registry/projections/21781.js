/**
 * EPSG:21781
 * Swiss Oblique Mercator, Bessel ellipsoid
 */

import projDef from 'myproj/defs/epsg21781.js';
import 'myproj/dist/esbare/somerc.js';
import common from './common.js';

const projCode = 'EPSG:21781';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
