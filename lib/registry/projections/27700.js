/**
 * EPSG:277000
 * OSGB Airy ellipsoid Transverse Mercator
 */

const projCode = 'EPSG:27700';
const projDef = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717' +
    ' +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs';

import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.2.0/dist/es/tmerc.js';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
