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

import { transform } from '../../deps.js';
import olMap from '../../olMap.js';
var map = olMap.get();
$('#setLatLon').addEventListener('click', function() {
  var coord = [parseFloat($('#lon').value),
      parseFloat($('#lat').value)];
  coord = transform(coord, 'EPSG:4326', map.get('view').getProjection());
  var extent = map.get('view').extent;
  // copied from ol.extent.containsCoordinate
  if (!(extent[0] <= coord[0] && coord[0] <= extent[2] && extent[1] <= coord[1] && coord[1] <= extent[3])) {
    alert('Coordinate outside map extent'); //FIXME English
  } else {
    map.get('view').setCenter(coord);
    map.get('view').setZoom(map.get('view').zoomIn);
  }
});
