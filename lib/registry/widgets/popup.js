var ol = require('ol');
var olMap = require('olMap');
var map = olMap.get();

var popup = document.createElement('div');
popup.id = 'popup';
popup.style.backgroundColor = 'white';
document.body.appendChild(popup);
var overlay = new ol.Overlay({
  element: document.getElementById('popup'),
  positioning: 'bottom-center',
  stopEvent: true
});

// highlight feature duplicates what's in tooltip
// FIXME only use once if both are present
var highlightOverlay = new ol.FeatureOverlay({
  map: map,
  style: olMap.getStyle('highlight')
});

// click on feature displays attributes in overlay
map.on(['singleclick'], function(evt) {
  // uses overlay and highlightOverlay as closure
  highlightOverlay.getFeatures().clear();
  var html = '';
  map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    if (html !== '') {
      // if >1 feature, displays all in one box
      html += '<br>';
    }
    html += 'Id: '	+ feature.getId();
    var atts = feature.getProperties();
    for (var att in atts) {
      if (att != 'geometry') {
        html += '<br>' + att + ': ' + atts[att];
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
    overlay.setPosition(evt.coordinate);
  } else {
    el.innerHTML = '';
    el.style.display = 'none';
  }
});
map.addOverlay(overlay);
