import utils from '../../utils.js';
var $ = utils.$;
import { Feature } from '../../deps.js';
import olMap from '../../olMap.js';
var map = olMap.get();
import vectors from '../../vectors.js';

// import templates
import tpl from './serialise.htm.js';
import Component from './component.js';
var component = new Component(tpl);

// make sure toolbar initialised
import './toolbar.js';
$('#toolbar').appendChild(component.getTemplate('serialise'));

// FIXME should be configurable
var DECIMALS = 6; // coordinate decimal places, used by save
var formatType = 'GeoJSON'; // default output format

// add toggle listener to toolbartitle div
$('#serialise-title').addEventListener('click', function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
});

var saveall, layerId;
$('#reserialise').onclick = function(e) {
  serialise(saveall, layerId, $('#tolerance').value);
};

$('#download').onclick = function(e) {
  var mediaTypes = {
    GeoJSON: 'application/vnd.geo+json',
    GPX: 'application/gpx+xml',
    KML: 'application/vnd.google-earth.kml+xml',
    mongo: 'application/json'
  };
  e.target.href = 'data:' + mediaTypes[formatType]
      + ';charset=utf-8,' + encodeURIComponent($('#serialOP').value);
  var ext = (formatType == 'mongo') ? 'json' : formatType.toLowerCase();
  e.target.download = 'myGeoData.' + ext;
};

function serialise(saveType, id, tolerance) {
  formatType = $('#opformat').value;
  var format = vectors.getFormat(formatType);
  var layers = vectors.getLayers().getArray();
  var outFeatures = [];
  layers.forEach(function(l) {
    if (saveType == 'saveall' || l.get('id') == id) {
      // add features from all vector sources or from specific layer
      outFeatures = outFeatures.concat(l.get('source').getFeatures());
    }
  });
  // geometry only output only makes sense if GeoJSON and only 1 feature
  // FIXME well, all right, it could output a GeometryCollection
  var geoonly = $('#geoonly').checked && formatType == 'GeoJSON' &&
      outFeatures.length === 1;
  function doWrite(features, reproject, geoonly) {
    var opts = {
      decimals: DECIMALS
    };
    if (reproject) {
      opts.featureProjection = map.get('view').getProjection();
    }
    var out = geoonly ?
      format.writeGeometry(features[0].getGeometry(), opts) :
      format.writeFeatures(features, opts);
    return out;
  }
  var op = doWrite(outFeatures, true, geoonly);
  if (tolerance) {
    // bit long-winded to read features and write out again, but has advantages:
    // - simplify does not operate on the rendered features
    // - features are always in 4326 latlons
    // browser seems to struggle with large datasets though
    if (geoonly) {
      var feats = [new Feature(format.readGeometry(op).simplify(tolerance))];
      op = doWrite(feats, false, geoonly);
    } else {
      var serFeatures = [];
      serFeatures = format.readFeatures(op);
      serFeatures.forEach(function(f) {
        f.setGeometry(f.getGeometry().simplify(tolerance));
      });
      op = doWrite(serFeatures, false, geoonly);
    }
  }
  $('#serialOP').value = op;
  layerId = id; // save id for reserialise
}

export default serialise;
