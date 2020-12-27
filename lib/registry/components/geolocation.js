/**
 * Adds a button to the map which on click uses navigator.geolocation.getCurrentPosition()
 * and zooms to those coordinates.
 *
 * The screen position of the button is determined by css in html file.
 */

import tpl from './geolocation.htm.js';
import Component from './component.js';
var component = new Component(tpl, 'geolocation');

import { Overlay, transform } from '../../deps.js';
import olMap from '../../olMap.js';
var map = olMap.get();

// add geolocationtemplate to map
var template = component.getTemplate('geolocation');
olMap.addControl(template);

import utils from '../../utils.js';
var $ = utils.$;

//FIXME English
var msgs = {
  ERROR: 'Unable to retrieve your location',
  OUTSIDE: 'Position outside map extent',
  UNSUPPORTED: 'Geolocation is not supported by your browser'
};

template = component.getTemplate('geomarker');
var markerEl = template.getElementById('geomarker');
var marker = new Overlay({
  positioning: 'center-center',
  element: markerEl
});
map.addOverlay(marker);

$('#geolocationbutton').addEventListener('click', function() {
  if (!navigator.geolocation) {
    alert(msgs.UNSUPPORTED);
    return;
  }
  function success(position) {
    var coord = [parseFloat(position.coords.longitude),
      parseFloat(position.coords.latitude)];
    coord = transform(coord, 'EPSG:4326', map.get('view').getProjection());
    var extent = map.get('view').extent;
    // copied from ol.extent.containsCoordinate
    if (!(extent[0] <= coord[0] && coord[0] <= extent[2] && extent[1] <= coord[1] && coord[1] <= extent[3])) {
      alert(msgs.OUTSIDE);
    } else {
      map.get('view').setCenter(coord);
      map.get('view').setZoom(map.get('view').zoomIn);
      var rotation = position.heading ? position.heading - 45 : -45;
      markerEl.firstChild.style.transform = 'rotate(' + rotation + 'deg)';
      marker.set('position', coord);
    }
  }
  function error() {
    alert(msgs.ERROR);
  }
  navigator.geolocation.getCurrentPosition(success, error);
});

// add helptemplate to toolbar
// make sure toolbar initialised
import './toolbar.js';
$('#help-content').appendChild(component.getTemplate('geolocationhelp'));
// add toggle listener to helptitle div
$('#geolocation-title').addEventListener('click', function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
});
