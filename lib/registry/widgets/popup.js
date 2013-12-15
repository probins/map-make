var ol = require('ol');
var map = require('olMap').get();

var popup = document.createElement('div');
popup.id = 'popup';
popup.style.backgroundColor = 'white';
document.body.appendChild(popup);
var overlay = new ol.Overlay({
  element: document.getElementById('popup'),
  positioning: ol.OverlayPositioning.BOTTOM_CENTER,
  stopEvent: true
});
// click on feature displays attributes in overlay
map.on(['click'], function(evt) {
  // uses overlay as closure
  map.getFeatures({
    pixel: evt.getPixel(),
    layers: map.getLayers().getArray().filter(function(l) {
      return l instanceof ol.layer.Vector;
    }),
    success: function(featuresByLayer) {
      var features = [];
      for (var i = 0; i < featuresByLayer.length; i++) {
        features = features.concat(featuresByLayer[i]);
      }
      var html = '';
      // if >1 feature, displays all in one box
      for (i = 0; i < features.length; i++) {
        if (i !== 0) {
          html += '<br>';
        }
        html += 'Id: '	+ features[i].getId();
        var atts = features[i].getAttributes(true);
        for (var att in atts) {
          html += '<br>' + att + ': ' + atts[att];
        }
      }
      var el = overlay.getElement();
      el.innerHTML = html;
      el.style.display = 'block';
      overlay.setPosition(evt.getCoordinate());
    }
  });
});
map.addOverlay(overlay);
