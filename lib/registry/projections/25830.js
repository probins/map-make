/**
 * EPSG:25830
 * UTM zone 30 on ETRS
 */

var projCode = 'EPSG:25830';
var projDef = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
