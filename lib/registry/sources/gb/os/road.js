/**
 * OS Data Hub XYZ
 * Road_27700 layer
 * Needs an apikey for a url; register at https://osdatahub.os.uk/
 * Resolutions >9 premium; see https://osdatahub.os.uk/docs/wmts/technicalSpecification
 *
 * Code: gb/os/road
 * EPSG:27700
 * FIXME id and attribution fixed in English
 */

import common from './common.js';

const layer = 'Road_27700';

common.options.id = 'OS Road';

common.options.sourceOptions.url = common.baseURL.replace('LAYER', layer);

export default {
  getLayers: common.getLayers,
  projCode: common.projCode,
  resolutions: common.resolutions,
  extent: common.extent
};
