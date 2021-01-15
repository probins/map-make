/**
 * Uses popup component
 *
 * Displays attribute values for a vector feature on click
 */

// import templates
import tpl from './featuredisplay.htm.js';
import Component from './component.js';
const component = new Component(tpl, 'featuredisplay');

let featureTemplate = component.getTemplate('featuredisplay');
import olMap from '../../olMap.js';
let map = olMap.get();
import select from '../../select.js';
import { getLength } from '../../measure.js';
import { transformCoords } from '../../olUtils.js';

import popup from './popup.js';
let overlay = popup.getOverlay();

select.displayOn(function(e) {
// click on feature displays attributes in overlay
  // uses overlay as closure
  let el = overlay.get('element');
  if (e.selected.length > 0) {
    let feature = e.selected[0];
    let featureDisplay = featureTemplate.querySelector('.featureDisplay').cloneNode(true);
    featureDisplay.querySelector('.featureId').innerHTML = feature.getId();
    let atts = feature.getProperties();
    for (let att in atts) {
      // ignore attributes called geometry or having mongo objectid
      if (atts[att] && !atts[att]['$oid'] && att != 'geometry') {
        // if mongo $date convert to Date
        let val = (atts[att]['$date']) ? new Date(atts[att]['$date']) : atts[att];
        let attNode = featureTemplate.querySelector('.featureAtt').cloneNode(true);
        attNode.innerHTML = att + ': ' + val;
        featureDisplay.querySelector('.featureAtts').appendChild(attNode);
      }
    }
    let geom = feature.getGeometry();
    // getType only exported for linestrings
    if (geom.getType && geom.getType() === 'LineString') {
      // get length for linestrings
      let coords = transformCoords(geom, map.get('view').getProjection())
      let lenHav = getLength(coords);
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
