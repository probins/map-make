var utils = require('utils');
var $ = utils.$;
document.body.appendChild(utils.importTemplate('toolbar'));
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
