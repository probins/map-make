  // import templates
  var tpl = require('components/draw.html');
  var Component = require('components/component');
  var component = new Component(tpl, 'draw');

  var ol = require('ol');
  var map = require('olMap').get();
  var utils = require('utils');
  var $ = utils.$;
  // make sure toolbar initialised
  require('components/toolbar');

  // add drawtemplate to map
  // use ol.control to prevent event propagation
  map.addControl(new ol.control.Control({element: component.getTemplate('draw')}));

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

  var form = component.getTemplate('featureform');

  function plusFunc() {
    var temp = this.parentNode.querySelector('template');
    var clone = temp.content.firstElementChild.cloneNode(true);
    $('#featureformAtts').insertBefore(clone, temp);
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
      e.feature.setId($('#featureformid').value);
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
  var op = component.getTemplate('serialise').firstElementChild;
  $('#components-content').appendChild(op);

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

    if (e.target.value == 'hide' || e.target.value == 'choose') {
      select.drawOff();
      if (e.target.value == 'hide') {
        this.style.display = 'none';
        $('#adddraw').style.display = 'block';
        var listener = function() {
          // hide button and remove listener
          this.style.display = 'none';
          this.removeEventListener('click', listener);
          $('#drawtype').value = 'choose';
          $('#drawtype').style.display = 'block';
        };
        $('#adddraw').addEventListener('click', listener);
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

    if (e.target.value == 'save') {
      var formatType = 'GeoJSON';
      var format = vectors.getFormat(formatType);
      op.value =
          format.writeFeatures(source.getFeatures(), {
            featureProjection: map.getView().getProjection()
          });
    }

    if (e.target.value == 'clear') {
      source.clear();
    }
    this.blur();
  };

  $('#drawbutton').style.display = 'none';
