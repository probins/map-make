var ol = require('ol');
var olMap = require('olMap');
var map = olMap.get();

var tooltip = document.createElement('div');
tooltip.id = 'tooltip';
tooltip.style.position = 'absolute';
tooltip.style.zIndex = '20000';
tooltip.style.backgroundColor = 'white';
document.body.appendChild(tooltip);

// highlight feature duplicates what's in popup
// only use once if both are present
if (!map.highlightOverlay) {
  map.highlightOverlay = new ol.FeatureOverlay({
    map: map,
    style: olMap.getStyle('highlight')
  // style: function(feature, resolution) {
  //   return [olMap.getStyle('highlight')];
  // }
  });
}
var highlightedFeature;

/**
 * with canvas, vectors have no separate identity, so have to use mousemove
 * with map.forEachFeatureAtPixel() to establish whether there is a feature at the
 * new mouse position. If so, make the tooltip div visible with title attribute
 */
map.getViewport().onmousemove = function(evt) {
  var pixel = map.getEventPixel(evt);
  // if >1 feature at same pixel, e.g. points on top of polygon, uses last
  var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    return feature;
  }, null, function(l) {
    // use only vector layers
    return ol.layer.Vector && l instanceof ol.layer.Vector;
  });
  var tooltip = document.getElementById('tooltip');
  var html;
  if (feature) {
    html = feature.getProperties().name || feature.getProperties().title;
  }
  if (html) {
    tooltip.innerHTML = html;
    tooltip.style.left = (pixel[0] + 10) + 'px';
    tooltip.style.top = (pixel[1] + 10) + 'px';
    tooltip.style.display = 'block';
    // change cursor to indicate to users that they can click on this point
    map.getTarget().style.cursor = 'pointer';
  } else {
    tooltip.style.display = 'none';
    map.getTarget().style.cursor = '';
  }
  if (feature !== highlightedFeature) {
    if (highlightedFeature) {
      map.highlightOverlay.removeFeature(highlightedFeature);
    }
    if (feature) {
      map.highlightOverlay.addFeature(feature);
    }
    highlightedFeature = feature;
  }
};
