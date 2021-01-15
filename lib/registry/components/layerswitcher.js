/**
 * Not directly used. Added automatically for vector layers and when >1 raster layer.
 */

// import templates
import tpl from './layerswitcher.htm.js';
import Component from './component.js';
const component = new Component(tpl);

// make sure toolbar initialised
import toolbar from './toolbar.js';

let lst = component.getTemplate('layerswitcher');
let layersDiv = lst.getElementById('layerswitch');
let rastersTpl = component.getTemplate('rasters');
let rastersDiv = rastersTpl.getElementById('rasters');
let vectorsTpl = component.getTemplate('vectors');
let vectorsDiv = vectorsTpl.getElementById('vectors');
let added = {
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

export default {
  addRasterDiv: function(layer) {
    let inputElem = document.createElement('input');
    inputElem.name = 'rasters';
    inputElem.value = layer.getProperties().id;
    inputElem.id = inputElem.value.replace(/ |\(|\)/g,'');
    inputElem.type = 'radio';
    let label = document.createElement('label');
    label.htmlFor = label.innerHTML = inputElem.value;
    label.style.verticalAlign = 'bottom';
    let div = document.createElement('div');
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
    let inputElem = document.createElement('input');
    inputElem.name = inputElem.id = inputElem.value = vector.id;
    inputElem.type = 'checkbox';
    // don't display initially if noDisplay true
    inputElem.checked = vector.noDisplay ? false : true;
    let label = document.createElement('label');
    label.htmlFor = label.innerHTML = inputElem.value;
    label.style.verticalAlign = 'baseline';
    let div = document.createElement('div');
    div.appendChild(inputElem);
    div.appendChild(label);
    vectorsDiv.appendChild(div);
    let v1 = false;
    if (!added.vectors) {
      layersDiv.appendChild(vectorsTpl);
      added.vectors = true;
      v1 = true;
    }
    addToToolbar();
    return [div, v1];
  }
};
