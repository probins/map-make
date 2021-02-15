import{C as e,o as t}from"../../olMap-5f1c27bb.js";import{$ as i,m as n}from"../../mapDef-32126832.js";import"./toolbar.js";import{r as s}from"../../rasters-2096df27.js";import"../../size-aa14a1dc.js";var r=function(e,t){var i=this;this.input=l(e),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-autocomplete","list"),t=t||{},function(e,t,i){for(var n in t){var s=t[n],r=e.input.getAttribute("data-"+n.toLowerCase());e[n]="number"==typeof s?parseInt(r):!1===s?null!==r:s instanceof Function?null:r,e[n]||0===e[n]||(e[n]=n in i?i[n]:s)}}(this,{minChars:2,maxItems:10,autoFirst:!1,data:r.DATA,filter:r.FILTER_CONTAINS,sort:r.SORT_BYLENGTH,item:r.ITEM,replace:r.REPLACE},t),this.index=-1,this.container=l.create("div",{className:"awesomplete",around:e}),this.ul=l.create("ul",{hidden:"hidden",inside:this.container}),this.status=l.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-relevant":"additions",inside:this.container}),l.bind(this.input,{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(e){var t=e.keyCode;i.opened&&(13===t&&i.selected?(e.preventDefault(),i.select()):27===t?i.close({reason:"esc"}):38!==t&&40!==t||(e.preventDefault(),i[38===t?"previous":"next"]()))}}),l.bind(this.input.form,{submit:this.close.bind(this,{reason:"submit"})}),l.bind(this.ul,{mousedown:function(e){var t=e.target;if(t!==this){for(;t&&!/li/i.test(t.nodeName);)t=t.parentNode;t&&0===e.button&&(e.preventDefault(),i.select(t,e.target))}}}),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||t.list||[],r.all.push(this)};function o(e){var t=Array.isArray(e)?{label:e[0],value:e[1]}:"object"==typeof e&&"label"in e&&"value"in e?e:{label:e,value:e};this.label=t.label||t.value,this.value=t.value}r.prototype={set list(e){if(Array.isArray(e))this._list=e;else if("string"==typeof e&&e.indexOf(",")>-1)this._list=e.split(/\s*,\s*/);else if((e=l(e))&&e.children){var t=[];a.apply(e.children).forEach((function(e){if(!e.disabled){var i=e.textContent.trim(),n=e.value||i,s=e.label||i;""!==n&&t.push({label:s,value:n})}})),this._list=t}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return!this.ul.hasAttribute("hidden")},close:function(e){this.opened&&(this.ul.setAttribute("hidden",""),this.index=-1,l.fire(this.input,"awesomplete-close",e||{}))},open:function(){this.ul.removeAttribute("hidden"),this.autoFirst&&-1===this.index&&this.goto(0),l.fire(this.input,"awesomplete-open")},next:function(){var e=this.ul.children.length;this.goto(this.index<e-1?this.index+1:-1)},previous:function(){var e=this.ul.children.length;this.goto(this.selected?this.index-1:e-1)},goto:function(e){var t=this.ul.children;this.selected&&t[this.index].setAttribute("aria-selected","false"),this.index=e,e>-1&&t.length>0&&(t[e].setAttribute("aria-selected","true"),this.status.textContent=t[e].textContent,l.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(e,t){if(e?this.index=l.siblingIndex(e):e=this.ul.children[this.index],e){var i=this.suggestions[this.index];l.fire(this.input,"awesomplete-select",{text:i,origin:t||e})&&(this.replace(i),this.close({reason:"select"}),l.fire(this.input,"awesomplete-selectcomplete",{text:i}))}},evaluate:function(){var e=this,t=this.input.value;t.length>=this.minChars&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map((function(i){return new o(e.data(i,t))})).filter((function(i){return e.filter(i,t)})).sort(this.sort).slice(0,this.maxItems),this.suggestions.forEach((function(i){e.ul.appendChild(e.item(i,t))})),0===this.ul.children.length?this.close({reason:"nomatches"}):this.open()):this.close({reason:"nomatches"})}},r.all=[],r.FILTER_CONTAINS=function(e,t){return RegExp(l.regExpEscape(t.trim()),"i").test(e)},r.FILTER_STARTSWITH=function(e,t){return RegExp("^"+l.regExpEscape(t.trim()),"i").test(e)},r.SORT_BYLENGTH=function(e,t){return e.length!==t.length?e.length-t.length:e<t?-1:1},r.ITEM=function(e,t){var i=""===t?e:e.replace(RegExp(l.regExpEscape(t.trim()),"gi"),"<mark>$&</mark>");return l.create("li",{innerHTML:i,"aria-selected":"false"})},r.REPLACE=function(e){this.input.value=e.value},r.DATA=function(e){return e},Object.defineProperty(o.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),o.prototype.toString=o.prototype.valueOf=function(){return""+this.label};var a=Array.prototype.slice;function l(e,t){return"string"==typeof e?(t||document).querySelector(e):e||null}function d(e,t){return a.call((t||document).querySelectorAll(e))}function u(){d("input.awesomplete").forEach((function(e){new r(e)}))}l.create=function(e,t){var i=document.createElement(e);for(var n in t){var s=t[n];if("inside"===n)l(s).appendChild(i);else if("around"===n){var r=l(s);r.parentNode.insertBefore(i,r),i.appendChild(r)}else n in i?i[n]=s:i.setAttribute(n,s)}return i},l.bind=function(e,t){if(e)for(var i in t){var n=t[i];i.split(/\s+/).forEach((function(t){e.addEventListener(t,n)}))}},l.fire=function(e,t,i){var n=document.createEvent("HTMLEvents");for(var s in n.initEvent(t,!0,!0),i)n[s]=i[s];return e.dispatchEvent(n)},l.regExpEscape=function(e){return e.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},l.siblingIndex=function(e){for(var t=0;e=e.previousElementSibling;t++);return t},"undefined"!=typeof Document&&("loading"!==document.readyState?u():document.addEventListener("DOMContentLoaded",u)),r.$=l,r.$$=d;const c=new e('\n<template id="addlayertemplate">\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.1/awesomplete.min.css">\n  <style>\n    #rasters, #vectors {\n      border:1px solid #D2D8DE;\n    }\n  </style>\n  <div>\n  <div id="rasters">\n    <div>Add a raster layer:</div>\n    <div>Code <input type="text" class="awesomplete" size="10" id="rastercode" placeholder="Enter registry code"></div>\n    <div>API <input type="text" size="10" id="api" placeholder="Enter API code if needed"></div>\n    <button id="addraster">Add</button>\n  </div>\n  <div id="vectors">\n    <div>Add vector file:</div>\n    <div>Name/identifier <input type="text" size="10" id="vectorname" placeholder="(used in layerswitcher)"></div>\n    <div>Url <input type="text" size="20" id="vectorurl"></div>\n    <div><i>or</i> local file: <form id="fileform"><input type="file" id="vectorfile"></form></div>\n    <div>MongoDB? <input type="checkbox" id="mongodb" value="mongodb"></div>\n    <button id="addvector">Add</button>\n  </div>\n  </div>\n</template>\n',"addlayer");i("#layers-content").appendChild(c.getTemplate("addlayer"));const h=n.get();new r(document.querySelector("#rastercode"),{list:["at/topo","be/ign/topo","bing/AerialLabels","bing/Road","ch/topo/pixel","cz/zm","de/bkg/atlasde","es/icc/topo","es/ign/mapas","fr/ign/etat","fr/ign/photos","fr/ign/topo","gb/os","gb/os/leisure","gb/os/light","gb/os/outdoor","gb/os/road","it/pcn","nl/ngr/achter","osm/osm","osm/opentopo","pl/topo","pt/dgt/sc","si/gurs","srtm/4326","srtm/laea","srtm/maps4free"],minChars:1});const p=t.get();i("#addraster").addEventListener("click",()=>{const e=i("#rastercode").value;import("../sources/"+e+".js").then(t=>{let n;if(i("#api").value){n={rasters:[]};const t={};t[e]=i("#api").value,n.rasters.push(t)}s.add([t],n),h.rasters=h.rasters||[],h.rasters.push(e);const r=s.getLayers(),o=r.item(r.get("length")-1).getProperties().id;s.changeLayer.bind(p)(o);const a=i("#"+o.replace(/ |\(\)/g,""));a&&(a.checked=!0),i("#rastercode").value="",i("#api").value=""})}),i("#addvector").addEventListener("click",()=>{const e={add:!0};if(!0===i("#mongodb").checked&&(e.format="mongo"),i("#vectorurl").value){const t=i("#vectorurl").value;e.url=t,e.id=i("#vectorname").value||t,n(e)}if(i("#vectorfile").files.length>0){const t=i("#vectorfile").files[0];e.type="file",e.filename=t.name,e.id=i("#vectorname").value||t.name;const s=new FileReader;s.onload=t=>{e.file=t.target.result,n(e)},s.readAsText(t)}function n(e){import("../../vectors-e5dcdfa8.js").then((function(e){return e.f})).then(n=>{n.default.add({vectors:[e]}),0===s.getLayers().get("length")&&t.use4326View(),i("#vectorurl").value="",i("#fileform").reset(),delete e.add,h.vectors=h.vectors||[],h.vectors.push(e)})}});
