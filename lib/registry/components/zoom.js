// import templates
var tpl = require('components/zoom.html!text');
var Component = require('components/component');
var component = new Component(tpl);

var utils = require('utils');
var $ = utils.$;
var ol = require('ol');
var map = require('olMap').get();

// add zoomtemplate to map
// use ol.control to prevent event propagation
map.addControl(new ol.control.Control({element: component.getTemplate('zoom')}));

$('#zoomLevel').addEventListener('change', function() {
  map.getView().setZoom($('#zoomLevel').value);
});


module.exports = {
  setZooms: function() {
    for (var i=0; i < map.getView().zoomLevels; i++) {
      var option = document.createElement('option');
      option.value = i;
      option.text = i;
      $('#zoomLevel').appendChild(option);
    }
    $('#zoomLevel').value = map.getView().getZoom();
    map.getView().on('change:resolution', function(e) {
      $('#zoomLevel').value = map.getView().getZoom();
    });
  }
};
