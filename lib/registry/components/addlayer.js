/**
 * Component to add one or more raster or vector layer(s) to the map.
 * Raster layers are those defined in registry/sources/; these may require an
 * api key to use.
 *
 * uses import()
 *
 * Uses Awesomplete for autocompletion based on sources/list.json, which is
 * loaded with fetch()
 */

import tpl from './addlayer.htm.js';
import Component from './component.js';
import Awesomplete from './ext/awesomplete.min.js';
import { $ } from '../../utils.js';
import olMap from '../../olMap.js';
// make sure toolbar initialised
import './toolbar.js';
import sourceList from '../sources/sourcelist.js';
import md from '../../mapDef.js';
import rasters from '../../rasters.js';

const component = new Component(tpl, 'addlayer');
// add addlayertemplate to toolbar
$('#layers-content').appendChild(component.getTemplate('addlayer'));

const mapDef = md.get();

new Awesomplete(document.querySelector('#rastercode'), {list: sourceList, minChars: 1});

const map = olMap.get();

$('#addraster').addEventListener('click', () => {
  const code = $('#rastercode').value;
  import('../sources/' + code + '.js')
  .then(m => {
    let options;
    // use apikey if entered
    if ($('#api').value) {
      options = {rasters: []};
      const raster = {};
      raster[code] = $('#api').value;
      options.rasters.push(raster);
    }
    rasters.add([m], options);
    mapDef.rasters = mapDef.rasters || [];
    mapDef.rasters.push(code);
    const layers = rasters.getLayers();
    const id = layers.item(layers.get('length') - 1).getProperties().id;
    const bound = rasters.changeLayer.bind(map);
    bound(id);
    // won't exist if started from 0
    const div = $('#' + id.replace(/ |\(\)/g,''));
    if (div) {
      div.checked = true;
    }
    $('#rastercode').value = '';
    $('#api').value = '';
  });
});

$('#addvector').addEventListener('click', () => {
  const option = {
    add: true
  };
  if ($('#mongodb').checked === true) {
    option.format = 'mongo';
  }
  if ($('#vectorurl').value) {
    const url = $('#vectorurl').value;
    option.url = url;
    option.id = $('#vectorname').value || url;
    addVectors(option);
  }
  if ($('#vectorfile').files.length > 0) { // file entered
    const file = $('#vectorfile').files[0];
    option.type = 'file';
    option.filename = file.name;
    option.id = $('#vectorname').value || file.name;
    const reader = new FileReader();
    reader.onload = e => {
      option.file = e.target.result;
      addVectors(option);
    };
    reader.readAsText(file);
  }
  function addVectors(option) {
    // import vectors.js only when needed
    import('../../vectors.js')
    .then(m => {
      const vectors = m.default;
      vectors.add({vectors: [option]});
      if (rasters.getLayers().get('length') === 0) {
        olMap.use4326View();
      }
      $('#vectorurl').value = '';
      $('#fileform').reset();
      delete option.add;
      mapDef.vectors = mapDef.vectors || [];
      mapDef.vectors.push(option);
    });
  }
});
