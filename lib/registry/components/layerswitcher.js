var utils = require('utils');
var $ = utils.$;
// make sure toolbar initialised
require('components/toolbar');

var lst = utils.importTemplate('layerswitcher');
var layersDiv = lst.getElementById('layerswitch');
var rastersTpl = utils.importTemplate('layerswitcher', 'rasters');
var rastersDiv = rastersTpl.getElementById('rasters');
var vectorsTpl = utils.importTemplate('layerswitcher', 'vectors');
var vectorsDiv = vectorsTpl.getElementById('vectors');
var added = {
  rasters: false,
  vectors: false,
  ls: false
};

module.exports = {
  addRasterDiv: function(layer) {
    var inputElem = document.createElement('input');
    inputElem.name = 'rasters';
    inputElem.value = layer.getProperties().id;
    inputElem.id = inputElem.value.replace(/ /g,'');
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
      if (!added.ls) {
        // add layerswitchertemplate to toolbar
        $('#layers-content').appendChild(lst);
        added.ls = true;
      }
    }
    return div;
  },

  addVectorDiv: function(vector) {
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
    if (!added.ls) {
      // add layerswitchertemplate to toolbar
      $('#layers-content').appendChild(lst);
      added.ls = true;
    }
    return [div, v1];
  }
};
