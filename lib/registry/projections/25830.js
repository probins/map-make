/**
 * EPSG:25830
 * UTM zone 30 on ETRS
 */

const projCode = 'EPSG:25830';
const projDef = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/utm.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
