// create layer switcher divs
var layersDiv = document.getElementById('layerswitch');
var rastersDiv = document.createElement('div');
rastersDiv.id = 'rasters';
var vectorsDiv = document.createElement('div');
vectorsDiv.id = 'vectors';
var divs = {
	rasters: rastersDiv,
  vectors: vectorsDiv
};
var added = {
  rasters: false,
  vectors: false
};

function addLayersDiv(div, name) {
  var label = document.createElement('div');
  label.innerHTML = name;
  layersDiv.appendChild(label);
  layersDiv.appendChild(divs[div]);
  added[div] = true;
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
      addLayersDiv('rasters', 'Rasters'); // FIXME English
    } else {
      document.getElementById('layerswitchcontainer').style.display = 'block';
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
      addLayersDiv('vectors', 'Vectors'); // FIXME English
      firstV = true;
    }
    document.getElementById('layerswitchcontainer').style.display = 'block';
    return firstV;
  }
};
