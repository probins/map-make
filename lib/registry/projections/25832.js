/**
 * EPSG:25832
 * UTM zone 32 on ETRS
 */

var projCode = 'EPSG:25832';
var projDef = '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs';

require('./common.js').addProjection(projCode, projDef);

module.exports = {
  projCode: projCode
};
