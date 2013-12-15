var ol = require('ol');
var map = require('olMap').get();

var tooltip = document.createElement('div');
tooltip.id = 'tooltip';
tooltip.style.position = 'absolute';
tooltip.style.zIndex = '20000';
tooltip.style.backgroundColor = 'white';
document.body.appendChild(tooltip);
/**
 * with canvas, vectors have no separate identity, so have to use mousemove
 * with map.getFeatures() to establish whether there is a feature at the
 * new mouse position. If so, make the tooltip div visible with title attribute
 */
map.on(['mousemove'], function(evt) {
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
      // only handles 1st feature
      // this might be problem if e.g. points on top of polygon:
      // which is required?
      var feature = features[0];
      var tooltip = document.getElementById('tooltip');
      // assumes only 1 canvas element
      var canvas = document.getElementsByTagName('canvas')[0];
      if (feature) {
        tooltip.innerHTML = feature.get('title') || '';
        tooltip.style.left = (evt.getPixel()[0] + 10) + 'px';
        tooltip.style.top = (evt.getPixel()[1] + 10) + 'px';
        tooltip.style.display = 'block';
        // change cursor to indicate to users that they can click on this point
        canvas.style.cursor = 'pointer';
      } else {
        tooltip.style.display = 'none';
        canvas.style.cursor = 'default';
      }
    }
  });
});
