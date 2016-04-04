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
    var id = m.getLayers()[0].getProperties().id;
    var bound = rasters.changeLayer.bind(map);
    bound(id);
    // won't exist if started from 0
    var div = $('#' + id.replace(/ /g,''));
    if (div) {
      div.checked = true;
    }
  });
});

$('#addvector').addEventListener('click', function() {
  var option = {
    add: true
  };
  if ($('#vectorurl').value) {
    var url = $('#vectorurl').value;
    option.url = url;
    if ($('#mongodb').checked === true) {
      option.type = 'mongodb';
    }
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
    delete option.add;
    mapDef.vectors = mapDef.vectors || [];
    mapDef.vectors.push(option);
  }
});
