/**
 * Enable writing of mapDef for saving and future use
 */

import tpl from './mapdef.htm.js';
import Component from './component.js';
import { $ } from '../../utils.js';
// make sure toolbar initialised
import './toolbar.js';
import mapDef from '../../mapDef.js';
import { transform } from '../../deps.js';
import olMap from '../../olMap.js';

const component = new Component(tpl, 'mapdef');
// add mapDeftemplate to toolbar
$('#mapDef-content').appendChild(component.getTemplate('mapdef'));

let map = olMap.get();

$('#mapdefurl').addEventListener('change', function() {
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
