/**
 * Enable writing of mapDef for saving and future use
 */

import tpl from './mapdef.htm.js';
import Component from './component.js';
var component = new Component(tpl, 'mapdef');

import utils from '../../utils.js';
var $ = utils.$;

// make sure toolbar initialised
import './toolbar.js';

// add mapDeftemplate to toolbar
$('#mapDef-content').appendChild(component.getTemplate('mapdef'));

import mapDef from '../../mapDef.js';
import ol from '../../ol.js';
import olMap from '../../olMap.js';
var map = olMap.get();

$('#mapdefurl').addEventListener('change', function() {
  window.location.search = 'mapDef=' + this.value;
});
$('#createMapDef').addEventListener('click', function() {
  var op = mapDef.get();
  var view = map.get('view');
  var center = ol.proj.transform(view.get('center'), view.getProjection(), 'EPSG:4326');
  op.center = {lat: center[1], lon: center[0]};
  op.zoom = view.getZoom();
  $('#mapDefOP').value = JSON.stringify(op);
});
