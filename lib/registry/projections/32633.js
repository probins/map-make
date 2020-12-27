/**
 * EPSG:32633
 * UTM zone 33 on WGS84
 */

import projDef from 'myproj/defs/epsg32633.js';
import 'myproj/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:32633';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
