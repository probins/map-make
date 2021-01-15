/**
 * Handles select for vector layers; used by featuredisplay, modify and delete;
 * ensures these don't clash.
 *
 * Exports: get(), displayOn(), drawOn(), drawOff().
 */

import { Select, unByKey } from './deps.js';
import olMap from './olMap.js';
let map = olMap.get();
import vectors from './vectors.js';

// select for vector layers; used by featuredisplay, modify and delete
let select = new Select({
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
