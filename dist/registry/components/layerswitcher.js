import e from"./layerswitcher.htm.js";import t from"./component.js";var r=new t(e);import a from"./toolbar.js";var l=r.getTemplate("layerswitcher"),n=l.getElementById("layerswitch"),d=r.getTemplate("rasters"),i=d.getElementById("rasters"),c=r.getTemplate("vectors"),o=c.getElementById("vectors"),p={rasters:!1,vectors:!1,ls:!1};function s(){p.ls||(a.querySelector("#layers-content").appendChild(l),p.ls=!0)}export default{addRasterDiv:function(e){var t=document.createElement("input");t.name="rasters",t.value=e.getProperties().id,t.id=t.value.replace(/ |\(|\)/g,""),t.type="radio";var r=document.createElement("label");r.htmlFor=r.innerHTML=t.value,r.style.verticalAlign="bottom";var a=document.createElement("div");return a.appendChild(t),a.appendChild(r),i.appendChild(a),p.rasters?s():(t.checked=!0,n.appendChild(d),p.rasters=!0),a},addVectorDiv:function(e){var t=document.createElement("input");t.name=t.id=t.value=e.id,t.type="checkbox",t.checked=!0;var r=document.createElement("label");r.htmlFor=r.innerHTML=t.value,r.style.verticalAlign="baseline";var a=document.createElement("div");a.appendChild(t),a.appendChild(r),o.appendChild(a);var l=!1;return p.vectors||(n.appendChild(c),p.vectors=!0,l=!0),s(),[a,l]}};