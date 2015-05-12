var utils = require('utils');
var $ = utils.$;
document.body.appendChild(document.importNode($('toolbarlink').import
    .getElementById('toolbartemplate').content, true));
$('mapDef').addEventListener('change', function() {
  window.location.search = 'mapDef=' + this.value;
});
$('addlayer').addEventListener('click', function() {
  utils.importComponent('addlayer');
});
$('addgoto').addEventListener('click', function() {
  utils.importComponent('center');
});
$('adddraw').addEventListener('click', function() {
  utils.importComponent('draw');
});
module.exports = $('toolbar');
