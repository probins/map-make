/**
 * EPSG:3857
 * Web Mercator, WGS84
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.0/defs/epsg3857.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.0/dist/esbare/merc.js';
import common from './common.js';

const projCode = 'EPSG:3857';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
