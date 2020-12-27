/**
 * EPSG:3035
 * Lambert Azimuthal Equal-Area, GRS80
 */

import projDef from 'myproj/defs/epsg3035.js';
import 'myproj/dist/esbare/laea.js';
import common from './common.js';

const projCode = 'EPSG:3035';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
