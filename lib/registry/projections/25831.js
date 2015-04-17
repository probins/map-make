/** 
 * EPSG:25831
 * UTM zone 31 on ETRS
 */

var projCode = 'EPSG:25831';
var proj4 = require('proj4');
proj4.defs(projCode, '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs');

module.exports = {
  projCode: projCode
};
