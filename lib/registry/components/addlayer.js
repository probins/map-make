/**
 * Component to add one or more raster or vector layer(s) to the map.
 * Raster layers are those defined in registry/sources/; these may require an
 * api key to use.
 *
 * Uses Awesomplete for autocompletion based on sources/list.json
 */

var tpl = require('components/addlayer.html');
var Component = require('components/component');
var component = new Component(tpl, 'addlayer');

var Awesomplete = require('awesomplete.min');
var list = require('sources/list.json');

var utils = require('utils');
var $ = utils.$;
var olMap = require('olMap');
var map = olMap.get();

// make sure toolbar initialised
require('components/toolbar');

// add addlayertemplate to toolbar
$('#layers-content').appendChild(component.getTemplate('addlayer'));

new Awesomplete(document.querySelector('#rastercode'), {list: list, minChars: 1});

var mapDef = require('mapDef').get();
var rasters = require('rasters');
var vectors = require('vectors');

$('#addraster').addEventListener('click', function() {
  var code = $('#rastercode').value;
  System.import('sources/' + code)
  .then(function(m) {
    var options;
    // use apikey if entered
    if ($('#api').value) {
      options = {rasters: []};
      var raster = {};
      raster[code] = $('#api').value;
      options.rasters.push(raster);
    }
    rasters.add([m], options);
    mapDef.rasters = mapDef.rasters || [];
    mapDef.rasters.push(code);
    var layers = rasters.getLayers();
    var id = layers.item(layers.getLength() - 1).getProperties().id;
    var bound = rasters.changeLayer.bind(map);
    bound(id);
    // won't exist if started from 0
    var div = $('#' + id.replace(/ /g,''));
    if (div) {
      div.checked = true;
    }
    $('#rastercode').value = '';
    $('#api').value = '';
  });
});

$('#addvector').addEventListener('click', function() {
  var option = {
    add: true
  };
  if ($('#mongodb').checked === true) {
    option.format = 'mongo';
  }
  if ($('#vectorurl').value) {
    var url = $('#vectorurl').value;
    option.url = url;
    option.id = $('#vectorname').value || url;
    addVectors(option);
  }
  if ($('#vectorfile').files.length > 0) { // file entered
    var file = $('#vectorfile').files[0];
    option.type = 'file';
    option.filename = file.name;
    option.id = $('#vectorname').value || file.name;
    var reader = new FileReader();
    reader.onload = function(e) {
      option.file = e.target.result;
      addVectors(option);
    };
    reader.readAsText(file);
  }
  function addVectors(option) {
    vectors.add({vectors: [option]});
    if (rasters.getLayers().getLength() === 0) {
      olMap.use4326View();
    }
    $('#vectorurl').value = '';
    $('#fileform').reset();
    delete option.add;
    mapDef.vectors = mapDef.vectors || [];
    mapDef.vectors.push(option);
  }
});
