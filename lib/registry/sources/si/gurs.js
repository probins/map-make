/**
 * Slovenian government Geoportal WMS
 * Code: si/gurs
 * http://prostor4.gov.si/ows2-m-pub/wms?request=getCapabilities&VERSION=1.1.1
 * EPSG:3912
 * does not appear to be accessible via https
 * FIXME id and attribution fixed in English
 */

import { TileGrid, TileLayer, TileWMS } from '../../../deps.js';
import proj from '../../projections/3912.js';

const extent = [369832.5829557097, 25060.632245599554, 630781.624406076, 207724.961260856];
const resolutions = [300, 150, 50, 25, 10, 5];

const prefix = 'raster_gurs_pub:SI.GURS.RASTRI.';
const mapTypes = [prefix + 'DPK1000', prefix + 'DPK1000', prefix + 'DPK500', prefix + 'DPK250', prefix + 'DTK50', prefix + 'DTK50'];

const sourceOptions = {
  url: 'http://prostor4.gov.si:80/ows2-m-pub/wms?',
  params: {
    'VERSION': '1.3',
    'LAYERS': mapTypes[0] // initial value; see view resolution below
  },
  attributions: 'Topo maps &copy; <a target="_blank" href="http://e-prostor.gov.si/">Geodetska uprava RS</a>',
  extent: extent,
  projection: proj.projCode,
  // needs tilegrid otherwise uses inappropriate global grid
  tileGrid: new TileGrid({
    extent: extent,
    resolutions: resolutions
  })
};

const layer = new TileLayer({
  source: new TileWMS(sourceOptions),
  id: 'Slovenian Geoportal'
});

export default {
  getLayers: function(options) {
    if (options) {
      if (options.zoom) {
        // set layers param initially if zoom set (not default)
        // needed because change:resolution isn't fired on initial set
        layer.get('source').updateParams({LAYERS: mapTypes[options.zoom]});
      }
    }
    return [layer];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions,
  // listener fired whenever view resolution changes
  viewEvent: {
    type: 'change:resolution',
    func: function(evt) {
      // LAYERS param on source has to be set based on resolution
      const i = resolutions.indexOf(evt.target.get('resolution'));
      layer.get('source').updateParams({LAYERS: mapTypes[i]});
    }
  }
};
