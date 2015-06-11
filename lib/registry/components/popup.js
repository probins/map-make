// import templates
var tpl = require('components/popup.html');
var Component = require('components/component');
var component = new Component(tpl);

var map = require('olMap').get();
var ol = require('ol');

var temp = component.getTemplate('popup');
document.body.appendChild(temp.querySelector('style'));

var overlay = new ol.Overlay({
  element: temp.querySelector('div'),
  positioning: 'bottom-center',
  stopEvent: true
});
map.addOverlay(overlay);

module.exports = {
  getOverlay: function() {
    return overlay;
  }
};
