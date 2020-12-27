/**
 * EPSG:3857
 * Web Mercator, WGS84
 */

import projDef from 'myproj/defs/epsg3857.js';
import 'myproj/dist/esbare/merc.js';
import common from './common.js';

const projCode = 'EPSG:3857';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
