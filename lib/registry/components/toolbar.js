var map = require('olMap').get();
var utils = require('utils');
var $ = utils.$;
document.body.appendChild(utils.importTemplate('toolbar'));

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

map.getViewport().appendChild(utils.importTemplate('toolbar', 'toggle'));
// toolbar slideout 
var slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar')
});
$('#slide-toggle').addEventListener('click', function() {
  slideout.toggle();
});

$('#addlayer').addEventListener('click', function() {
  utils.importComponent('addlayer');
});
$('#addgoto').addEventListener('click', function() {
  utils.importComponent('center');
});
$('#adddraw').addEventListener('click', function() {
  utils.importComponent('draw');
});
$('#addmapDef').addEventListener('click', function() {
  utils.importComponent('mapdef');
});
module.exports = $('#toolbar');
