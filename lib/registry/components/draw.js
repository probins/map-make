  // import templates
  var tpl = require('components/draw.html!text');
  var Component = require('components/component');
  var component = new Component(tpl);

  var ol = require('ol');
  var map = require('olMap').get();
  var utils = require('utils');
  var $ = utils.$;
  // make sure toolbar initialised
  require('components/toolbar');

  // add adddrawtemplate to toolbar
  $('#widgets-content').appendChild(component.getTemplate('draw'));

  var select = require('select');
  var vectors = require('vectors');
  var overlay = require('components/popup').getOverlay();

  // add a vector layer/source
  // FIXME enable drawing on existing layers
  vectors.add({vectors: [{id: 'Drawn'}]}); // FIXME English
  var source = vectors.getLayers().item(vectors.getLayers().getLength()-1)
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
    })
  };

  var tpl = component.getTemplate('featureform');

  var endCallback = function(e) {
    var el = overlay.getElement();
    // may be featuredisplay present
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(tpl.cloneNode(true));
    // initialise displayed atts
    $('#featureformid').value = '';
    $('#plusbutton').onclick = function() {
      var clone = this.parentNode.querySelector('template').content
          .firstElementChild.cloneNode(true);
      var attsDiv = $('#featureformAtts');
      attsDiv.insertBefore(clone, attsDiv.firstElementChild);
    };
    // use onclick rather than addEventListener so only 1 active
    $('#featurebutton').onclick = function() {
      e.feature.setId($('#featureformid').value);
      var divs = $('#featureformAtts').querySelectorAll('div');
      for (var i = 0; i < divs.length; i++) {
        var inputs = divs[i].querySelectorAll('input');
        e.feature.set(inputs[0].value, inputs[1].value);
      }
      el.style.display = 'none';
    };
    // FIXME change to pixel from event when available from ol
    overlay.setPosition(e.feature.getGeometry().getFirstCoordinate());
    el.style.display = 'block';
  };

  interactions.point.on('drawend', endCallback);
  interactions.ls.on('drawend', endCallback);
  interactions.poly.on('drawend', endCallback);

  var i;
  // interactions inactive until clicked
  for (i in interactions) {
    map.addInteraction(interactions[i]);
    interactions[i].setActive(false);
  }

  var wasDelete = false, wasModAtts = false, evtKey;
  $('#drawtype').onchange = function(e) {
    // set any previously active interactions inactive
    for (i in interactions) {
      interactions[i].setActive(false);
    }
    // ... and clicked one active
    if (interactions[e.target.value]) {
      interactions[e.target.value].setActive(true);
    }
    // if delete, add listener to delete from source and select when selected
    if (e.target.value == 'deleet') {
      evtKey = features.on('add', function(e) {
        vectors.getLayers().forEach(function(l) {
          var srce = l.getSource();
          if (e.element.getId()) {
            if (srce.getFeatureById(e.element.getId())) {
              srce.removeFeature(e.element);
            }
          } else {
            srce.getFeatures().some(function(f) {
              if (f == e.element) {
                srce.removeFeature(e.element);
              }
            });
          }
        });
        features.clear();
      });
      wasDelete = true;
    } else if (wasDelete) {
      ol.Observable.unByKey(evtKey);
      wasDelete = false;
    }
    if (e.target.value == 'navigate') {
      select.drawOff();
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
        el.appendChild(tpl.cloneNode(true));
        
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
        $('#plusbutton').onclick = function() {
          var temp = this.parentNode.querySelector('template');
          var clone = temp.content.firstElementChild.cloneNode(true);
          attsDiv.insertBefore(clone, temp);
        };
        $('#featurebutton').onclick = function() {
          feature.setId($('#featureformid').value);
          var divs = $('#featureformAtts').querySelectorAll('div');
          for (var i = 0; i < divs.length; i++) {
            var inputs = divs[i].querySelectorAll('input');
            feature.set(inputs[0].value, inputs[1].value);
          }
          el.style.display = 'none';
        };
        // FIXME change to pixel from event when available from ol
        overlay.setPosition(feature.getGeometry().getFirstCoordinate());
        el.style.display = 'block';
      });
      wasModAtts = true;
    } else if (wasModAtts) {
      ol.Observable.unByKey(evtKey);
      wasModAtts = false;
    }
  };

  $('#adddraw').style.display = 'none';

  var op = $('#serialOP');
  $('#serialise').addEventListener('click', function() {
    var gj = new ol.format.GeoJSON();
    op.value =
        gj.writeFeatures(source.getFeatures(), {
          featureProjection: map.getView().getProjection()
        });
  });
  $('#clear').addEventListener('click', function() {
    source.clear();
  });

  var mapDef = require('mapDef').get();
  mapDef.components = mapDef.components || {};
  mapDef.components.draw = true;
