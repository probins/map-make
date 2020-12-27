/**
 * EPSG:25832
 * UTM zone 32 on ETRS
 */

import projDef from 'myproj/defs/epsg25832.js';
import 'myproj/dist/esbare/utm.js';
import common from './common.js';

const projCode = 'EPSG:25832';

common.addProjection(projCode, projDef);

export default {
  projCode: projCode
};
