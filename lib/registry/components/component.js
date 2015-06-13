/** Component class
 *
 *  Components are add-ons with visual content
 *  They have one or more templates stored in an HTML file with the same name
 *  as the js module.
 */

function Component(tpl) {
  this.div = document.createElement('div');
  this.div.innerHTML = tpl;
}

Component.prototype.getTemplate = function(name) {
  return this.div.querySelector('#' + name + 'template').content.cloneNode(true);
};

module.exports = Component;
