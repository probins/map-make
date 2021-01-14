/**
 * EPSG:32633
 * UTM zone 33 on WGS84
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/defs/epsg32633.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:32633';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
