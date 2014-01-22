var ol = require('ol');
var olMap = require('olMap');
var map = olMap.get();

var popup = document.createElement('div');
popup.id = 'popup';
popup.style.backgroundColor = 'white';
document.body.appendChild(popup);
var overlay = new ol.Overlay({
  element: document.getElementById('popup'),
  positioning: ol.OverlayPositioning.BOTTOM_CENTER,
  stopEvent: true
});

// highlight feature duplicates what's in tooltip
// FIXME only use once if both are present
var highlightOverlay = new ol.render.FeaturesOverlay({
  map: map,
  styleFunction: function(feature, resolution) {
    return [olMap.getStyle('highlight')];
  }
});

// click on feature displays attributes in overlay
map.on(['singleclick'], function(evt) {
  // uses overlay and highlightOverlay as closure
  highlightOverlay.getFeatures().clear();
  var pixel = map.getEventPixel(evt.browserEvent),
      html = '';
  map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    if (html !== '') {
      // if >1 feature, displays all in one box
      html += '<br>';
    }
    html += 'Id: '	+ feature.getId();
    var atts = feature.getKeys();
    for (var j = 0; j < atts.length; j++) {
      if (atts[j] != 'geometry') {
        html += '<br>' + atts[j] + ': ' + feature.get(atts[j]);
      }
    }
    highlightOverlay.addFeature(feature);
  }, null, function(l) {
    // use only vector layers
    return ol.layer.Vector && l instanceof ol.layer.Vector;
  });

  var el = overlay.getElement();
  if (html !== '') {
    el.innerHTML = html;
    el.style.display = 'block';
    overlay.setPosition(evt.getCoordinate());
  } else {
    el.innerHTML = '';
    el.style.display = 'none';
  }
});
map.addOverlay(overlay);
