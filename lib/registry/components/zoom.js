/**
 * Adds zoom dropdown to map to enable simple zoom-level change.
 */

// import templates
var tpl = require('components/zoom.html');
var Component = require('components/component');
var component = new Component(tpl);

var ol = require('ol');
var map = require('olMap').get();

// add zoomtemplate to map
var template = component.getTemplate('zoom');
var level = template.querySelector('#zoomLevel');
// use ol.control to prevent event propagation
map.addControl(new ol.control.Control({element: template}));

level.addEventListener('change', function() {
  map.getView().setZoom(level.value);
  this.blur();
});


module.exports = {
  setZooms: function() {
    for (var i = 0; i < map.getView().zoomLevels; i++) {
      var option = document.createElement('option');
      option.value = i;
      option.text = i;
      level.appendChild(option);
    }
    level.value = map.getView().getZoom();
    map.getView().on('change:resolution', function(e) {
      level.value = map.getView().getZoom();
    });
  }
};
