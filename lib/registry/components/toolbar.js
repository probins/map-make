// import templates
var tpl = require('components/toolbar.html!text');
var Component = require('components/component');
var toolbar = new Component(tpl);

var map = require('olMap').get();
var utils = require('utils');
var $ = utils.$;
document.body.appendChild(toolbar.getTemplate('toolbar'));

// add toggle listener to all toolbartitle divs 
var divs = utils.$$('.toolbartitle');
var cb = function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
};
for (var i=0; i<divs.length; i++) {
  divs[i].addEventListener('click', cb);
}

map.getViewport().appendChild(toolbar.getTemplate('toggle'));
// toolbar slideout 
var slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar')
});
$('#slide-toggle').addEventListener('click', function() {
  slideout.toggle();
});

$('#addlayer').addEventListener('click', function() {
  System.import('components/addlayer');
});
$('#addgoto').addEventListener('click', function() {
  System.import('components/center');
});
$('#adddraw').addEventListener('click', function() {
  System.import('components/draw');
});
$('#addmapDef').addEventListener('click', function() {
  System.import('components/mapdef');
});
module.exports = $('#toolbar');
