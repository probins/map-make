/**
 * Portuguese government Geoportal WMS
 * http://mapas.dgterritorio.pt/wms/sc2500k?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
 * http://mapas.dgterritorio.pt/wms/sc1500k?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
 * http://mapas.dgterritorio.pt/wms/sc500k?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
 * EPSG:3763
 * There is another server, used by http://mapas.dgterritorio.pt/viewer/index.html and using TileCache WMS, at
 * http://mapas.dgterritorio.pt/viz/tilecache.py?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities
 * which includes sc200/sc100/sc50, but the extent/resolutions seem not to be as advertised,
 * as get tile load error msg 'Current y value -320000.000000 is too far from tile corner y -325000.000000'
 * Code: pt/dgt/sc
 * FIXME attribution fixed in English
 */
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';

// import { TileGrid, TileLayer, TileWMS } from '../../../../deps.js';
import proj from '../../../projections/3763.js';

const extent = [-170000,-325000,180000,290000];
const resolutions = [1191.40625, 595.703125, 297.8515625, 148.92578125, 74.462890625, 37.2314453125];
//, 18.61572265625, 9.307861328125, 4.6539306640625, 2.32696533203125, 1.163482666015625, 0.5817413330078125];

const layerNames = ['sc2500k','sc2500k','sc1500k','sc1500k','sc1500k','sc500k','sc200k','sc200k','sc100k','sc100k','sc50k','sc50k'];
const baseUrl = 'http://mapas.dgterritorio.pt/wms/';

const sourceOptions = {
  url: baseUrl + layerNames[0] + '?',
  params: {
    'LAYERS': layerNames[0] // initial value; see view resolution below
  },
  attributions: 'Topo maps &copy; <a target="_blank" href="http://mapas.dgterritorio.pt/">DGT</a>',
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
  id: 'DGT (PT)'
});

function setUrl(zoom) {
  layer.get('source').updateParams({LAYERS: layerNames[zoom]});
  layer.get('source').setUrl(baseUrl + layerNames[zoom] + '?');
}

export default {
  getLayers: function(options) {
    if (options) {
      if (options.zoom) {
        // set layers param initially if zoom set (not default)
        // needed because change:resolution isn't fired on initial set
        setUrl(options.zoom);
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
      setUrl(resolutions.indexOf(evt.target.get('resolution')));
    }
  }
};
