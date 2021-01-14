/**
 * EPSG:3035
 * Lambert Azimuthal Equal-Area, GRS80
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/defs/epsg3035.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/laea.js';
import common from './common.js';

const projCode = 'EPSG:3035';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
