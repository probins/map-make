/**
 * EPSG:3035
 * Lambert Azimuthal Equal-Area, GRS80
 */

const projCode = 'EPSG:3035';
const projDef = '+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/laea.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
