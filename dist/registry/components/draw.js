import e from"./draw.htm.js";import t from"./component.js";var r=new t(e,"draw");import o from"../../ext/ol.js";import a from"../../olMap.js";var n=a.get();import i from"../../utils.js";var l=i.$;import"./toolbar.js";n.addControl(new o.control.Control({element:r.getTemplate("draw")}));import s from"../../select.js";import u from"../../vectors.js";import g from"../../measure.js";import d from"./popup.js";var c,f=d.getOverlay();u.add({vectors:[{id:"Drawn"}]});var v,m=u.getLayers().item(u.getLayers().get("length")-1).get("source"),y=s.get().getFeatures(),p={point:new o.interaction.Draw({source:m,type:"Point"}),ls:new o.interaction.Draw({source:m,type:"LineString"}),poly:new o.interaction.Draw({source:m,type:"Polygon"}),modify:new o.interaction.Modify({features:y}),split:new o.interaction.Modify({features:y,deleteCondition:function(){return!1}})},w=r.getTemplate("featureform");function h(){var e=this.parentNode.querySelector("template"),t=e.content.firstElementChild.cloneNode(!0);l("#featureformAtts").insertBefore(t,e);var r=l("#featureformAtts").querySelectorAll("input");r[r.length-2].focus()}var C,b=function(e){for(var t=f.get("element");t.firstChild;)t.removeChild(t.firstChild);t.appendChild(w.cloneNode(!0)),l("#featureformid").value="",l("#plusbutton").onclick=h,l("#featurebutton").onclick=function(){l("#featureformid").value&&e.feature.setId(l("#featureformid").value);for(var r=l("#featureformAtts").querySelectorAll("div"),o=0;o<r.length;o++){var a=r[o].querySelectorAll("input");a[0].value&&e.feature.set(a[0].value,a[1].value)}t.style.display="none"},f.set("position",n.get("view").get("center")),t.style.display="block",l("#featureformid").focus(),v&&o.Observable.unByKey(v)};for(C in p.point.on("drawend",b),p.ls.on("drawend",b),p.poly.on("drawend",b),p.ls.on("drawstart",(function(e){var t=e.coordinate;v=e.feature.getGeometry().on("change",(function(e){t=e.target.getLastCoordinate();var r=g.getLength(e.target,n.get("view").getProjection());f.get("element").innerHTML=Math.round(.1*r)/100+" km",f.set("position",t),f.get("element").style.display="block"}))})),p.poly.on("drawstart",(function(e){var t=e.coordinate;v=e.feature.getGeometry().on("change",(function(e){t=e.target.getInteriorPoint().getCoordinates();var r=g.getArea(e.target,n.get("view").getProjection());f.get("element").innerHTML=Math.round(r/1e6*100)/100+" km<sup>2</sup>",f.set("position",t),f.get("element").style.display="block"}))})),p.modify.on("modifyend",(function(e){var t=e.features.item(0),r=s.get().getLayer(t);"Drawn"!==r.get("id")&&(r.get("source").removeFeature(t),m.addFeatures([t]),y.clear())})),p)n.addInteraction(p[C]),p[C].set("active",!1);var L,S=!1,j=!1;l("#drawtype").onchange=function e(t){for(var r in y.clear(),p)p[r].set("active",!1);p[t.target.value]&&p[t.target.value].set("active",!0);"deleet"==t.target.value?(L=y.on("add",(function(e){s.get().getLayer(e.element).get("source").removeFeature(e.element),y.clear()})),S=!0):S&&(o.Observable.unByKey(L),S=!1);"hide"==t.target.value||"choose"==t.target.value?(s.drawOff(),"hide"==t.target.value&&(this.style.display="none",l("#drawoption").style.display="block",l("#drawoption").value="redraw",l("#drawtype").value="choose")):s.drawOn();-1==["point","ls","poly"].indexOf(t.target.value)?s.get().set("active",!0):s.get().set("active",!1);"modAtts"==t.target.value?(L=y.on("add",(function(e){for(var t=f.get("element");t.firstChild;)t.removeChild(t.firstChild);t.appendChild(w.cloneNode(!0));var r=e.element;l("#featureformid").value=r.getId();var o=r.getProperties(),a=l("#featureformAtts");for(var i in o)if("geometry"!=i){var u=a.querySelector("template").content.firstElementChild.cloneNode(!0),g=u.querySelectorAll("input");g[0].value=i,g[1].value=o[i],a.insertBefore(u,a.firstElementChild)}l("#plusbutton").onclick=h,l("#featurebutton").onclick=function(){r.setId(l("#featureformid").value);for(var e=l("#featureformAtts").querySelectorAll("div"),o=0;o<e.length;o++){var a=e[o].querySelectorAll("input");a[1].value?r.set(a[0].value,a[1].value):r.unset(a[0].value)}t.style.display="none";var n=s.get().getLayer(r);"Drawn"!==n.get("id")&&(n.get("source").removeFeature(r),m.addFeatures([r]))},f.set("position",n.get("view").get("center")),t.style.display="block"})),j=!0):j&&(o.Observable.unByKey(L),j=!1);"save"!=t.target.value&&"saveall"!=t.target.value||import("./serialise.js").then((function(e){e.default(t.target.value,"Drawn")}));if("split"==t.target.value){var a;s.get().once("select",(function(e){if(e.selected[0]){var t=e.selected[0].getGeometry();t.getType()&&"LineString"==t.getType()?a=t.getCoordinates():t.getType()&&"MultiLineString"==t.getType()&&1===t.getCoordinates().length&&(a=t.getCoordinates()[0])}})),p.split.once("modifyend",(function(r){var n=r.features.item(0);if(n.getGeometry().getType()){var i=n.getGeometry().getType(),l=n.getGeometry().getCoordinates();if("MultiLineString"===i){if(1!==l.length)return;l=l[0]}for(var u=0;u<l.length&&!0===p(a,l[u]);)u++;var g=l.slice(0,u+1),d=l.slice(u),c=n.getProperties();c.geometry=new o.geom.LineString(g);var f=new o.Feature(c);c.geometry=new o.geom.LineString(d);var v=new o.Feature(c);m.addFeatures([f,v]),s.get().getLayer(n).get("source").removeFeature(n),y.clear(),t.target.value="choose",e(t)}function p(e,t){return e.some((function(e){return t.toString()==e.toString()}))}}))}"join"==t.target.value?c=s.get().on("select",(function(e){if(2==y.get("length")){var t=y.item(0),r=y.item(1),a=t.getProperties();a.geometry=new o.geom.LineString(t.getGeometry().getCoordinates().concat(r.getGeometry().getCoordinates().slice(1)));var n=new o.Feature(a);y.clear(),s.get().getLayer(r).get("source").removeFeature(r),s.get().getLayer(t).get("source").removeFeature(t),m.addFeatures([n])}})):c&&(o.Observable.unByKey(c),c=null);"clear"==t.target.value&&m.clear();l("#drawtype").blur()},l("#help-content").appendChild(r.getTemplate("drawhelp")),l("#draw-title").addEventListener("click",(function(){var e=this.nextElementSibling;e.style.display="block"==e.style.display?"none":"block"}));