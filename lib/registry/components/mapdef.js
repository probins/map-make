/**
 * Enable writing of mapDef for saving and future use
 */

import tpl from './mapdef.htm.js';
import Component from './component.js';
const component = new Component(tpl, 'mapdef');

import { $ } from '../../utils.js';

// make sure toolbar initialised
import './toolbar.js';

// add mapDeftemplate to toolbar
$('#mapDef-content').appendChild(component.getTemplate('mapdef'));

import mapDef from '../../mapDef.js';
import { transform } from '../../deps.js';
import olMap from '../../olMap.js';
let map = olMap.get();

$('#mapdefurl').addEventListener('change', () => {
  window.location.search = 'mapDef=' + this.value;
});
$('#createMapDef').addEventListener('click', () => {
  let op = mapDef.get();
  let view = map.get('view');
  let center = transform(view.get('center'), view.getProjection(), 'EPSG:4326');
  op.center = {lat: center[1], lon: center[0]};
  op.zoom = view.getZoom();
  $('#mapDefOP').value = JSON.stringify(op);
});
