/**
 * Component for drawing and editing of vector data.
 * Uses popup, measure.
 * Screen position of buttons determined by css in html file.
 */

// import templates
import tpl from './draw.htm.js';
import Component from './component.js';
var component = new Component(tpl, 'draw');

import ol from '../../ol.js';
import olMap from '../../olMap.js';
var map = olMap.get();
import utils from '../../utils.js';
var $ = utils.$;
// make sure toolbar initialised
import './toolbar.js';

// add drawtemplate to map
// use ol.control to prevent event propagation
map.addControl(new ol.control.Control({element: component.getTemplate('draw')}));

import select from '../../select.js';
import vectors from '../../vectors.js';
import measure from '../../measure.js';
import popup from './popup.js';
var overlay = popup.getOverlay();

var joinKey;
// FIXME English
var DRAWID = 'Drawn';

// add a vector layer/source
// FIXME enable drawing on existing layers
vectors.add({vectors: [{id: DRAWID}]});
var source = vectors.getLayers().item(vectors.getLayers().getLength() - 1)
    .getSource();

// create and add draw/modify interactions
var features = select.get().getFeatures();
var interactions = {
  point: new ol.interaction.Draw({
    source: source,
    type: 'Point'
  }),
  ls: new ol.interaction.Draw({
    source: source,
    type: 'LineString'
  }),
  poly: new ol.interaction.Draw({
    source: source,
    type: 'Polygon'
  }),
  modify: new ol.interaction.Modify({
    features: features
  }),
  split: new ol.interaction.Modify({
    features: features,
    deleteCondition: ol.events.condition.never
  })
};

var listener;
var form = component.getTemplate('featureform');

function plusFunc() {
  var temp = this.parentNode.querySelector('template');
  var clone = temp.content.firstElementChild.cloneNode(true);
  $('#featureformAtts').insertBefore(clone, temp);
  var i = $('#featureformAtts').querySelectorAll('input');
  i[i.length - 2].focus(); // focus on 1st new input field
}

var endCallback = function(e) {
  var el = overlay.getElement();
  // may be featuredisplay present
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  el.appendChild(form.cloneNode(true));
  // initialise displayed atts
  $('#featureformid').value = '';
  $('#plusbutton').onclick = plusFunc;
  // use onclick rather than addEventListener so only 1 active
  $('#featurebutton').onclick = function() {
    if ($('#featureformid').value) {
      e.feature.setId($('#featureformid').value);
    }
    var divs = $('#featureformAtts').querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
      var inputs = divs[i].querySelectorAll('input');
      // only set attribute if there is a key
      if (inputs[0].value) {
        e.feature.set(inputs[0].value, inputs[1].value);
      }
    }
    el.style.display = 'none';
  };
  overlay.setPosition(map.getView().getCenter());
  el.style.display = 'block';
  $('#featureformid').focus();
  if (listener) {
    ol.Observable.unByKey(listener);
  }
};

interactions.point.on('drawend', endCallback);
interactions.ls.on('drawend', endCallback);
interactions.poly.on('drawend', endCallback);

interactions.ls.on('drawstart', function(evt) {
  var tooltipCoord = evt.coordinate;
  listener = evt.feature.getGeometry().on('change', function(evt) {
    tooltipCoord = evt.target.getLastCoordinate();
    var length = measure.getLength(evt.target, map.getView().getProjection());
    overlay.getElement().innerHTML = (Math.round(length * 0.1) / 100) + ' ' + 'km';
    overlay.setPosition(tooltipCoord);
    overlay.getElement().style.display = 'block';
  });
});
interactions.poly.on('drawstart', function(evt) {
  var tooltipCoord = evt.coordinate;
  listener = evt.feature.getGeometry().on('change', function(evt) {
    tooltipCoord = evt.target.getInteriorPoint().getCoordinates();
    var area = measure.getArea(evt.target, map.getView().getProjection());
    overlay.getElement().innerHTML = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
    overlay.setPosition(tooltipCoord);
    overlay.getElement().style.display = 'block';
  });
});

interactions.modify.on('modifyend', function(evt) {
  // move modified feature to draw layer if not already there
  // FIXME: this is not very satisfactory, as is triggered on every vertex move/delete/add
  var f = evt.features.item(0);
  var layer = select.get().getLayer(f);
  if (layer.get('id') !== DRAWID) {
    layer.getSource().removeFeature(f);
    source.addFeatures([f]);
  }
});

var i;
// interactions inactive until clicked
for (i in interactions) {
  map.addInteraction(interactions[i]);
  interactions[i].setActive(false);
}

var wasDelete = false, wasModAtts = false, evtKey;

$('#drawtype').onchange = changeFunction;

function changeFunction(e) {
  // clear any selected features
  features.clear();
  // set any previously active interactions inactive
  for (var i in interactions) {
    interactions[i].setActive(false);
  }
  // ... and clicked one active
  if (interactions[e.target.value]) {
    interactions[e.target.value].setActive(true);
  }

  // if delete, add listener to delete from source and select when selected
  if (e.target.value == 'deleet') {
    evtKey = features.on('add', function(e) {
      select.get().getLayer(e.element).getSource().removeFeature(e.element);
      features.clear();
    });
    wasDelete = true;
  } else if (wasDelete) {
    ol.Observable.unByKey(evtKey);
    wasDelete = false;
  }

  if (e.target.value == 'hide' || e.target.value == 'choose') {
    select.drawOff();
    if (e.target.value == 'hide') {
      this.style.display = 'none';
      $('#drawoption').style.display = 'block';
      $('#drawoption').value = 'redraw';
      $('#drawtype').value = 'choose';
    }
  } else {
    select.drawOn();
  }

  if (['point', 'ls', 'poly'].indexOf(e.target.value) == -1) {
    select.get().setActive(true);
  } else {
    // no select while drawing
    select.get().setActive(false);
  }

  if (e.target.value == 'modAtts') {
    evtKey = features.on('add', function(e) {
      var el = overlay.getElement();
      // may be featuredisplay present
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      el.appendChild(form.cloneNode(true));

      var feature = e.element;
      $('#featureformid').value = feature.getId();
      // display existing atts
      var atts = feature.getProperties();
      var attsDiv = $('#featureformAtts');
      for (var att in atts) {
        if (att != 'geometry') {
          var clone = attsDiv.querySelector('template').content
              .firstElementChild.cloneNode(true);
          var inputs = clone.querySelectorAll('input');
          inputs[0].value = att;
          inputs[1].value = atts[att];
          attsDiv.insertBefore(clone, attsDiv.firstElementChild);
        }
      }
      // use onclick rather than addEventListener so only 1 active
      $('#plusbutton').onclick = plusFunc;
      $('#featurebutton').onclick = function() {
        feature.setId($('#featureformid').value);
        var divs = $('#featureformAtts').querySelectorAll('div');
        for (var i = 0; i < divs.length; i++) {
          var inputs = divs[i].querySelectorAll('input');
          if (inputs[1].value) {
            feature.set(inputs[0].value, inputs[1].value);
          } else {
            // delete attribute if value cleared
            feature.unset(inputs[0].value);
          }
        }
        el.style.display = 'none';
        // move feature to draw layer if not already there
        var layer = select.get().getLayer(feature);
        if (layer.get('id') !== DRAWID) {
          layer.getSource().removeFeature(feature);
          source.addFeatures([feature]);
        }
      };
      overlay.setPosition(map.getView().getCenter());
      el.style.display = 'block';
    });
    wasModAtts = true;
  } else if (wasModAtts) {
    ol.Observable.unByKey(evtKey);
    wasModAtts = false;
  }

  if (e.target.value == 'save' || e.target.value == 'saveall') {
    System.importModule('registry/components/serialise.js')
    .then(function(m) {
      m.default(e.target.value, DRAWID);
    });
  }

  if (e.target.value == 'split') {
    var origCoords;
    select.get().once('select', function(evt) {
      // this bit can be removed once modify event returns modified vertex
      if (evt.selected[0]) {
        origCoords = evt.selected[0].getGeometry().getCoordinates();
      }
    });
    interactions.split.once('modifyend', function(evt) {
      var f = evt.features.item(0);
      var modCoords = f.getGeometry().getCoordinates();
      // return true/false whether val is in arr
      function check(arr, val) {
        return arr.some(function(arrval) {
          // have to convert to strings as arrays won't be equal
          return val.toString() == arrval.toString();
        });
      }
      var i = 0;
      // compare each new coord with original until find non-match
      while (i < modCoords.length && check(origCoords, modCoords[i]) === true) {
        i++;
      }
      var part1 = modCoords.slice(0, i + 1); // include the new coord in both parts
      var part2 = modCoords.slice(i);
      var atts = f.getProperties();
      atts.geometry = new ol.geom.LineString(part1);
      var f1 = new ol.Feature(atts);
      atts.geometry = new ol.geom.LineString(part2);
      var f2 = new ol.Feature(atts);
      // effectively, this moves a split feature on layer other than draw layer to the draw layer
      source.addFeatures([f1, f2]);
      select.get().getLayer(f).getSource().removeFeature(f);
      features.clear();
      e.target.value = 'choose';
      changeFunction(e);
    });
  }

  if (e.target.value == 'join') {
    joinKey = select.get().on('select', function(evt) {
      if (features.getLength() == 2) {
        var f1 = features.item(0);
        var f2 = features.item(1);
        var atts = f1.getProperties();
        atts.geometry = new ol.geom.LineString(
          f1.getGeometry().getCoordinates().concat(f2.getGeometry().getCoordinates().slice(1))
        );
        var f3 = new ol.Feature(atts);
        features.clear();
        // effectively, this moves the joined feature on layer other than draw layer to the draw layer
        select.get().getLayer(f2).getSource().removeFeature(f2);
        select.get().getLayer(f1).getSource().removeFeature(f1);
        source.addFeatures([f3]);
      }
    });
  } else if (joinKey) {
    ol.Observable.unByKey(joinKey);
    joinKey = null;
  }

  if (e.target.value == 'clear') {
    source.clear();
  }

  this.blur();
}

// add helptemplate to toolbar
$('#help-content').appendChild(component.getTemplate('drawhelp'));
// add toggle listener to helptitle div
$('#draw-title').addEventListener('click', function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
});
