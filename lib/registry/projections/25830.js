/**
 * EPSG:25830
 * UTM zone 30 on ETRS
 */

import projDef from 'myproj/defs/epsg25830.js';
import 'myproj/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:25830';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
