/**
 * EPSG:277000
 * OSGB Airy ellipsoid Transverse Mercator
 */

import projDef from 'myproj/defs/epsg27700.js';
import 'myproj/dist/esbare/tmerc.js';
import common from './common.js';

const projCode = 'EPSG:27700';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
