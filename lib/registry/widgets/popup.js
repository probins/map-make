// uses ol.sphere.WGS84.haversineDistance() not in standard exports
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
map.on('singleclick', function(evt) {
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
    var geom = feature.getGeometry().clone();
    if (geom.getLength) {
      // get length for linestrings
      var projCode = map.getView().getProjection().getCode();
      if (projCode != 'EPSG:4326' && projCode != 'EPSG:3857') {
        // no point in projected plane length for these projections
        html += '<br>length (projected plane): ' + Math.round(geom.getLength() * 0.1) / 100 + 'km';
      }
      // Haversine calculation needs 4326 coords
      geom.applyTransform(ol.proj.getTransform(projCode, 'EPSG:4326'));
      var coords = geom.getCoordinates();
      var length = 0.0;
      for (var i = 1; i < coords.length; i++) {
        length += ol.sphere.WGS84.haversineDistance(coords[i-1], coords[i]);
      }
      html += '<br>length (Haversine): ' + Math.round(length * 0.1) / 100 + 'km';
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
