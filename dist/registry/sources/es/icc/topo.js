import t from"../../common.js";import o from"../../../projections/25831.js";const e=[258e3,4485e3,536e3,4752e3];const r=[1100,550,275,100,50,25,10,5,2,1,.5,.25];const a={type:"WMS",id:"Catalan topos",sourceOptions:{url:"http://mapcache.icc.cat/map/bases/service?",attributions:'Cartographic base from <a target="_blank" '+'href="http://www.icc.cat/">Institut Cartogràfic de Catalunya</a>',params:{VERSION:"1.1.1",LAYERS:"topo"},projection:o.projCode},tileGridOptions:{resolutions:r,extent:e}};export default{getLayers:function(){return t(a)},extent:e,projCode:o.projCode,resolutions:r};