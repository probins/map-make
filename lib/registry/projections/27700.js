/**
 * EPSG:277000
 * OSGB Airy ellipsoid Transverse Mercator
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/defs/epsg27700.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/tmerc.js';
import common from './common.js';

const projCode = 'EPSG:27700';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
