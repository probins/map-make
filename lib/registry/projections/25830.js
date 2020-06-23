/**
 * EPSG:25830
 * UTM zone 30 on ETRS
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.0/defs/epsg25830.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.0/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:25830';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
