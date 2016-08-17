/**
 * Allows users to enter a lat/lon coordinate which will then become the map center
 */

import tpl from './center.htm.js';
import Component from './component.js';
var component = new Component(tpl, 'center');

import utils from '../../utils.js';
var $ = utils.$;
// make sure toolbar initialised
import './toolbar.js';

// add centertemplate to toolbar
$('#components-content').appendChild(component.getTemplate('center'));

import ol from '../../ol.js';
import olMap from '../../olMap.js';
var map = olMap.get();
$('#setLatLon').addEventListener('click', function() {
  var coord = [parseFloat($('#lon').value),
      parseFloat($('#lat').value)];
  coord = ol.proj.transform(coord, 'EPSG:4326', map.getView().getProjection());
  if (!ol.extent.containsCoordinate(map.getView().extent, coord)) {
    alert('Coordinate outside map extent'); //FIXME English
  } else {
    map.getView().setCenter(coord);
    map.getView().setZoom(map.getView().zoomIn);
  }
});
