/**
 * EPSG:25831
 * UTM zone 31 on ETRS
 */

var projCode = 'EPSG:25831';
var projDef = '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs';

require('./common.js').addProjection(projCode, projDef);

module.exports = {
  projCode: projCode
};
