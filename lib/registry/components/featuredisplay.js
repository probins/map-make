/**
 * Uses popup component
 *
 * Displays attribute values for a vector feature on click
 */

// import templates
import tpl from './featuredisplay.htm.js';
import Component from './component.js';
var component = new Component(tpl, 'featuredisplay');

var featureTemplate = component.getTemplate('featuredisplay');
import olMap from '../../olMap.js';
var map = olMap.get();
import select from '../../select.js';
import measure from '../../measure.js';

import popup from './popup.js';
var overlay = popup.getOverlay();

select.displayOn(function(e) {
// click on feature displays attributes in overlay
  // uses overlay as closure
  var el = overlay.get('element');
  if (e.selected.length > 0) {
    var feature = e.selected[0];
    var featureDisplay = featureTemplate.querySelector('.featureDisplay').cloneNode(true);
    featureDisplay.querySelector('.featureId').innerHTML = feature.getId();
    var atts = feature.getProperties();
    for (var att in atts) {
      // ignore attributes called geometry or having mongo objectid
      if (atts[att] && !atts[att]['$oid'] && att != 'geometry') {
        // if mongo $date convert to Date
        var val = (atts[att]['$date']) ? new Date(atts[att]['$date']) : atts[att];
        var attNode = featureTemplate.querySelector('.featureAtt').cloneNode(true);
        attNode.innerHTML = att + ': ' + val;
        featureDisplay.querySelector('.featureAtts').appendChild(attNode);
      }
    }
    var geom = feature.getGeometry();
    // getType only exported for linestrings
    if (geom.getType && geom.getType() === 'LineString') {
      // get length for linestrings
      var lenHav = measure.getLength(geom, map.get('view').getProjection());
      featureDisplay.querySelector('.featureLenHav').innerHTML =
          Math.round(lenHav * 0.1) / 100;
    } else {
      featureDisplay.querySelector('.featureHav').style.display = 'none';
    }

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(featureDisplay);
    el.style.display = 'block';
    overlay.set('position', e.mapBrowserEvent.coordinate);
  } else {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.style.display = 'none';
  }
});
