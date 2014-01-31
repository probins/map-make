goog.exportSymbol(
    'ol.Attribution',
    ol.Attribution);

goog.exportSymbol(
    'ol.Collection',
    ol.Collection);
goog.exportProperty(
    ol.Collection.prototype,
    'clear',
    ol.Collection.prototype.clear);
goog.exportProperty(
    ol.Collection.prototype,
    'getArray',
    ol.Collection.prototype.getArray);
goog.exportProperty(
    ol.Collection.prototype,
    'getAt',
    ol.Collection.prototype.getAt);

goog.exportSymbol(
    'ol.control.MousePosition',
    ol.control.MousePosition);
goog.exportSymbol(
    'ol.control.ScaleLine',
    ol.control.ScaleLine);

goog.exportSymbol(
    'ol.coordinate.format',
    ol.coordinate.format);
goog.exportSymbol(
    'ol.coordinate.toStringHDMS',
    ol.coordinate.toStringHDMS);
goog.exportSymbol(
    'ol.coordinate.toStringXY',
    ol.coordinate.toStringXY);

goog.exportSymbol(
    'ol.extent',
    ol.extent);
goog.exportSymbol(
    'ol.extent.createEmpty',
    ol.extent.createEmpty);
goog.exportSymbol(
    'ol.extent.extend',
    ol.extent.extend);
goog.exportSymbol(
    'ol.extent.getCenter',
    ol.extent.getCenter);
goog.exportSymbol(
    'ol.extent.getTopLeft',
    ol.extent.getTopLeft);
goog.exportSymbol(
    'ol.extent.transform',
    ol.extent.transform);

goog.exportSymbol(
    'ol.Feature',
    ol.Feature);
goog.exportProperty(
    ol.Feature.prototype,
    'getGeometry',
    ol.Feature.prototype.getGeometry);
goog.exportProperty(
    ol.Feature.prototype,
    'getId',
    ol.Feature.prototype.getId);

// goog.exportSymbol(
//     'ol.format',
//     ol.format);
goog.exportSymbol(
    'ol.format.GeoJSON',
    ol.format.GeoJSON);
goog.exportSymbol(
    'ol.format.GPX',
    ol.format.GPX);
goog.exportSymbol(
    'ol.format.KML',
    ol.format.KML);

goog.exportSymbol(
    'ol.layer.Layer',
    ol.layer.Layer);
goog.exportProperty(
    ol.layer.Layer.prototype,
    'getSource',
    ol.layer.Layer.prototype.getSource);
goog.exportSymbol(
    'ol.layer.Tile',
    ol.layer.Tile);
goog.exportSymbol(
    'ol.layer.Vector',
    ol.layer.Vector);

goog.exportSymbol(
    'ol.Map',
    ol.Map);
goog.exportProperty(
    ol.Map.prototype,
    'addControl',
    ol.Map.prototype.addControl);
goog.exportProperty(
    ol.Map.prototype,
    'addLayer',
    ol.Map.prototype.addLayer);
goog.exportProperty(
    ol.Map.prototype,
    'addOverlay',
    ol.Map.prototype.addOverlay);
goog.exportProperty(
    ol.Map.prototype,
    'forEachFeatureAtPixel',
    ol.Map.prototype.forEachFeatureAtPixel);
goog.exportProperty(
    ol.Map.prototype,
    'getEventPixel',
    ol.Map.prototype.getEventPixel);
goog.exportProperty(
    ol.Map.prototype,
    'getLayers',
    ol.Map.prototype.getLayers);
goog.exportProperty(
    ol.Map.prototype,
    'getSize',
    ol.Map.prototype.getSize);

goog.exportProperty(
    ol.Object.prototype,
    'getProperties',
    ol.Object.prototype.getProperties);

goog.exportProperty(
    ol.Observable.prototype,
    'on',
    ol.Observable.prototype.on);
goog.exportProperty(
    ol.Observable.prototype,
    'once',
    ol.Observable.prototype.once);

goog.exportSymbol(
    'ol.Overlay',
    ol.Overlay);
goog.exportSymbol(
    'ol.OverlayPositioning',
    ol.OverlayPositioning);
goog.exportProperty(
    ol.OverlayPositioning,
    'BOTTOM_CENTER',
    ol.OverlayPositioning.BOTTOM_CENTER);

goog.exportSymbol(
    'ol.proj.getTransform',
    ol.proj.getTransform);
goog.exportSymbol(
    'ol.proj.transform',
    ol.proj.transform);
goog.exportSymbol(
    'ol.proj.Projection',
    ol.proj.Projection);
goog.exportProperty(
    ol.proj.Projection.prototype,
    'getCode',
    ol.proj.Projection.prototype.getCode);

goog.exportSymbol(
    'ol.render.FeaturesOverlay',
    ol.render.FeaturesOverlay);
goog.exportProperty(
    ol.render.FeaturesOverlay.prototype,
    'addFeature',
    ol.render.FeaturesOverlay.prototype.addFeature);
goog.exportProperty(
    ol.render.FeaturesOverlay.prototype,
    'getFeatures',
    ol.render.FeaturesOverlay.prototype.getFeatures);
goog.exportProperty(
    ol.render.FeaturesOverlay.prototype,
    'removeFeature',
    ol.render.FeaturesOverlay.prototype.removeFeature);

// goog.exportSymbol(
//     'ol.RendererHint',
//     ol.RendererHint);
// goog.exportProperty(
//     ol.RendererHint,
//     'CANVAS',
//     ol.RendererHint.CANVAS);

goog.exportSymbol(
    'ol.source.BingMaps',
    ol.source.BingMaps);
goog.exportSymbol(
    'ol.source.GeoJSON',
    ol.source.GeoJSON);
goog.exportSymbol(
    'ol.source.GPX',
    ol.source.GPX);
goog.exportSymbol(
    'ol.source.KML',
    ol.source.KML);
goog.exportSymbol(
    'ol.source.OSM',
    ol.source.OSM);
goog.exportSymbol(
    'ol.source.TileWMS',
    ol.source.TileWMS);
goog.exportProperty(
    ol.source.TileWMS.prototype,
    'updateParams',
    ol.source.TileWMS.prototype.updateParams);
goog.exportSymbol(
    'ol.source.Vector',
    ol.source.Vector);
goog.exportSymbol(
    'ol.source.WMTS',
    ol.source.WMTS);
goog.exportSymbol(
    'ol.source.WMTSRequestEncoding',
    ol.source.WMTSRequestEncoding);
goog.exportProperty(
    ol.source.WMTSRequestEncoding,
    'REST',
    ol.source.WMTSRequestEncoding.REST);
goog.exportProperty(
    ol.source.Source.prototype,
    'getProjection',
    ol.source.Source.prototype.getProjection);
goog.exportProperty(
    ol.source.Vector.prototype,
    'getAllFeatures',
    ol.source.Vector.prototype.getAllFeatures);
goog.exportProperty(
    ol.source.Vector.prototype,
    'getExtent',
    ol.source.Vector.prototype.getExtent);

goog.exportSymbol(
    'ol.style.Fill',
    ol.style.Fill);
goog.exportSymbol(
    'ol.style.Stroke',
    ol.style.Stroke);
goog.exportSymbol(
    'ol.style.Style',
    ol.style.Style);

goog.exportSymbol(
    'ol.tilegrid.TileGrid',
    ol.tilegrid.TileGrid);
goog.exportSymbol(
    'ol.tilegrid.WMTS',
    ol.tilegrid.WMTS);

goog.exportSymbol(
    'ol.View2D',
    ol.View2D);
goog.exportProperty(
    ol.View2D.prototype,
    'calculateExtent',
    ol.View2D.prototype.calculateExtent);
goog.exportProperty(
    ol.View2D.prototype,
    'fitExtent',
    ol.View2D.prototype.fitExtent);
