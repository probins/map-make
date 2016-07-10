/**
 * Displays a tooltip for vector features, using name or title property as available.
 */

// import templates
var tpl = require('components/tooltip.html');
var Component = require('components/component');
var component = new Component(tpl, 'tooltip');

var utils = require('utils.js');
var $ = utils.$;
var ol = require('ol.js');
var map = require('olMap.js').get();
map.getViewport().appendChild(component.getTemplate('tooltip'));
var vectors = require('vectors.js');
var measure = require('measure.js');

var select = new ol.interaction.Select({
  condition: ol.events.condition.pointerMove,
  layers: vectors.getLayers().getArray()
});

map.addInteraction(select);

select.on('select', function(e) {
  var html, pixel;
  var tooltip = $('#tooltip');
  if (e.selected.length > 0) {
    var feature = e.selected[0];
    pixel = e.mapBrowserEvent.pixel;
    html = feature.getProperties().name || feature.getProperties().title || '';
    var geom = feature.getGeometry();
    if (geom.getLength) {
      // get length for linestrings
      var lenHav = measure.getLength(geom, map.getView().getProjection());
      html += ' ' + (Math.round(lenHav * 0.1) / 100) + 'km';
    }
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
});
