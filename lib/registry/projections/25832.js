/**
 * EPSG:25832
 * UTM zone 32 on ETRS
 */

const projCode = 'EPSG:25832';
const projDef = '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/utm.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
