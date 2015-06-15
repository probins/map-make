var tpl = require('components/addlayer.html');
var Component = require('components/component');
var component = new Component(tpl, 'addlayer');

var utils = require('utils');
var $ = utils.$;
var olMap = require('olMap');
var map = olMap.get();

// make sure toolbar initialised
require('components/toolbar');

// add addlayertemplate to toolbar
$('#layers-content').appendChild(component.getTemplate('addlayer'));

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
  var url = $('#vectorfile').value;
  var option = {
    url: url,
    id: $('#vectorname').value || url,
    add: true
  };
  if ($('#mongodb').checked === true) {
    option.type = 'mongodb';
  }
  vectors.add({vectors: [option]});
  if (rasters.getLayers().getLength() == 0) {
    olMap.use4326View();
  }
  delete(option.add);
  mapDef.vectors = mapDef.vectors || [];
  mapDef.vectors.push(option);
});
