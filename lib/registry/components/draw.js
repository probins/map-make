/**
 * Component for drawing and editing of vector data.
 * Uses popup, measure.
 * Screen position of buttons determined by css in html file.
 */

// import templates
import tpl from './draw.htm.js';
import Component from './component.js';
import { Draw, Feature, LineString, Modify, unByKey } from '../../deps.js';
import olMap from '../../olMap.js';
import { $ } from '../../utils.js';
// make sure toolbar initialised
import './toolbar.js';
import select from '../../select.js';
import vectors from '../../vectors.js';
import { getLength, getArea } from '../../measure.js';
import { transformCoords } from '../../olUtils.js';
import popup from './popup.js';

const map = olMap.get();

const component = new Component(tpl, 'draw');
// add drawtemplate to map
olMap.addControl(component.getTemplate('draw'));

const overlay = popup.getOverlay();

let joinKey;
// FIXME English
const DRAWID = 'Drawn';

// add a vector layer/source
// FIXME enable drawing on existing layers
vectors.add({vectors: [{id: DRAWID}]});
const source = vectors.getLayers().item(vectors.getLayers().get('length') - 1).get('source');

// create and add draw/modify interactions
const features = select.get().getFeatures();
const interactions = {
  point: new Draw({
    source: source,
    type: 'Point'
  }),
  ls: new Draw({
    source: source,
    type: 'LineString'
  }),
  poly: new Draw({
    source: source,
    type: 'Polygon'
  }),
  modify: new Modify({
    features: features
  }),
  split: new Modify({
    features: features,
    deleteCondition: function() { return false; }
  })
};

let listener;
const form = component.getTemplate('featureform');

function plusFunc() {
  const temp = this.parentNode.querySelector('template');
  const clone = temp.content.firstElementChild.cloneNode(true);
  $('#featureformAtts').insertBefore(clone, temp);
  const i = $('#featureformAtts').querySelectorAll('input');
  i[i.length - 2].focus(); // focus on 1st new input field
}

function endCallback(e) {
  const el = overlay.get('element');
  // may be featuredisplay present
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  el.appendChild(form.cloneNode(true));
  // initialise displayed atts
  $('#featureformid').value = '';
  $('#plusbutton').onclick = plusFunc;
  // use onclick rather than addEventListener so only 1 active
  $('#featurebutton').onclick = () => {
    if ($('#featureformid').value) {
      e.feature.setId($('#featureformid').value);
    }
    const divs = $('#featureformAtts').querySelectorAll('div');
    for (let i = 0; i < divs.length; i++) {
      const inputs = divs[i].querySelectorAll('input');
      // only set attribute if there is a key
      if (inputs[0].value) {
        e.feature.set(inputs[0].value, inputs[1].value);
      }
    }
    el.style.display = 'none';
  };
  overlay.set('position', map.get('view').get('center'));
  el.style.display = 'block';
  $('#featureformid').focus();
  if (listener) {
    unByKey(listener);
  }
}

interactions.point.on('drawend', endCallback);
interactions.ls.on('drawend', endCallback);
interactions.poly.on('drawend', endCallback);

interactions.ls.on('drawstart', (evt) => {
  let tooltipCoord = evt.coordinate;
  listener = evt.feature.getGeometry().on('change', (evt) => {
    tooltipCoord = evt.target.getLastCoordinate();
    const coords = transformCoords(evt.target, map.get('view').getProjection())
    const length = getLength(coords);
    overlay.get('element').innerHTML = (Math.round(length * 0.1) / 100) + ' ' + 'km';
    overlay.set('position', tooltipCoord);
    overlay.get('element').style.display = 'block';
  });
});
interactions.poly.on('drawstart', (evt) => {
  let tooltipCoord = evt.coordinate;
  listener = evt.feature.getGeometry().on('change', (evt) => {
    tooltipCoord = evt.target.getInteriorPoint().getCoordinates();
    const coords = transformCoords(evt.target, map.get('view').getProjection())
    const area = getArea(coords);
    overlay.get('element').innerHTML = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
    overlay.set('position', tooltipCoord);
    overlay.get('element').style.display = 'block';
  });
});

interactions.modify.on('modifyend', (evt) => {
  // move modified feature to draw layer if not already there
  // FIXME: this is not very satisfactory, as is triggered on every vertex move/delete/add
  const f = evt.features.item(0);
  const layer = select.get().getLayer(f);
  if (layer.get('id') !== DRAWID) {
    layer.get('source').removeFeature(f);
    source.addFeatures([f]);
    features.clear();
  }
});

// interactions inactive until clicked
for (const i in interactions) {
  map.addInteraction(interactions[i]);
  interactions[i].set('active', false);
}

let wasDelete = false, wasModAtts = false, evtKey;

$('#drawtype').onchange = changeFunction;

function changeFunction(e) {
  // clear any selected features
  features.clear();
  // set any previously active interactions inactive
  for (const i in interactions) {
    interactions[i].set('active', false);
  }
  // ... and clicked one active
  if (interactions[e.target.value]) {
    interactions[e.target.value].set('active', true);
  }

  // if delete, add listener to delete from source and select when selected
  if (e.target.value == 'deleet') {
    evtKey = features.on('add', (e) => {
      select.get().getLayer(e.element).get('source').removeFeature(e.element);
      features.clear();
    });
    wasDelete = true;
  } else if (wasDelete) {
    unByKey(evtKey);
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
    select.get().set('active', true);
  } else {
    // no select while drawing
    select.get().set('active', false);
  }

  if (e.target.value == 'modAtts') {
    evtKey = features.on('add', (e) => {
      const el = overlay.get('element');
      // may be featuredisplay present
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      el.appendChild(form.cloneNode(true));

      const feature = e.element;
      $('#featureformid').value = feature.getId();
      // display existing atts
      const atts = feature.getProperties();
      const attsDiv = $('#featureformAtts');
      for (const att in atts) {
        if (att != 'geometry') {
          const clone = attsDiv.querySelector('template').content
              .firstElementChild.cloneNode(true);
          const inputs = clone.querySelectorAll('input');
          inputs[0].value = att;
          inputs[1].value = atts[att];
          attsDiv.insertBefore(clone, attsDiv.firstElementChild);
        }
      }
      // use onclick rather than addEventListener so only 1 active
      $('#plusbutton').onclick = plusFunc;
      $('#featurebutton').onclick = () => {
        feature.setId($('#featureformid').value);
        const divs = $('#featureformAtts').querySelectorAll('div');
        for (let i = 0; i < divs.length; i++) {
          const inputs = divs[i].querySelectorAll('input');
          if (inputs[1].value) {
            feature.set(inputs[0].value, inputs[1].value);
          } else {
            // delete attribute if value cleared
            feature.unset(inputs[0].value);
          }
        }
        el.style.display = 'none';
        // move feature to draw layer if not already there
        const layer = select.get().getLayer(feature);
        if (layer.get('id') !== DRAWID) {
          layer.get('source').removeFeature(feature);
          source.addFeatures([feature]);
        }
      };
      overlay.set('position', map.get('view').get('center'));
      el.style.display = 'block';
    });
    wasModAtts = true;
  } else if (wasModAtts) {
    unByKey(evtKey);
    wasModAtts = false;
  }

  if (e.target.value == 'save' || e.target.value == 'saveall') {
    import('./serialise.js')
    .then(m => m.default(e.target.value, DRAWID));
  }

  if (e.target.value == 'split') {
    let origCoords;
    select.get().once('select', (evt) => {
      // this bit can be removed once modify event returns modified vertex
      if (evt.selected[0]) {
        const geom = evt.selected[0].getGeometry();
        if (geom.getType() && geom.getType() == 'LineString') {
          origCoords = geom.getCoordinates();
        } else if (geom.getType() && geom.getType() == 'MultiLineString' &&
            geom.getCoordinates().length === 1) {
          origCoords = geom.getCoordinates()[0];
        }
      }
    });
    interactions.split.once('modifyend', (evt) => {
      const f = evt.features.item(0);
      // not Multi/LineString
      if (!f.getGeometry().getType()) {
        return;
      }
      const type = f.getGeometry().getType();
      let modCoords = f.getGeometry().getCoordinates();
      // MultiLineString with only 1 LineString converted in single LineString
      if (type === 'MultiLineString') {
        if (modCoords.length === 1) {
          modCoords = modCoords[0];
        } else {
          // >1 LineString not handled
          return;
        }
      }
      // return true/false whether val is in arr
      function check(arr, val) {
        return arr.some(function(arrval) {
          // have to convert to strings as arrays won't be equal
          return val.toString() == arrval.toString();
        });
      }
      let i = 0;
      // compare each new coord with original until find non-match
      while (i < modCoords.length && check(origCoords, modCoords[i]) === true) {
        i++;
      }
      const part1 = modCoords.slice(0, i + 1); // include the new coord in both parts
      const part2 = modCoords.slice(i);
      const atts = f.getProperties();
      atts.geometry = new LineString(part1);
      const f1 = new Feature(atts);
      atts.geometry = new LineString(part2);
      const f2 = new Feature(atts);
      // effectively, this moves a split feature on layer other than draw layer to the draw layer
      source.addFeatures([f1, f2]);
      select.get().getLayer(f).get('source').removeFeature(f);
      features.clear();
      e.target.value = 'choose';
      changeFunction(e);
    });
  }

  if (e.target.value == 'join') {
    joinKey = select.get().on('select', (evt) => {
      if (features.get('length') == 2) {
        const f1 = features.item(0);
        const f2 = features.item(1);
        const atts = f1.getProperties();
        atts.geometry = new LineString(
          f1.getGeometry().getCoordinates().concat(f2.getGeometry().getCoordinates().slice(1))
        );
        const f3 = new Feature(atts);
        features.clear();
        // effectively, this moves the joined feature on layer other than draw layer to the draw layer
        select.get().getLayer(f2).get('source').removeFeature(f2);
        select.get().getLayer(f1).get('source').removeFeature(f1);
        source.addFeatures([f3]);
      }
    });
  } else if (joinKey) {
    unByKey(joinKey);
    joinKey = null;
  }

  if (e.target.value == 'clear') {
    source.clear();
  }

  $('#drawtype').blur();
}

// add helptemplate to toolbar
$('#help-content').appendChild(component.getTemplate('drawhelp'));
// add toggle listener to helptitle div
$('#draw-title').addEventListener('click', function() {
  // toggle display of next, i.e. content, element
  const el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
});
