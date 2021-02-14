import { $ } from '../../utils.js';
import Feature from "ol/Feature.js";
// import { Feature } from '../../deps.js';
import olMap from '../../olMap.js';
import vectors from '../../vectors.js';
// import templates
import tpl from './serialise.htm.js';
import Component from './component.js';
// make sure toolbar initialised
import './toolbar.js';

const component = new Component(tpl);
$('#toolbar').appendChild(component.getTemplate('serialise'));

// FIXME should be configurable
const DECIMALS = 6; // coordinate decimal places, used by save
let formatType = 'GeoJSON'; // default output format

const map = olMap.get();

// add toggle listener to toolbartitle div
$('#serialise-title').addEventListener('click', function() {
  // toggle display of next, i.e. content, element
  const el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
});

let saveall, layerId;
$('#reserialise').onclick = e => {
  serialise(saveall, layerId, $('#tolerance').value);
};

$('#download').onclick = e => {
  const mediaTypes = {
    GeoJSON: 'application/vnd.geo+json',
    GPX: 'application/gpx+xml',
    KML: 'application/vnd.google-earth.kml+xml',
    mongo: 'application/json'
  };
  e.target.href = 'data:' + mediaTypes[formatType]
      + ';charset=utf-8,' + encodeURIComponent($('#serialOP').value);
  const ext = (formatType == 'mongo') ? 'json' : formatType.toLowerCase();
  e.target.download = 'myGeoData.' + ext;
};

function serialise(saveType, id, tolerance) {
  formatType = $('#opformat').value;
  const format = vectors.getFormat(formatType);
  const layers = vectors.getLayers().getArray();
  let outFeatures = [];
  layers.forEach(l => {
    if (saveType == 'saveall' || l.get('id') == id) {
      // add features from all vector sources or from specific layer
      outFeatures = outFeatures.concat(l.get('source').getFeatures());
    }
  });
  // geometry only output only makes sense if GeoJSON and only 1 feature
  // FIXME well, all right, it could output a GeometryCollection
  const geoonly = $('#geoonly').checked && formatType == 'GeoJSON' &&
      outFeatures.length === 1;
  function doWrite(features, reproject, geoonly) {
    const opts = {
      decimals: DECIMALS
    };
    if (reproject) {
      opts.featureProjection = map.get('view').getProjection();
    }
    const out = geoonly ?
      format.writeGeometry(features[0].getGeometry(), opts) :
      format.writeFeatures(features, opts);
    return out;
  }
  let op = doWrite(outFeatures, true, geoonly);
  if (tolerance) {
    // bit long-winded to read features and write out again, but has advantages:
    // - simplify does not operate on the rendered features
    // - features are always in 4326 latlons
    // browser seems to struggle with large datasets though
    if (geoonly) {
      const feats = [new Feature(format.readGeometry(op).simplify(tolerance))];
      op = doWrite(feats, false, geoonly);
    } else {
      let serFeatures = [];
      serFeatures = format.readFeatures(op);
      serFeatures.forEach(f => {
        f.setGeometry(f.getGeometry().simplify(tolerance));
      });
      op = doWrite(serFeatures, false, geoonly);
    }
  }
  $('#serialOP').value = op;
  layerId = id; // save id for reserialise
}

export default serialise;
