ol is imported in:
* mongo.js (Feature, GeoJSON), rasters.js (Projection, transformExtent), select.js (Select, unByKey), vectors.js (transformExtent, VectorSource, VectorLayer, Style, Stroke, Fill, Circle), olMap.js (Map, controlDefaults, ScaleLine, GroupLayer, transform, View, Control)
* registry/components/center.js (transform), cursorposition.js (MousePosition), draw.js (Draw, Modify, unByKey, LineString, Feature), geolocation.js (Overlay, transform), mapdef.js (transform), placesearch.js (transform), popup.js (Overlay), serialise.js (Feature), tooltip.js (Select)
* registry/projections/common.js (addProjection, Projection, addCoordinateTransforms)
* registry/sources/bing/AerialLabels.js (Bing, TileLayer), bing/Road.js, fr/ign/cassini.js, gb/os.js, it/pcn.js, it/pcn32633.js, pt/dgt/sc.js, pt/dgt/sc200.js, si/gurs.js, srtm/4326.js, srtm/laea.js, wms.js (TileGrid, TileLayer, TileWMS), wmts.js (WMTSTileGrid, TileLayer, WMTS), xyz.js (TileGrid, TileLayer, XYZ)


"ol.Feature": mongo, components/draw, components/serialise
"ol.Map": olMap
"ol.Overlay": components/geolocation, components/popup
"ol.View": olMap
"ol.control.Control": olMap
"ol.control.MousePosition": components/cursorposition
"ol.control.ScaleLine": olMap
"ol.format.GeoJSON": mongo, vectors
"ol.format.GPX": vectors
"ol.format.KML": vectors
"ol.geom.LineString": components/draw, mongo
"ol.geom.MultiLineString": components/draw, mongo
"ol.geom.Point": components/draw, mongo
"ol.geom.Polygon": components/draw, mongo
"ol.interaction.Draw": components/draw
"ol.interaction.Modify": components/draw
"ol.interaction.Select": select
"ol.layer.Group": olMap
"ol.layer.Tile": sources/*
"ol.layer.Vector": vectors
"ol.proj.Projection": projections/common
"ol.source.BingMaps": sources/bing/*
"ol.source.TileImage": sources/srtm/*
"ol.source.TileWMS": sources/wms, sources/gb/os, sources/it/pcn*, sources/pt/dgt/*, sources/si/gurs
"ol.source.Vector": vectors
"ol.source.WMTS": sources/wmts
"ol.source.XYZ": sources/xyz
"ol.style.Circle": vectors
"ol.style.Fill": vectors
"ol.style.Image": NOT USED
"ol.style.Stroke": vectors
"ol.style.Style": vectors
"ol.tilegrid.TileGrid": as source.TileWMS
"ol.tilegrid.WMTS": as source.WMTS

"ol.MapBrowserEvent#coordinate": ?
"ol.MapBrowserEvent#pixel": ?

"ol.Observable.unByKey": components/draw, select
"ol.control.defaults": olMap
"ol.proj.addCoordinateTransforms": projections/common
"ol.proj.addProjection": projections/common
"ol.proj.transform": olMap, components/center,geolocation,mapdef,locationsearch,
"ol.proj.transformExtent": rasters, vectors


"ol.Collection#clear",
"ol.Collection#extend",
"ol.Collection#forEach",
"ol.Collection#getArray",
"ol.Collection#item",
"ol.Collection#push",
"ol.Feature#getGeometry",
"ol.Feature#getId",
"ol.Feature#setGeometry",
"ol.Feature#setId",
"ol.Map#addControl",
"ol.Map#addInteraction",
"ol.Map#addLayer",
"ol.Map#addOverlay",
"ol.Map#getLayers",
"ol.Object#get",
"ol.Object#getProperties",
"ol.Object#set",
"ol.Object#unset",
"ol.Observable#on",
"ol.Observable#once",
"ol.View#calculateExtent",
"ol.View#fit",
"ol.View#getProjection",
"ol.View#getZoom",
"ol.View#setCenter",
"ol.View#setZoom",
"ol.format.GeoJSON#readFeatures",
"ol.format.GPX#readFeatures",
"ol.format.KML#readFeatures",
"ol.format.GeoJSON#writeFeatures",
"ol.format.GPX#writeFeatures",
"ol.format.KML#writeFeatures",
"ol.format.GeoJSON#readGeometry",
"ol.format.GeoJSON#writeGeometry",
"ol.geom.LineString#getType",
"ol.geom.MultiLineString#getType",
"ol.geom.LineString#clone",
"ol.geom.Point#clone",
"ol.geom.Polygon#clone",
"ol.geom.LineString#getCoordinates",
"ol.geom.LinearRing#getCoordinates",
"ol.geom.MultiLineString#getCoordinates",
"ol.geom.Point#getCoordinates",
"ol.geom.Polygon#getCoordinates",
"ol.geom.LineString#getLastCoordinate",
"ol.geom.Polygon#getInteriorPoint",
"ol.geom.Polygon#getLinearRing",
"ol.geom.Geometry#simplify",
"ol.geom.Geometry#transform",
"ol.interaction.Select#getFeatures",
"ol.interaction.Select#getLayer",
"ol.proj.Projection#getCode",
"ol.source.Source#getProjection",
"ol.source.TileWMS#setUrl",
"ol.source.TileWMS#updateParams",
"ol.source.Vector#addFeatures",
"ol.source.Vector#getFeatureById",
"ol.source.Vector#getFeatures",
"ol.source.Vector#getExtent",
"ol.source.Vector#removeFeature",
"ol.style.Style#getFill",
"ol.style.Style#getImage",
"ol.style.Style#getStroke"
