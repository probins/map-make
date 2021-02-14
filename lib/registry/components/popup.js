/**
 * Creates an ol.Overlay for displaying attributes.
 * Used by draw and featuredisplay, and not added directly.
 */

// import templates
import tpl from './popup.htm.js';
import Component from './component.js';
import olMap from '../../olMap.js';
import Overlay from "ol/Overlay.js";
// import { Overlay } from '../../deps.js';

const component = new Component(tpl);
const temp = component.getTemplate('popup');
document.body.appendChild(temp.querySelector('style'));

const map = olMap.get();

const overlay = new Overlay({
  element: temp.querySelector('div'),
  positioning: 'bottom-center',
  offset: [0, -15]
});
map.addOverlay(overlay);

export default {
  getOverlay: function() {
    return overlay;
  }
};
