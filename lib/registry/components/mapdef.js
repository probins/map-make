/**
 * Enable writing of mapDef for saving and future use
 */

var tpl = require('./mapdef.htm').default;
var Component = require('./component.js');
var component = new Component(tpl, 'mapdef');

var utils = require('../../utils.js');
var $ = utils.$;

// make sure toolbar initialised
require('./toolbar.js');

// add mapDeftemplate to toolbar
$('#mapDef-content').appendChild(component.getTemplate('mapdef'));

var mapDef = require('../../mapDef.js');
var ol = require('../../ol.js');
var map = require('../../olMap.js').get();

$('#mapdefurl').addEventListener('change', function() {
  window.location.search = 'mapDef=' + this.value;
});
$('#createMapDef').addEventListener('click', function() {
  var op = mapDef.get();
  var view = map.getView();
  var center = ol.proj.transform(view.getCenter(), view.getProjection(), 'EPSG:4326');
  op.center = {lat: center[1], lon: center[0]};
  op.zoom = view.getZoom();
  $('#mapDefOP').value = JSON.stringify(op);
});
