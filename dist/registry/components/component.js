import t from"../../mapDef.js";const e=t.get();function o(t,o){const n=document.createElement("div");n.innerHTML=t,this.templates={};const p=n.querySelectorAll("template");for(let t=0;t<p.length;t++)this.templates[p[t].getAttribute("id")]=document.importNode(p[t].content,!0);o&&(e.components=e.components||[],-1==e.components.indexOf(o)&&e.components.push(o),document.querySelector("#"+o+"button,#"+o+"option").style.display="none")}o.prototype.getTemplate=function(t){return this.templates[t+"template"]};export default o;