/**
 * EPSG:3763
 * Portuguese Transverse Mercator, GRS80
 */

const projCode = 'EPSG:3763';
const projDef = '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/tmerc.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
