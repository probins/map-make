'use strict';

System.register(['./addlayer.htm', './component.js', '../../awesomplete.js', '../../utils.js', '../../olMap.js', './toolbar.js', '../../mapDef.js', '../../rasters.js', '../../vectors.js'], function (_export, _context) {
  var tpl, Component, Awesomplete, utils, olMap, md, rasters, vectors, component, $, map, mapDef;
  return {
    setters: [function (_addlayerHtm) {
      tpl = _addlayerHtm.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_awesompleteJs) {
      Awesomplete = _awesompleteJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_toolbarJs) {}, function (_mapDefJs) {
      md = _mapDefJs.default;
    }, function (_rastersJs) {
      rasters = _rastersJs.default;
    }, function (_vectorsJs) {
      vectors = _vectorsJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'addlayer');
      $ = utils.$;
      map = olMap.get();


      // add addlayertemplate to toolbar
      $('#layers-content').appendChild(component.getTemplate('addlayer'));

      fetch(System.sourceList).then(function (response) {
        return response.json();
      }).then(function (result) {
        new Awesomplete(document.querySelector('#rastercode'), { list: result, minChars: 1 });
      }).catch(function () {
        utils.errors.fetchFail();
      });

      mapDef = md.get();


      $('#addraster').addEventListener('click', function () {
        var code = $('#rastercode').value;
        System.importModule('registry/sources/' + code + '.js').then(function (m) {
          var options;
          // use apikey if entered
          if ($('#api').value) {
            options = { rasters: [] };
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
          var div = $('#' + id.replace(/ |\(\)/g, ''));
          if (div) {
            div.checked = true;
          }
          $('#rastercode').value = '';
          $('#api').value = '';
        });
      });

      $('#addvector').addEventListener('click', function () {
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
        if ($('#vectorfile').files.length > 0) {
          // file entered
          var file = $('#vectorfile').files[0];
          option.type = 'file';
          option.filename = file.name;
          option.id = $('#vectorname').value || file.name;
          var reader = new FileReader();
          reader.onload = function (e) {
            option.file = e.target.result;
            addVectors(option);
          };
          reader.readAsText(file);
        }
        function addVectors(option) {
          vectors.add({ vectors: [option] });
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
    }
  };
});
