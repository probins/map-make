/**
 * EPSG:3035
 * Lambert Azimuthal Equal-Area, GRS80
 */

var projCode = 'EPSG:3035';
var proj4 = require('https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.6/proj4.js');
proj4.defs(projCode, '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs');

module.exports = {
  projCode: projCode
};
