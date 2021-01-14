/**
 * EPSG:25832
 * UTM zone 32 on ETRS
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/defs/epsg25832.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:25832';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
