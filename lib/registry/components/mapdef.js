  var tpl = require('components/mapdef.html');
  var Component = require('components/component');
  var component = new Component(tpl);

  var utils = require('utils');
  var $ = utils.$;
  $('#addmapDef').style.display = 'none';
  // make sure toolbar initialised
  require('components/toolbar');

  // add mapDeftemplate to toolbar
  $('#mapDef-content').appendChild(component.getTemplate('mapdef'));

  var mapDef = require('mapDef');
  var ol = require('ol');
  var map = require('olMap').get();

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
