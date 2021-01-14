/**
 * EPSG:3812
 * Belgian Lambert Conic, GRS80
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/defs/epsg3812.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/lcc.js';
import common from './common.js';

const projCode = 'EPSG:3812';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
