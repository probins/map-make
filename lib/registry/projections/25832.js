/** 
 * EPSG:25832
 * UTM zone 32 on ETRS
 */

var projCode = 'EPSG:25832';
var proj4 = require('proj4');
proj4.defs(projCode, '+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs');

module.exports = {
  projCode: projCode
};
