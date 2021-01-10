/**
 * Adds zoom dropdown to map to enable simple zoom-level change.
 */

// import templates
import tpl from './zoom.htm.js';
import Component from './component.js';
var component = new Component(tpl);

import olMap from '../../olMap.js';
var map = olMap.get();

// add zoomtemplate to map
var template = component.getTemplate('zoom');
olMap.addControl(template);

var level = document.querySelector('#zoomLevel');
level.addEventListener('change', function() {
  map.get('view').setZoom(level.value);
  this.blur();
});


export default {
  setZooms: function() {
    for (var i = 0; i < map.get('view').zoomLevels; i++) {
      var option = document.createElement('option');
      option.value = i;
      option.text = i;
      level.appendChild(option);
    }
    level.value = Math.round(map.get('view').getZoom());
    map.get('view').on('change:resolution', function(e) {
      level.value = Math.round(map.get('view').getZoom());
    });
  }
};
