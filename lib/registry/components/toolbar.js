// import templates
var tpl = require('components/toolbar.html');
var Component = require('components/component');
var toolbar = new Component(tpl);

var map = require('olMap').get();
var utils = require('utils');
var $ = utils.$;
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
  'addmapDef': 'mapdef'
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
document.body.appendChild(template);

// add toggle button to map
map.getViewport().appendChild(toolbar.getTemplate('toggle'));
// create toolbar slideout
var slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar')
});
$('#slide-toggle').addEventListener('click', function() {
  slideout.toggle();
});

module.exports = $('#toolbar');
