/**
 * EPSG:3763
 * Portuguese Transverse Mercator, GRS80
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.3.0/defs/epsg3763.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/tmerc.js';
import common from './common.js';

const projCode = 'EPSG:3763';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
