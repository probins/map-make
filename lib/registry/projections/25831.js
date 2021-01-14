/**
 * EPSG:25831
 * UTM zone 31 on ETRS
 */

import projDef from 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/defs/epsg25831.js';
import 'https://cdn.jsdelivr.net/gh/probins/myproj@0.4.2/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:25831';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
