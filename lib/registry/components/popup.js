  var utils = require('utils');
  var $ = utils.$;
  // make sure toolbar initialised
  var toolbar = require('components/toolbar');
  // add popuptemplate to toolbar
  toolbar.appendChild(utils.getTemplate('#popuptemplate'));
  var featureTemplate = utils.getTemplate('#featuretemplate');
var ol = require('ol');
var map = require('olMap').get();
var vectors = require('vectors');

// create sphere for Haversine distance calculation below
var wgs84Sphere = new ol.Sphere(6378137);

var overlay = new ol.Overlay({
  element: $('#popup'),
  positioning: 'bottom-center',
  stopEvent: true
});

var select = new ol.interaction.Select({
  layers: vectors.getLayers().getArray()
});

map.addInteraction(select);

select.on('select', function(e) {
// click on feature displays attributes in overlay
  // uses overlay as closure
  var savedFeature;
  var child = document.createElement('div');
  // FIXME forEach only needed when multi true, which isn't by default
  e.selected.forEach(function(feature) {
    if (feature != savedFeature) {
      var featureDisplay = featureTemplate.querySelector('.featureDisplay').cloneNode(true);
      featureDisplay.querySelector('.featureId').innerHTML = feature.getId();
      var atts = feature.getProperties();
      for (var att in atts) {
        if (att != 'geometry') {
          var attNode = featureTemplate.querySelector('.featureAtt').cloneNode(true);
          attNode.innerHTML = att + ': ' + atts[att];
          featureDisplay.querySelector('.featureAtts').appendChild(attNode);
        }
      }
      var geom = feature.getGeometry().clone();
      if (geom.getLength) {
        // get length for linestrings
        var projCode = map.getView().getProjection().getCode();
        if (projCode != 'EPSG:4326' && projCode != 'EPSG:3857') {
          // no point in projected plane length for these projections
          featureDisplay.querySelector('.featureLen').innerHTML =
              Math.round(geom.getLength() * 0.1) / 100;
        } else {
          featureDisplay.querySelector('.featurePrjctd').style.display = 'none';
        }
        // Haversine calculation needs 4326 coords
        geom.transform(projCode, 'EPSG:4326');
        var coords = geom.getCoordinates();
        var length = 0.0;
        for (var i = 1; i < coords.length; i++) {
          length += wgs84Sphere.haversineDistance(coords[i-1], coords[i]);
        }
        featureDisplay.querySelector('.featureLenHav').innerHTML =
            Math.round(length * 0.1) / 100;
      } else {
        featureDisplay.querySelector('.featurePrjctd').style.display = 'none';
        featureDisplay.querySelector('.featureHav').style.display = 'none';
      }
      savedFeature = feature;
      child.appendChild(featureDisplay);
    }
  });

  var el = overlay.getElement();
  if (child.childElementCount > 0) {
    if (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(child);
    el.style.display = 'block';
    // FIXME change to pixel from event when available from ol
    overlay.setPosition(savedFeature.getGeometry().getFirstCoordinate());
  } else {
    if (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.style.display = 'none';
  }
});

map.addOverlay(overlay);

var mapDef = require('mapDef').get();
mapDef.components = mapDef.components || {};
mapDef.components.popup = true;
