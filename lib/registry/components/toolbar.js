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
var components = {
  'addlayer': 'addlayer',
  'addgoto': 'center',
  'adddraw': 'draw',
  'addmapDef': 'mapdef',
  'addmouse': 'mouseposition',
  'addpopup': 'featuredisplay',
  'addtooltip': 'tooltip'
};
var listener = function() {
  var me = this.getAttribute('id');
  System.import('components/' + components[me]);
  // hide button and remove listener
  this.style.display = 'none';
  this.removeEventListener('click', listener);
};
for (var button in components) {
  template.querySelector('#'+button).addEventListener('click', listener);
}

// if no vectors, hide popup/tooltip
if (!mapDef.vectors) {
  template.querySelector('#addpopup').style.display = 'none';
  template.querySelector('#addtooltip').style.display = 'none';
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
