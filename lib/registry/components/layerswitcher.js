var utils = require('utils');
var $ = utils.$;
// make sure toolbar initialised
var toolbar = require('components/toolbar');
var imported = $('layerswitcherlink').import;
var lst = imprt('layerswitchertemplate');
var layersDiv = lst.getElementById('layerswitch');
var rastersTpl = imprt('rasterstemplate');
var rastersDiv = rastersTpl.getElementById('rasters');
var vectorsTpl = imprt('vectorstemplate');
var vectorsDiv = vectorsTpl.getElementById('vectors');
var added = {
  rasters: false,
  vectors: false,
  ls: false
};

// import a template from an HTML import
function imprt(tpl) {
  return document.importNode(imported.getElementById(tpl).content, true);
}

module.exports = {
  addRasterDiv: function(layer, switcherRasterHandler) {
    var inputElem = document.createElement('input');
    inputElem.name = 'rasters';
    inputElem.value = inputElem.id = layer.getProperties().id;
    inputElem.type = 'radio';
    var label = document.createElement('label');
    label.htmlFor = label.innerHTML = inputElem.value;
    label.style.verticalAlign = 'bottom';
    var div = document.createElement('div');
    div.appendChild(inputElem);
    div.appendChild(label);
    div.onclick = switcherRasterHandler;
    rastersDiv.appendChild(div);
    if (!added.rasters) {
      inputElem.checked = true;
      layersDiv.appendChild(rastersTpl);
      added.rasters = true;
    } else {
      if (!added.ls) {
        // add layerswitchertemplate to toolbar
        toolbar.appendChild(lst);
        added.ls = true;
      }
    }
  },

  addVectorDiv: function(vector, switcherVectorHandler) {
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
    div.onclick = switcherVectorHandler;
    vectorsDiv.appendChild(div);
    var firstV = false;
    if (!added.vectors) {
      layersDiv.appendChild(vectorsTpl);
      added.vectors = true;
      firstV = true;
    }
    if (!added.ls) {
      // add layerswitchertemplate to toolbar
      toolbar.appendChild(lst);
      added.ls = true;
    }
    return firstV;
  }
};
