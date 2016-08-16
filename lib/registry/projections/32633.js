/**
 * EPSG:32633
 * UTM zone 33 on WGS84
 */

var projCode = 'EPSG:32633';
var projDef = '+proj=utm +zone=33 +ellps=WGS84 +datum=WGS84 +units=m +no_defs';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
