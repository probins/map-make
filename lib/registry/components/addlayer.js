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
const component = new Component(tpl, 'addlayer');

import Awesomplete from './ext/awesomplete.min.js';

import utils from '../../utils.js';
const $ = utils.$;
import olMap from '../../olMap.js';
let map = olMap.get();

// make sure toolbar initialised
import './toolbar.js';

// add addlayertemplate to toolbar
$('#layers-content').appendChild(component.getTemplate('addlayer'));

import sourceList from '../sources/sourcelist.js';

new Awesomplete(document.querySelector('#rastercode'), {list: sourceList, minChars: 1});

import md from '../../mapDef.js';
const mapDef = md.get();
import rasters from '../../rasters.js';
import vectors from '../../vectors.js';

$('#addraster').addEventListener('click', () => {
  const code = $('#rastercode').value;
  import('../sources/' + code + '.js')
  .then(m => {
    let options;
    // use apikey if entered
    if ($('#api').value) {
      options = {rasters: []};
      let raster = {};
      raster[code] = $('#api').value;
      options.rasters.push(raster);
    }
    rasters.add([m], options);
    mapDef.rasters = mapDef.rasters || [];
    mapDef.rasters.push(code);
    let layers = rasters.getLayers();
    let id = layers.item(layers.get('length') - 1).getProperties().id;
    let bound = rasters.changeLayer.bind(map);
    bound(id);
    // won't exist if started from 0
    let div = $('#' + id.replace(/ |\(\)/g,''));
    if (div) {
      div.checked = true;
    }
    $('#rastercode').value = '';
    $('#api').value = '';
  });
});

$('#addvector').addEventListener('click', () => {
  let option = {
    add: true
  };
  if ($('#mongodb').checked === true) {
    option.format = 'mongo';
  }
  if ($('#vectorurl').value) {
    let url = $('#vectorurl').value;
    option.url = url;
    option.id = $('#vectorname').value || url;
    addVectors(option);
  }
  if ($('#vectorfile').files.length > 0) { // file entered
    const file = $('#vectorfile').files[0];
    option.type = 'file';
    option.filename = file.name;
    option.id = $('#vectorname').value || file.name;
    let reader = new FileReader();
    reader.onload = e => {
      option.file = e.target.result;
      addVectors(option);
    };
    reader.readAsText(file);
  }
  function addVectors(option) {
    vectors.add({vectors: [option]});
    if (rasters.getLayers().get('length') === 0) {
      olMap.use4326View();
    }
    $('#vectorurl').value = '';
    $('#fileform').reset();
    delete option.add;
    mapDef.vectors = mapDef.vectors || [];
    mapDef.vectors.push(option);
  }
});
