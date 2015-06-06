// Component class

function Component(tpl) {
  this.div = document.createElement('div');
  this.div.innerHTML = tpl;
}

Component.prototype.getTemplate = function(name) {
  return this.div.querySelector('#' + name + 'template').content.cloneNode(true);
};

module.exports = Component;
