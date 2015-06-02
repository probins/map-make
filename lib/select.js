  var ol = require('ol');
  var map = require('olMap').get();
  var vectors = require('vectors');

  // select for vector layers; used by popup, modify and delete
  var select = new ol.interaction.Select({
    layers: vectors.getLayers().getArray()
  });
  map.addInteraction(select);

module.exports = {
  get: function() {
    return select;
  }
};