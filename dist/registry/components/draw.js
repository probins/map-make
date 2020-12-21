import e from"./draw.htm.js";import t from"./component.js";var r=new t(e,"draw");import o from"../../ext/ol.js";import a from"../../olMap.js";var n=a.get();import i from"../../utils.js";var l=i.$;import"./toolbar.js";n.addControl(new o.control.Control({element:r.getTemplate("draw")}));import s from"../../select.js";import u from"../../vectors.js";import{getLength as g,getArea as d}from"../../measure.js";import{transformCoords as c}from"../../olUtils.js";import f from"./popup.js";var v,m=f.getOverlay();u.add({vectors:[{id:"Drawn"}]});var p,y=u.getLayers().item(u.getLayers().get("length")-1).get("source"),w=s.get().getFeatures(),h={point:new o.interaction.Draw({source:y,type:"Point"}),ls:new o.interaction.Draw({source:y,type:"LineString"}),poly:new o.interaction.Draw({source:y,type:"Polygon"}),modify:new o.interaction.Modify({features:w}),split:new o.interaction.Modify({features:w,deleteCondition:function(){return!1}})},C=r.getTemplate("featureform");function b(){var e=this.parentNode.querySelector("template"),t=e.content.firstElementChild.cloneNode(!0);l("#featureformAtts").insertBefore(t,e);var r=l("#featureformAtts").querySelectorAll("input");r[r.length-2].focus()}var L,S=function(e){for(var t=m.get("element");t.firstChild;)t.removeChild(t.firstChild);t.appendChild(C.cloneNode(!0)),l("#featureformid").value="",l("#plusbutton").onclick=b,l("#featurebutton").onclick=function(){l("#featureformid").value&&e.feature.setId(l("#featureformid").value);for(var r=l("#featureformAtts").querySelectorAll("div"),o=0;o<r.length;o++){var a=r[o].querySelectorAll("input");a[0].value&&e.feature.set(a[0].value,a[1].value)}t.style.display="none"},m.set("position",n.get("view").get("center")),t.style.display="block",l("#featureformid").focus(),p&&o.Observable.unByKey(p)};for(L in h.point.on("drawend",S),h.ls.on("drawend",S),h.poly.on("drawend",S),h.ls.on("drawstart",(function(e){var t=e.coordinate;p=e.feature.getGeometry().on("change",(function(e){t=e.target.getLastCoordinate();let r=c(e.target,n.get("view").getProjection()),o=g(r);m.get("element").innerHTML=Math.round(.1*o)/100+" km",m.set("position",t),m.get("element").style.display="block"}))})),h.poly.on("drawstart",(function(e){var t=e.coordinate;p=e.feature.getGeometry().on("change",(function(e){t=e.target.getInteriorPoint().getCoordinates();let r=c(e.target,n.get("view").getProjection()),o=d(r);m.get("element").innerHTML=Math.round(o/1e6*100)/100+" km<sup>2</sup>",m.set("position",t),m.get("element").style.display="block"}))})),h.modify.on("modifyend",(function(e){var t=e.features.item(0),r=s.get().getLayer(t);"Drawn"!==r.get("id")&&(r.get("source").removeFeature(t),y.addFeatures([t]),w.clear())})),h)n.addInteraction(h[L]),h[L].set("active",!1);var j,k=!1,F=!1;l("#drawtype").onchange=function e(t){for(var r in w.clear(),h)h[r].set("active",!1);h[t.target.value]&&h[t.target.value].set("active",!0);"deleet"==t.target.value?(j=w.on("add",(function(e){s.get().getLayer(e.element).get("source").removeFeature(e.element),w.clear()})),k=!0):k&&(o.Observable.unByKey(j),k=!1);"hide"==t.target.value||"choose"==t.target.value?(s.drawOff(),"hide"==t.target.value&&(this.style.display="none",l("#drawoption").style.display="block",l("#drawoption").value="redraw",l("#drawtype").value="choose")):s.drawOn();-1==["point","ls","poly"].indexOf(t.target.value)?s.get().set("active",!0):s.get().set("active",!1);"modAtts"==t.target.value?(j=w.on("add",(function(e){for(var t=m.get("element");t.firstChild;)t.removeChild(t.firstChild);t.appendChild(C.cloneNode(!0));var r=e.element;l("#featureformid").value=r.getId();var o=r.getProperties(),a=l("#featureformAtts");for(var i in o)if("geometry"!=i){var u=a.querySelector("template").content.firstElementChild.cloneNode(!0),g=u.querySelectorAll("input");g[0].value=i,g[1].value=o[i],a.insertBefore(u,a.firstElementChild)}l("#plusbutton").onclick=b,l("#featurebutton").onclick=function(){r.setId(l("#featureformid").value);for(var e=l("#featureformAtts").querySelectorAll("div"),o=0;o<e.length;o++){var a=e[o].querySelectorAll("input");a[1].value?r.set(a[0].value,a[1].value):r.unset(a[0].value)}t.style.display="none";var n=s.get().getLayer(r);"Drawn"!==n.get("id")&&(n.get("source").removeFeature(r),y.addFeatures([r]))},m.set("position",n.get("view").get("center")),t.style.display="block"})),F=!0):F&&(o.Observable.unByKey(j),F=!1);"save"!=t.target.value&&"saveall"!=t.target.value||import("./serialise.js").then((function(e){e.default(t.target.value,"Drawn")}));if("split"==t.target.value){var a;s.get().once("select",(function(e){if(e.selected[0]){var t=e.selected[0].getGeometry();t.getType()&&"LineString"==t.getType()?a=t.getCoordinates():t.getType()&&"MultiLineString"==t.getType()&&1===t.getCoordinates().length&&(a=t.getCoordinates()[0])}})),h.split.once("modifyend",(function(r){var n=r.features.item(0);if(n.getGeometry().getType()){var i=n.getGeometry().getType(),l=n.getGeometry().getCoordinates();if("MultiLineString"===i){if(1!==l.length)return;l=l[0]}for(var u=0;u<l.length&&!0===m(a,l[u]);)u++;var g=l.slice(0,u+1),d=l.slice(u),c=n.getProperties();c.geometry=new o.geom.LineString(g);var f=new o.Feature(c);c.geometry=new o.geom.LineString(d);var v=new o.Feature(c);y.addFeatures([f,v]),s.get().getLayer(n).get("source").removeFeature(n),w.clear(),t.target.value="choose",e(t)}function m(e,t){return e.some((function(e){return t.toString()==e.toString()}))}}))}"join"==t.target.value?v=s.get().on("select",(function(e){if(2==w.get("length")){var t=w.item(0),r=w.item(1),a=t.getProperties();a.geometry=new o.geom.LineString(t.getGeometry().getCoordinates().concat(r.getGeometry().getCoordinates().slice(1)));var n=new o.Feature(a);w.clear(),s.get().getLayer(r).get("source").removeFeature(r),s.get().getLayer(t).get("source").removeFeature(t),y.addFeatures([n])}})):v&&(o.Observable.unByKey(v),v=null);"clear"==t.target.value&&y.clear();l("#drawtype").blur()},l("#help-content").appendChild(r.getTemplate("drawhelp")),l("#draw-title").addEventListener("click",(function(){var e=this.nextElementSibling;e.style.display="block"==e.style.display?"none":"block"}));