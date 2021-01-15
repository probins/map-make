/**
 * Displays a tooltip for vector features, using name or title property as available.
 */

// import templates
import tpl from './tooltip.htm.js';
import Component from './component.js';
const component = new Component(tpl, 'tooltip');

import utils from '../../utils.js';
const $ = utils.$;
import { Select } from '../../deps.js';
import olMap from '../../olMap.js';
import vectors from '../../vectors.js';
import { getLength } from '../../measure.js';
import { transformCoords } from '../../olUtils.js';

let select = new Select({
  // copied from ol/events/condition
  condition: function(mapBrowserEvent) {
    return mapBrowserEvent.type == 'pointermove';
  },
  layers: vectors.getLayers().getArray()
});

let map = olMap.get();
map.addInteraction(select);

select.on('select', (e) => {
  let html, pixel;
  let tooltip = $('#tooltip');
  if (e.selected.length > 0) {
    let feature = e.selected[0];
    pixel = e.mapBrowserEvent.pixel;
    html = feature.getProperties().name || feature.getProperties().title || '';
    let geom = feature.getGeometry();
    // getType only exported for linestrings
    if (geom.getType && geom.getType() === 'LineString') {
      // get length for linestrings
      let coords = transformCoords(geom, map.get('view').getProjection())
      let lenHav = getLength(coords);
      html += ' ' + (Math.round(lenHav * 0.1) / 100) + 'km';
    }
  }
  if (html) {
    tooltip.innerHTML = html;
    tooltip.style.left = (pixel[0] + 10) + 'px';
    tooltip.style.top = (pixel[1] + 10) + 'px';
    tooltip.style.display = 'block';
    // change cursor to indicate to users that they can click on this point
    tooltip.parentElement.parentElement.style.cursor = 'pointer';
  } else {
    tooltip.style.display = 'none';
    tooltip.parentElement.parentElement.style.cursor = '';
  }
});

$('.ol-viewport').appendChild(component.getTemplate('tooltip'));
