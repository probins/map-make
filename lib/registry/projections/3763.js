/**
 * EPSG:3763
 * Portuguese Transverse Mercator, GRS80
 */

import projDef from 'myproj/defs/epsg3763.js';
import 'myproj/dist/esbare/tmerc.js';
import common from './common.js';

const projCode = 'EPSG:3763';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
