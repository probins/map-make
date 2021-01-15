/**
 * Adds zoom dropdown to map to enable simple zoom-level change.
 */

// import templates
import tpl from './zoom.htm.js';
import Component from './component.js';
const component = new Component(tpl);

import olMap from '../../olMap.js';
let map = olMap.get();

// add zoomtemplate to map
let template = component.getTemplate('zoom');
olMap.addControl(template);

let level = document.querySelector('#zoomLevel');
level.addEventListener('change', () => {
  map.get('view').setZoom(level.value);
  this.blur();
});


export default {
  setZooms: function() {
    for (let i = 0; i < map.get('view').zoomLevels; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.text = i;
      level.appendChild(option);
    }
    level.value = Math.round(map.get('view').getZoom());
    map.get('view').on('change:resolution', (e) => {
      level.value = Math.round(map.get('view').getZoom());
    });
  }
};
