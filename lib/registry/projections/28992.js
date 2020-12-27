/**
 * EPSG:28992
 * Dutch Oblique Stereographic projection, Bessel ellipsoid
 */

import projDef from 'myproj/defs/epsg28992.js';
import 'myproj/dist/esbare/sterea.js';
import common from './common.js';

const projCode = 'EPSG:28992';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
