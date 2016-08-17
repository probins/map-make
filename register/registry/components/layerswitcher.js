'use strict';

System.register(['./layerswitcher.htm.js', './component.js', './toolbar.js'], function (_export, _context) {
  var tpl, Component, toolbar, component, lst, layersDiv, rastersTpl, rastersDiv, vectorsTpl, vectorsDiv, added;


  function addToToolbar() {
    if (!added.ls) {
      // add layerswitchertemplate to toolbar
      toolbar.querySelector('#layers-content').appendChild(lst);
      added.ls = true;
    }
  }

  return {
    setters: [function (_layerswitcherHtmJs) {
      tpl = _layerswitcherHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_toolbarJs) {
      toolbar = _toolbarJs.default;
    }],
    execute: function () {
      component = new Component(tpl);
      lst = component.getTemplate('layerswitcher');
      layersDiv = lst.getElementById('layerswitch');
      rastersTpl = component.getTemplate('rasters');
      rastersDiv = rastersTpl.getElementById('rasters');
      vectorsTpl = component.getTemplate('vectors');
      vectorsDiv = vectorsTpl.getElementById('vectors');
      added = {
        rasters: false,
        vectors: false,
        ls: false
      };

      _export('default', {
        addRasterDiv: function (layer) {
          var inputElem = document.createElement('input');
          inputElem.name = 'rasters';
          inputElem.value = layer.getProperties().id;
          inputElem.id = inputElem.value.replace(/ |\(|\)/g, '');
          inputElem.type = 'radio';
          var label = document.createElement('label');
          label.htmlFor = label.innerHTML = inputElem.value;
          label.style.verticalAlign = 'bottom';
          var div = document.createElement('div');
          div.appendChild(inputElem);
          div.appendChild(label);
          rastersDiv.appendChild(div);
          if (!added.rasters) {
            inputElem.checked = true;
            layersDiv.appendChild(rastersTpl);
            added.rasters = true;
          } else {
            addToToolbar();
          }
          return div;
        },

        addVectorDiv: function (vector) {
          var inputElem = document.createElement('input');
          inputElem.name = inputElem.id = inputElem.value = vector.id;
          inputElem.type = 'checkbox';
          inputElem.checked = true;
          var label = document.createElement('label');
          label.htmlFor = label.innerHTML = inputElem.value;
          label.style.verticalAlign = 'baseline';
          var div = document.createElement('div');
          div.appendChild(inputElem);
          div.appendChild(label);
          vectorsDiv.appendChild(div);
          var v1 = false;
          if (!added.vectors) {
            layersDiv.appendChild(vectorsTpl);
            added.vectors = true;
            v1 = true;
          }
          addToToolbar();
          return [div, v1];
        }
      });
    }
  };
});
