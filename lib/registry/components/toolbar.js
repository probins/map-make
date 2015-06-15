/**
 * Toolbar: a container in a slideout panel
 * Buttons that load components have addbutton class; can be toggles, and are
 * hidden when loaded.
 * Buttons with vectorButton class are only displayed if there are vector layers.
 * Each section within toolbar has accordion-style display toggle.
 */

// import templates
var tpl = require('components/toolbar.html');
var Component = require('components/component');
var toolbar = new Component(tpl);

var ol = require('ol');
var map = require('olMap').get();
var utils = require('utils');
var $ = utils.$;
var mapDef = require('mapDef').get();

var template = toolbar.getTemplate('toolbar');

// add toggle listener to all toolbartitle divs 
var divs = template.querySelectorAll('.toolbartitle');
var cb = function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
};
for (var i=0; i<divs.length; i++) {
  divs[i].addEventListener('click', cb);
}

// set click listeners on toolbar buttons
var listener = function() {
  // component name is button id minus 'button'
  var me = this.getAttribute('id').replace('button', '');
  System.import('components/' + me);
  // hide button and remove listener
  this.style.display = 'none';
  this.removeEventListener('click', listener);
};
var btns = template.querySelectorAll('.addbutton');
for (var i=0; i<btns.length; i++) {
  // component name is button id minus 'button'
  var comp = btns[i].getAttribute('id').replace('button', '');
  if (!(mapDef.components && mapDef.components[comp])) {
    // add listener if component not already added
    btns[i].addEventListener('click', listener);
  }
}

// if no vectors, hide popup/tooltip
if (!mapDef.vectors) {
  btns = template.querySelectorAll('.vectorButton');
  for (var i=0; i<btns.length; i++) {
    btns[i].style.display = 'none';
  }
}

document.body.appendChild(template);

// add toggle button to map
// use ol.control to prevent event propagation
map.addControl(new ol.control.Control({element: toolbar.getTemplate('toggle')}));
// create toolbar slideout
var slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar')
});
$('#slide-toggle').addEventListener('click', function() {
  slideout.toggle();
});

module.exports = $('#toolbar');
