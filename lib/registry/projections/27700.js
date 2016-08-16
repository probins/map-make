/**
 * EPSG:277000
 * OSGB Airy ellipsoid Transverse Mercator
 */

var projCode = 'EPSG:27700';
var projDef = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717' +
    ' +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs';

import common from './common.js';
common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
