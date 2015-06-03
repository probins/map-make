var map = require('olMap').get();
var ol = require('ol');

var el = document.createElement('div');
el.id = 'popup';
el.style.backgroundColor = 'white';

var overlay = new ol.Overlay({
  element: el,
  positioning: 'bottom-center',
  stopEvent: true
});
map.addOverlay(overlay);

// var mapDef = require('mapDef').get();
// mapDef.components = mapDef.components || {};
// mapDef.components.popup = true;

module.exports = {
  getOverlay: function() {
    return overlay;
  }
};
