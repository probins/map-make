  var ol = require('ol');
  var map = require('olMap').get();
  var utils = require('utils');
  var $ = utils.$;
  // make sure toolbar initialised
  require('components/toolbar');

  // add adddrawtemplate to toolbar
  $('#widgets-content').appendChild(utils.getTemplate('#drawtemplate'));

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

  var tpl = utils.getTemplate('#featureformtemplate');

  var endCallback = function(e) {
    var el = overlay.getElement();
    el.style.display = 'block';
    // may be featuredisplay present
    if (el.firstElementChild) {
      el.removeChild(el.firstElementChild);
    }
    el.appendChild(tpl.cloneNode(true));
    // initialise displayed atts
    $('#featureid').value = '';
    $('#featuretitle').value = '';
    // FIXME change to pixel from event when available from ol
    overlay.setPosition(e.feature.getGeometry().getFirstCoordinate());
    // use onclick rather than addEventListener so only 1 active
    $('#featurebutton').onclick = function() {
      // FIXME create attributes properly
      e.feature.setId($('#featureid').value);
      e.feature.set('title', $('#featuretitle').value);
      el.style.display = 'none';
    };
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

  var wasDelete = false, evtKey;
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
