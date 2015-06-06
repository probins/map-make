  // import templates
  var tpl = require('components/featuredisplay.html!text');
  var div = document.createElement('div');
  div.innerHTML = tpl;

var utils = require('utils');
var $ = utils.$;
var featureTemplate = div.querySelector('#featuredisplaytemplate').content.cloneNode(true);
var ol = require('ol');
var map = require('olMap').get();
var select = require('select');

var overlay = require('components/popup').getOverlay();

select.displayOn(function(e) {
// click on feature displays attributes in overlay
  // uses overlay as closure
  // create sphere for Haversine distance calculation below
  var wgs84Sphere = new ol.Sphere(6378137);
  var el = overlay.getElement();
  if (e.selected.length > 0) {
    var feature = e.selected[0];
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

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(featureDisplay);
    el.style.display = 'block';
    // FIXME change to pixel from event when available from ol
    overlay.setPosition(feature.getGeometry().getFirstCoordinate());
  } else {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.style.display = 'none';
  }
});

var mapDef = require('mapDef').get();
mapDef.components = mapDef.components || {};
mapDef.components.featuredisplay = true;
