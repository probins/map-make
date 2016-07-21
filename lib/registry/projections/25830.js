/**
 * EPSG:25830
 * UTM zone 30 on ETRS
 */

var projCode = 'EPSG:25830';
var projDef = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';

require('./common.js').addProjection(projCode, projDef);

module.exports = {
  projCode: projCode
};
