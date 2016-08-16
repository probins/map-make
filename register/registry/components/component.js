'use strict';

System.register(['../../mapDef.js'], function (_export, _context) {
  var md, mapDef;


  function Component(tpl, name) {
    // parse html
    var div = document.createElement('div');
    div.innerHTML = tpl;

    // import template(s)
    this.templates = {};
    var templates = div.querySelectorAll('template');
    for (var i = 0; i < templates.length; i++) {
      this.templates[templates[i].getAttribute('id')] = document.importNode(templates[i].content, true);
    }

    if (name) {
      // add to mapDef
      mapDef.components = mapDef.components || [];
      if (mapDef.components.indexOf(name) == -1) {
        mapDef.components.push(name);
      }
      // hide toolbar button/option
      document.querySelector('#' + name + 'button,#' + name + 'option').style.display = 'none';
    }
  }

  return {
    setters: [function (_mapDefJs) {
      md = _mapDefJs.default;
    }],
    execute: function () {
      mapDef = md.get();
      Component.prototype.getTemplate = function (name) {
        return this.templates[name + 'template'];
      };

      _export('default', Component);
    }
  };
});
