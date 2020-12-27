/**
 * EPSG:25831
 * UTM zone 31 on ETRS
 */

import projDef from 'myproj/defs/epsg25831.js';
import 'myproj/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:25831';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
