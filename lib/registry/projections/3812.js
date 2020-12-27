/**
 * EPSG:3812
 * Belgian Lambert Conic, GRS80
 */

import projDef from 'myproj/defs/epsg3812.js';
import 'myproj/dist/esbare/lcc.js';
import common from './common.js';

const projCode = 'EPSG:3812';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
