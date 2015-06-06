// import templates
var tpl = require('components/zoom.html!text');
var div = document.createElement('div');
div.innerHTML = tpl;

var utils = require('utils');
var $ = utils.$;
var map = require('olMap').get();
map.getViewport().appendChild(div.querySelector('#zoomtemplate').content.cloneNode(true));

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
