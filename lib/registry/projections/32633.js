/**
 * EPSG:32633
 * UTM zone 33 on WGS84
 */

const projCode = 'EPSG:32633';
const projDef = '+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/utm.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
