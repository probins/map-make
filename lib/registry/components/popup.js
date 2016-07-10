/**
 * Creates an ol.Overlay for displaying attributes.
 * Used by draw and featuredisplay, and not added directly.
 */

// import templates
var tpl = require('components/popup.html');
var Component = require('components/component');
var component = new Component(tpl);

var map = require('olMap.js').get();
var ol = require('ol.js');

var temp = component.getTemplate('popup');
document.body.appendChild(temp.querySelector('style'));

var overlay = new ol.Overlay({
  element: temp.querySelector('div'),
  positioning: 'bottom-center',
  offset: [0, -15],
  stopEvent: true
});
map.addOverlay(overlay);

module.exports = {
  getOverlay: function() {
    return overlay;
  }
};
