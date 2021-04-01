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
import olMap from '../../olMap.js';
import { $ } from '../../utils.js';
import md from '../../mapDef.js';
import Slideout from './ext/slideout.min.js';

const toolbar = new Component(tpl);
const template = toolbar.getTemplate('toolbar');

function createToggles(className) {
  function toggleNext() {
    // toggle display of next, i.e. content, element
    const el = this.nextElementSibling;
    el.style.display = (el.style.display == 'block') ? 'none' : 'block';
  }
  const divs = template.querySelectorAll(className);
  for (const div of divs) {
    div.addEventListener('click', toggleNext);
  }
}

// add toggle listener to all toolbartitle divs
createToggles('.toolbartitle');
// ... and helptitle
createToggles('.helptitle');

const mapDef = md.get();

// set click listeners on toolbar buttons
function listener() {
  // component name is button id minus 'button'
  const me = this.getAttribute('id').replace('button', '');
  import('./' + me + '.js');
  // hide button and remove listener
  this.style.display = 'none';
  this.removeEventListener('click', listener);
}
const btns = template.querySelectorAll('.addbutton');
for (const btn of btns) {
  // component name is button id minus 'button'
  const comp = btn.getAttribute('id').replace('button', '');
  if (!(mapDef.components && mapDef.components[comp])) {
    // add listener if component not already added
    btn.addEventListener('click', listener);
  }
}

// if no vectors, hide popup/tooltip
if (!mapDef.vectors) {
  const btns = template.querySelectorAll('.vectorOption');
  for (const btn of btns) {
    btn.style.display = 'none';
  }
}

document.body.appendChild(template);

// add listener to component add dropdown
$('#addcomponent').onchange = function(e) {
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
const toggle = toolbar.getTemplate('toggle');
olMap.addControl(toggle);

// create toolbar slideout
const slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar'),
  'touch': false
});
// stop toggle button from hogging focus
$('#slide-toggle').addEventListener('click', function() {
  slideout.toggle();
  this.blur();
});

export default $('#toolbar');
