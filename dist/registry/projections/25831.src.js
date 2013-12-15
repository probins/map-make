/** 
 * EPSG:25831
 * UTM zone 31 on ETRS
 */

var projCode = 'EPSG:25831';
// FIXME
window.Proj4js = require('proj');
window.Proj4js.defs[projCode] = '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs';

module.exports = {
  projCode: projCode
};
