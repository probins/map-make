/**
 * EPSG:28992
 * Dutch Oblique Stereographic projection, Bessel ellipsoid
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.0/defs/epsg28992.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.0/dist/esbare/sterea.js';
import common from './common.js';

const projCode = 'EPSG:28992';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
