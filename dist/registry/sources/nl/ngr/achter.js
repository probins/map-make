import t from"../../common.js";import e from"../../../projections/28992.js";const o=[-370406.0809530817,22598.08010419138,595401.9205391756,903401.9205804092],r=[3440.64,1720.32,860.16,430.08,215.04,107.52,53.76,26.88,13.44,6.72,3.36,1.68,.84,.42,.21],a={type:"WMTS",extent:o,id:"NGR-PDOK",sourceOptions:{url:"https://geodata.nationaalgeoregister.nl/tiles/service/wmts/?",layer:"brtachtergrondkaart",matrixSet:"EPSG:28992",projection:e.projCode,style:"default",format:"image/png",attributions:'Map base: &copy; <a href="http://www.nationaalgeoregister.nl/" target="_blank">NGR/PDOK</a>'},tileGridOptions:{extent:o,sizes:[[1,-1],[2,-2],[4,-4],[8,-8],[16,-16],[32,-32],[64,-64],[128,-128],[256,-256],[512,-512],[1024,-1024],[2048,-2048],[4096,-4096],[8192,-8192],[16384,-16384]],origin:[-285401.92,903402],resolutions:r,matrixIds:["EPSG:28992:0","EPSG:28992:1","EPSG:28992:2","EPSG:28992:3","EPSG:28992:4","EPSG:28992:5","EPSG:28992:6","EPSG:28992:7","EPSG:28992:8","EPSG:28992:9","EPSG:28992:10","EPSG:28992:11","EPSG:28992:12","EPSG:28992:13","EPSG:28992:14"]}};export default{getLayers:function(){return t(a)},extent:o,projCode:e.projCode,resolutions:r};