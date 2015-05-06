  function $(s) { return document.getElementById(s) }
  document.body.appendChild(document.importNode($('toolbarlink').import
      .getElementById('toolbartemplate').content, true));
  $('addlayer').addEventListener('click', function() {
    importComponent('addlayer', 'lib/registry/components/addlayer.html');
  });
  $('addgoto').addEventListener('click', function() {
    importComponent('center', 'lib/registry/components/center.html');
  });
  $('adddraw').addEventListener('click', function() {
    importComponent('adddraw', 'lib/registry/components/draw.html');
  });
  module.exports = $('toolbar');
