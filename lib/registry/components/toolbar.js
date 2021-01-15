/**
 * Toolbar: a container in a slideout panel
 * Most optional components are in a dropdown box, and are hidden when loaded.
 * Other buttons that load components have addbutton class; can be toggles,
 * and are also hidden when loaded.
 * Options with vectorOption class are only displayed if there are vector layers.
 * Each section within toolbar has accordion-style display toggle.
 * Help section similarly has sub-sections with accordion-style display toggle.
 *
 * uses import()
 */

// import templates
import tpl from './toolbar.htm.js';
import Component from './component.js';
const toolbar = new Component(tpl);

import olMap from '../../olMap.js';
let map = olMap.get();
import utils from '../../utils.js';
const $ = utils.$;
import md from '../../mapDef.js';
let mapDef = md.get();
let i;
import Slideout from './ext/slideout.min.js';

let template = toolbar.getTemplate('toolbar');

// add toggle listener to all toolbartitle divs
let divs = template.querySelectorAll('.toolbartitle');
let cb = function() {
  // toggle display of next, i.e. content, element
  let el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
};
for (i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', cb);
}

// set click listeners on toolbar buttons
let listener = function() {
  // component name is button id minus 'button'
  let me = this.getAttribute('id').replace('button', '');
  import('./' + me + '.js');
  // hide button and remove listener
  this.style.display = 'none';
  this.removeEventListener('click', listener);
};
let btns = template.querySelectorAll('.addbutton');
for (i = 0; i < btns.length; i++) {
  // component name is button id minus 'button'
  let comp = btns[i].getAttribute('id').replace('button', '');
  if (!(mapDef.components && mapDef.components[comp])) {
    // add listener if component not already added
    btns[i].addEventListener('click', listener);
  }
}

// if no vectors, hide popup/tooltip
if (!mapDef.vectors) {
  btns = template.querySelectorAll('.vectorOption');
  for (i = 0; i < btns.length; i++) {
    btns[i].style.display = 'none';
  }
}

// add toggle listener to all helptitle divs
divs = template.querySelectorAll('.helptitle');
cb = function() {
  // toggle display of next, i.e. content, element
  let el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
};
for (i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', cb);
}

document.body.appendChild(template);

// add listener to component add dropdown
$('#addcomponent').onchange = e => {
  if (e.target.value !== 'choose') {
    if (e.target.value == 'redraw') {
      // 'draw' set to 'redraw' when hidden
      $('#drawtype').style.display = 'block';
      $('#drawoption').style.display = 'none';
    } else {
      import('./' + e.target.value + '.js');
      $('#' + e.target.value + 'option').style.display = 'none';
    }
    this.value = 'choose';
    this.blur();
  }
};

// add toggle button to map
let toggle = toolbar.getTemplate('toggle');
olMap.addControl(toggle);

// create toolbar slideout
let slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar'),
  'touch': false
});
$('#slide-toggle').addEventListener('click', () => {
  slideout.toggle();
});

export default $('#toolbar');
