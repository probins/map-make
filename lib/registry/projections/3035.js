/**
 * EPSG:3035
 * Lambert Azimuthal Equal-Area, GRS80
 */

var projCode = 'EPSG:3035';
var projDef = '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
