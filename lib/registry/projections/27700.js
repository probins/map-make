/** 
 * EPSG:277000
 * OSGB Airy ellipsoid Transverse Mercator
 */

var projCode = 'EPSG:27700';
var proj4 = require('proj4');
proj4.defs(projCode, '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717' +
    ' +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs');

module.exports = {
  projCode: projCode
};
