/**
 * Adds a button to the map which on click uses navigator.geolocation.getCurrentPosition()
 * and zooms to those coordinates.
 *
 * The screen position of the button is determined by css in html file.
 */

var tpl = require('components/geolocation.html');
var Component = require('components/component');
var component = new Component(tpl, 'geolocation');

var ol = require('ol.js');
var map = require('olMap.js').get();

// add geolocationtemplate to map
var template = component.getTemplate('geolocation');
// use ol.control to prevent event propagation
map.addControl(new ol.control.Control({element: template}));

var utils = require('utils.js');
var $ = utils.$;

//FIXME English
var msgs = {
  ERROR: 'Unable to retrieve your location',
  OUTSIDE: 'Position outside map extent',
  UNSUPPORTED: 'Geolocation is not supported by your browser'
};

template = component.getTemplate('geomarker');
var markerEl = template.getElementById('geomarker');
var marker = new ol.Overlay({
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
    coord = ol.proj.transform(coord, 'EPSG:4326', map.getView().getProjection());
    if (!ol.extent.containsCoordinate(map.getView().extent, coord)) {
      alert(msgs.OUTSIDE);
    } else {
      map.getView().setCenter(coord);
      map.getView().setZoom(map.getView().zoomIn);
      var rotation = position.heading ? position.heading - 45 : -45;
      markerEl.firstChild.style.transform = 'rotate(' + rotation + 'deg)';
      marker.setPosition(coord);
    }
  }
  function error() {
    alert(msgs.ERROR);
  }
  navigator.geolocation.getCurrentPosition(success, error);
});

// add helptemplate to toolbar
// make sure toolbar initialised
require('components/toolbar');
$('#help-content').appendChild(component.getTemplate('geolocationhelp'));
// add toggle listener to helptitle div
$('#geolocation-title').addEventListener('click', function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
});
