import{g as o}from"./xyz-f7b35bf6.js";import{p as t}from"./27700-72687704.js";const e=[896,448,224,112,56,28,14,7,3.5,1.75],r=[0,0,8e5,13e5],s={sourceOptions:{projection:t.projCode,attributions:"Map base Contains OS data &copy; Crown copyright and database rights "+(new Date).getFullYear()},tileGridOptions:{resolutions:e,extent:r,origin:[-238375,1376256]}};var a={getLayers:function(t){return s.sourceOptions.url+=t.apikey,o(s)},baseURL:"https://api.os.uk/maps/raster/v1/zxy/LAYER/{z}/{x}/{y}.png?key=",options:s,projCode:t.projCode,resolutions:e,extent:r};export{a as c};
