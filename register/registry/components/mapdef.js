'use strict';

System.register(['./mapdef.htm.js', './component.js', '../../utils.js', './toolbar.js', '../../mapDef.js', '../../ol.js', '../../olMap.js'], function (_export, _context) {
  var tpl, Component, utils, mapDef, ol, olMap, component, $, map;
  return {
    setters: [function (_mapdefHtmJs) {
      tpl = _mapdefHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_toolbarJs) {}, function (_mapDefJs) {
      mapDef = _mapDefJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'mapdef');
      $ = utils.$;


      // add mapDeftemplate to toolbar
      $('#mapDef-content').appendChild(component.getTemplate('mapdef'));

      map = olMap.get();


      $('#mapdefurl').addEventListener('change', function () {
        window.location.search = 'mapDef=' + this.value;
      });
      $('#createMapDef').addEventListener('click', function () {
        var op = mapDef.get();
        var view = map.getView();
        var center = ol.proj.transform(view.getCenter(), view.getProjection(), 'EPSG:4326');
        op.center = { lat: center[1], lon: center[0] };
        op.zoom = view.getZoom();
        $('#mapDefOP').value = JSON.stringify(op);
      });
    }
  };
});
