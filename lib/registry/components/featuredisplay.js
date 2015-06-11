  // import templates
  var tpl = require('components/featuredisplay.html');
  var Component = require('components/component');
  var component = new Component(tpl);

var utils = require('utils');
var $ = utils.$;
var featureTemplate = component.getTemplate('featuredisplay');
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
      // ignore attributes called geometry or having mongo objectid
      if (!atts[att]['$oid'] && att != 'geometry') {
        // if mongo $date convert to Date
        var val = (atts[att]['$date']) ? new Date(atts[att]['$date']) : atts[att];
        var attNode = featureTemplate.querySelector('.featureAtt').cloneNode(true);
        attNode.innerHTML = att + ': ' + val;
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
    overlay.setPosition(e.mapBrowserEvent.coordinate);
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
