/**
 * Not directly used. Added automatically for vector layers and when >1 raster layer.
 */

// import templates
var tpl = require('./layerswitcher.html');
var Component = require('./component.js');
var component = new Component(tpl);

// make sure toolbar initialised
var toolbar = require('./toolbar.js');

var lst = component.getTemplate('layerswitcher');
var layersDiv = lst.getElementById('layerswitch');
var rastersTpl = component.getTemplate('rasters');
var rastersDiv = rastersTpl.getElementById('rasters');
var vectorsTpl = component.getTemplate('vectors');
var vectorsDiv = vectorsTpl.getElementById('vectors');
var added = {
  rasters: false,
  vectors: false,
  ls: false
};

function addToToolbar() {
  if (!added.ls) {
    // add layerswitchertemplate to toolbar
    toolbar.querySelector('#layers-content').appendChild(lst);
    added.ls = true;
  }
}

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
      addToToolbar();
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
    addToToolbar();
    return [div, v1];
  }
};
