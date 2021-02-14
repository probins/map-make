/**
 * Handles select for vector layers; used by featuredisplay, modify and delete;
 * ensures these don't clash.
 *
 * Exports: get(), displayOn(), drawOn(), drawOff().
 */
import Select from "ol/interaction/Select.js";
import { unByKey } from 'ol/Observable.js';

// import { Select, unByKey } from './deps.js';
import olMap from './olMap.js';
import vectors from './vectors.js';

const map = olMap.get();

// select for vector layers; used by featuredisplay, modify and delete
const select = new Select({
  layers: vectors.getLayers().getArray()
});
map.addInteraction(select);

let evtKey, displayCallback, drawActive = false;

export default {
  get: function() {
    return select;
  },
  // display and draw select callbacks should not be active at same time
  displayOn: function(callback) {
    displayCallback = callback;
    if (!drawActive) {
      evtKey = select.on('select', displayCallback);
    }
  },
  drawOn: function() {
    if (evtKey) {
      unByKey(evtKey);
    }
    drawActive = true;
  },
  drawOff: function() {
    if (displayCallback) {
      evtKey = select.on('select', displayCallback);
    }
    drawActive = false;
  }
};
