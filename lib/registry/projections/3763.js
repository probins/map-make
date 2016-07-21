/**
 * EPSG:3763
 * Portuguese Transverse Mercator, GRS80
 */

var projCode = 'EPSG:3763';
var projDef = '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs';

require('./common.js').addProjection(projCode, projDef);

module.exports = {
  projCode: projCode
};
