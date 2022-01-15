/**
 * Not directly used. Added automatically for vector layers and when >1 raster layer.
 */

// import templates
import tpl from './layerswitcher.htm.js';
import Component from './component.js';
// make sure toolbar initialised
import toolbar from './toolbar.js';

const component = new Component(tpl);
const lst = component.getTemplate('layerswitcher');
const layersDiv = lst.getElementById('layerswitch');
const rastersTpl = component.getTemplate('rasters');
const rastersDiv = rastersTpl.getElementById('rasters');
const vectorsTpl = component.getTemplate('vectors');
const vectorsDiv = vectorsTpl.getElementById('vectors');
const added = {
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
    const inputElem = document.createElement('input');
    inputElem.name = 'rasters';
    inputElem.value = layer.getProperties().id;
    inputElem.id = inputElem.value.replace(/ |\(|\)/g,'');
    inputElem.type = 'radio';
    const label = document.createElement('label');
    label.htmlFor = label.innerHTML = inputElem.value;
    label.style.verticalAlign = 'bottom';
    const div = document.createElement('div');
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
    // don't hog focus
    inputElem.addEventListener('click',function(){this.blur()});
    return div;
  },

  addVectorDiv: function(vector) {
    const inputElem = document.createElement('input');
    inputElem.id = inputElem.value = vector.id;
    // if group, radio button with group as name else checkbox
    if (vector.group) {
      inputElem.type = 'radio';
      inputElem.name = vector.group;
    } else {
      inputElem.type = 'checkbox';
      inputElem.name = inputElem.id;
    }
    // don't display initially if noDisplay true
    inputElem.checked = vector.noDisplay ? false : true;
    const label = document.createElement('label');
    label.htmlFor = label.innerHTML = inputElem.value;
    label.style.verticalAlign = 'baseline';
    const div = document.createElement('div');
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
    // don't hog focus
    inputElem.addEventListener('click',function(){this.blur()});
    return [div, v1];
  }
};
