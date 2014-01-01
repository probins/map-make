/**
 * @externs
 */


/**
 * @type {Object}
 */
var olx;


/**
 * @type {Object}
 */
olx.control = {};


/**
 * @type {Object}
 */
olx.interaction = {};


/**
 * @type {Object}
 */
olx.layer = {};


/**
 * @type {Object}
 */
olx.parser = {};


/**
 * @type {Object}
 */
olx.source = {};


/**
 * @type {Object}
 */
olx.style = {};


/**
 * @type {Object}
 */
olx.tilegrid = {};


/**
 * @typedef {{html: string,
 *            tileRanges: (Object.<string, Array.<ol.TileRange>>|undefined)}}
 */
olx.AttributionOptions;



/**
 * @interface
 */
olx.AttributionOptionsExtern = function() {};


/**
 * @type {string}
 */
olx.AttributionOptionsExtern.prototype.html;


/**
 * @type {Object.<string, Array.<ol.TileRange>>|undefined}
 */
olx.AttributionOptionsExtern.prototype.tileRanges;


/**
 * @typedef {{tracking: (boolean|undefined)}}
 */
olx.DeviceOrientationOptions;



/**
 * @interface
 */
olx.DeviceOrientationOptionsExtern = function() {};


/**
 * @type {boolean|undefined}
 */
olx.DeviceOrientationOptionsExtern.prototype.tracking;


/**
 * @typedef {{projection: ol.proj.ProjectionLike,
 *            tracking: (boolean|undefined),
 *            trackingOptions: (GeolocationPositionOptions|undefined)}}
 */
olx.GeolocationOptions;



/**
 * @interface
 */
olx.GeolocationOptionsExtern = function() {};


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.GeolocationOptionsExtern.prototype.projection;


/**
 * @type {boolean|undefined}
 */
olx.GeolocationOptionsExtern.prototype.tracking;


/**
 * @type {GeolocationPositionOptions|undefined}
 */
olx.GeolocationOptionsExtern.prototype.trackingOptions;



/**
 * @typedef {{error: (function()|undefined),
 *            layers: (Array.<ol.layer.Layer>|undefined),
 *            pixel: ol.Pixel,
 *            success: (function(Array.<Array.<ol.Feature|undefined>>))}}
 */
olx.GetFeaturesOptions;



/**
 * @interface
 */
olx.GetFeaturesOptionsExtern = function() {};


/**
 * @type {function()|undefined}
 */
olx.GetFeaturesOptionsExtern.prototype.error;


/**
 * @type {Array.<ol.layer.Layer>|undefined}
 */
olx.GetFeaturesOptionsExtern.prototype.layers;


/**
 * @type {ol.Pixel}
 */
olx.GetFeaturesOptionsExtern.prototype.pixel;


/**
 * @type {function(Array.<Array.<ol.Feature|undefined>>)}
 */
olx.GetFeaturesOptionsExtern.prototype.success;


/**
 * @typedef {{controls: (ol.Collection|Array.<ol.control.Control>|undefined),
 *            interactions: (ol.Collection|Array.<ol.interaction.Interaction>|undefined),
 *            layers: (Array.<ol.layer.Base>|ol.Collection|undefined),
 *            overlays: (ol.Collection|Array.<ol.Overlay>|undefined),
 *            renderer: (ol.RendererHint|undefined),
 *            renderers: (Array.<ol.RendererHint>|undefined),
 *            target: (Element|string|undefined),
 *            view: (ol.IView|undefined)}}
 */
olx.MapOptions;



/**
 * @interface
 */
olx.MapOptionsExtern = function() {};


/**
 * @type {ol.Collection|Array.<ol.control.Control>|undefined}
 */
olx.MapOptionsExtern.prototype.controls;


/**
 * @type {ol.Collection|Array.<ol.interaction.Interaction>|undefined}
 */
olx.MapOptionsExtern.prototype.interactions;


/**
 * @type {Array.<ol.layer.Base>|ol.Collection|undefined}
 */
olx.MapOptionsExtern.prototype.layers;


/**
 * @type {ol.Collection|Array.<ol.Overlay>|undefined}
 */
olx.MapOptionsExtern.prototype.overlays;


/**
 * @type {ol.RendererHint|undefined}
 */
olx.MapOptionsExtern.prototype.renderer;


/**
 * @type {Array.<ol.RendererHint>|undefined}
 */
olx.MapOptionsExtern.prototype.renderers;


/**
 * @type {Element|string|undefined}
 */
olx.MapOptionsExtern.prototype.target;


/**
 * @type {ol.IView|undefined}
 */
olx.MapOptionsExtern.prototype.view;


/**
 * @typedef {{element: (Element|undefined),
 *            insertFirst: (boolean|undefined),
 *            position: (ol.Coordinate|undefined),
 *            positioning: (ol.OverlayPositioning|undefined),
 *            stopEvent: (boolean|undefined)}}
 */
olx.OverlayOptions;



/**
 * @interface
 */
olx.OverlayOptionsExtern = function() {};


/**
 * @type {Element|undefined}
 */
olx.OverlayOptionsExtern.prototype.element;


/**
 * @type {ol.Coordinate|undefined}
 */
olx.OverlayOptionsExtern.prototype.position;


/**
 * @type {ol.OverlayPositioning|undefined}
 */
olx.OverlayOptionsExtern.prototype.positioning;



/**
 * @typedef {{code: string,
 *            extent: (ol.Extent|undefined),
 *            global: (boolean|undefined)}}
 */
olx.Proj4jsProjectionOptions;



/**
 * @interface
 */
olx.Proj4jsProjectionOptionsExtern = function() {};


/**
 * @type {string}
 */
olx.Proj4jsProjectionOptionsExtern.prototype.code;


/**
 * @type {ol.Extent|undefined}
 */
olx.Proj4jsProjectionOptionsExtern.prototype.extent;


/**
 * @type {boolean|undefined}
 */
olx.Proj4jsProjectionOptionsExtern.prototype.global;


/**
 * @typedef {{axisOrientation: (string|undefined),
 *            code: string,
 *            extent: (ol.Extent|undefined),
 *            global: (boolean|undefined),
 *            units: ol.proj.Units}}
 */
olx.ProjectionOptions;



/**
 * @interface
 */
olx.ProjectionOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.ProjectionOptionsExtern.prototype.axisOrientation;


/**
 * @type {string}
 */
olx.ProjectionOptionsExtern.prototype.code;


/**
 * @type {ol.Extent|undefined}
 */
olx.ProjectionOptionsExtern.prototype.extent;


/**
 * @type {boolean|undefined}
 */
olx.ProjectionOptionsExtern.prototype.global;


/**
 * @type {ol.proj.Units}
 */
olx.ProjectionOptionsExtern.prototype.units;


/**
 * @typedef {{center: (ol.Coordinate|undefined),
 *            extent: (ol.Extent|undefined),
 *            maxResolution: (number|undefined),
 *            maxZoom: (number|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            resolution: (number|undefined),
 *            resolutions: (Array.<number>|undefined),
 *            rotation: (number|undefined),
 *            zoom: (number|undefined),
 *            zoomFactor: (number|undefined)}}
 */
olx.View2DOptions;



/**
 * @interface
 */
olx.View2DOptionsExtern = function() {};


/**
 * @type {ol.Coordinate|undefined}
 */
olx.View2DOptionsExtern.prototype.center;


/**
 * @type {ol.Extent|undefined}
 */
olx.View2DOptionsExtern.prototype.extent;


/**
 * @type {number|undefined}
 */
olx.View2DOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.View2DOptionsExtern.prototype.maxZoom;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.View2DOptionsExtern.prototype.projection;


/**
 * @type {number|undefined}
 */
olx.View2DOptionsExtern.prototype.resolution;


/**
 * @type {Array.<number>|undefined}
 */
olx.View2DOptionsExtern.prototype.resolutions;


/**
 * @type {number|undefined}
 */
olx.View2DOptionsExtern.prototype.rotation;


/**
 * @type {number|undefined}
 */
olx.View2DOptionsExtern.prototype.zoom;



/**
 * @typedef {{className: (string|undefined),
 *            target: (Element|undefined)}}
 */
olx.control.AttributionOptions;



/**
 * @interface
 */
olx.control.AttributionOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.control.AttributionOptionsExtern.prototype.className;


/**
 * @type {Element|undefined}
 */
olx.control.AttributionOptionsExtern.prototype.target;


/**
 * @typedef {{element: (Element|undefined),
 *            target: (Element|undefined)}}
 */
olx.control.ControlOptions;



/**
 * @interface
 */
olx.control.ControlOptionsExtern = function() {};


/**
 * @type {Element|undefined}
 */
olx.control.ControlOptionsExtern.prototype.element;


/**
 * @type {Element|undefined}
 */
olx.control.ControlOptionsExtern.prototype.target;


/**
 * @typedef {{attribution: (boolean|undefined),
 *            attributionOptions: (olx.control.AttributionOptions|undefined),
 *            logo: (boolean|undefined),
 *            logoOptions: (olx.control.LogoOptions|undefined),
 *            zoom: (boolean|undefined),
 *            zoomOptions: (olx.control.ZoomOptions|undefined)}}
 */
olx.control.DefaultsOptions;



/**
 * @interface
 */
olx.control.DefaultsOptionsExtern = function() {};


/**
 * @type {boolean|undefined}
 */
olx.control.DefaultsOptionsExtern.prototype.attribution;


/**
 * @type {olx.control.AttributionOptionsExtern|undefined}
 */
olx.control.DefaultsOptionsExtern.prototype.attributionOptions;


/**
 * @type {boolean|undefined}
 */
olx.control.DefaultsOptionsExtern.prototype.logo;


/**
 * @type {olx.control.LogoOptionsExtern|undefined}
 */
olx.control.DefaultsOptionsExtern.prototype.logoOptions;


/**
 * @type {boolean|undefined}
 */
olx.control.DefaultsOptionsExtern.prototype.zoom;


/**
 * @type {olx.control.ZoomOptionsExtern|undefined}
 */
olx.control.DefaultsOptionsExtern.prototype.zoomOptions;


/**
 * @typedef {{className: (string|undefined),
 *            target: (Element|undefined)}}
 */
olx.control.LogoOptions;



/**
 * @interface
 */
olx.control.LogoOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.control.LogoOptionsExtern.prototype.className;


/**
 * @type {Element|undefined}
 */
olx.control.LogoOptionsExtern.prototype.target;


/**
 * @typedef {{className: (string|undefined),
 *            coordinateFormat: (ol.CoordinateFormatType|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            target: (Element|undefined),
 *            undefinedHTML: (string|undefined)}}
 */
olx.control.MousePositionOptions;



/**
 * @interface
 */
olx.control.MousePositionOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.className;


/**
 * @type {ol.CoordinateFormatType|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.coordinateFormat;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.control.MousePositionOptionsExtern.prototype.projection;


/**
 * @type {Element|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.target;


/**
 * @typedef {{className: (string|undefined),
 *            minWidth: (number|undefined),
 *            target: (Element|undefined),
 *            units: (ol.control.ScaleLineUnits|undefined)}}
 */
olx.control.ScaleLineOptions;



/**
 * @interface
 */
olx.control.ScaleLineOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.control.ScaleLineOptionsExtern.prototype.className;


/**
 * @type {number|undefined}
 */
olx.control.ScaleLineOptionsExtern.prototype.minWidth;


/**
 * @type {Element|undefined}
 */
olx.control.ScaleLineOptionsExtern.prototype.target;


/**
 * @type {ol.control.ScaleLineUnits|undefined}
 */
olx.control.ScaleLineOptionsExtern.prototype.units;


/**
 * @typedef {{className: (string|undefined),
 *            delta: (number|undefined),
 *            duration: (number|undefined),
 *            target: (Element|undefined)}}
 */
olx.control.ZoomOptions;



/**
 * @interface
 */
olx.control.ZoomOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.control.ZoomOptionsExtern.prototype.className;


/**
 * @type {number|undefined}
 */
olx.control.ZoomOptionsExtern.prototype.delta;


/**
 * @type {number|undefined}
 */
olx.control.ZoomOptionsExtern.prototype.duration;


/**
 * @type {Element|undefined}
 */
olx.control.ZoomOptionsExtern.prototype.target;


/**
 * @typedef {{altShiftDragRotate: (boolean|undefined),
 *            doubleClickZoom: (boolean|undefined),
 *            dragPan: (boolean|undefined),
 *            keyboard: (boolean|undefined),
 *            mouseWheelZoom: (boolean|undefined),
 *            shiftDragZoom: (boolean|undefined),
 *            touchPan: (boolean|undefined),
 *            touchRotate: (boolean|undefined),
 *            touchZoom: (boolean|undefined),
 *            zoomDelta: (number|undefined),
 *            zoomDuration: (number|undefined)}}
 */
olx.interaction.DefaultsOptions;



/**
 * @interface
 */
olx.interaction.DefaultsOptionsExtern = function() {};


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.altShiftDragRotate;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.doubleClickZoom;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.dragPan;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.keyboard;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.mouseWheelZoom;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.shiftDragZoom;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.touchPan;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.touchRotate;


/**
 * @type {boolean|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.touchZoom;


/**
 * @type {number|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.zoomDelta;


/**
 * @type {number|undefined}
 */
olx.interaction.DefaultsOptionsExtern.prototype.zoomDuration;


/**
 * @typedef {{delta: (number|undefined),
 *            duration: (number|undefined)}}
 */
olx.interaction.DoubleClickZoomOptions;



/**
 * @interface
 */
olx.interaction.DoubleClickZoomOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.interaction.DoubleClickZoomOptionsExtern.prototype.delta;


/**
 * @type {number|undefined}
 */
olx.interaction.DoubleClickZoomOptionsExtern.prototype.duration;


/**
 * @typedef {{condition: (ol.events.ConditionType|undefined),
 *            kinetic: (ol.Kinetic|undefined)}}
 */
olx.interaction.DragPanOptions;



/**
 * @interface
 */
olx.interaction.DragPanOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.DragPanOptionsExtern.prototype.condition;


/**
 * @type {ol.Kinetic|undefined}
 */
olx.interaction.DragPanOptionsExtern.prototype.kinetic;


/**
 * @typedef {{condition: (ol.events.ConditionType|undefined)}}
 */
olx.interaction.DragRotateAndZoomOptions;



/**
 * @interface
 */
olx.interaction.DragRotateAndZoomOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.DragRotateAndZoomOptionsExtern.prototype.condition;


/**
 * @typedef {{condition: (ol.events.ConditionType|undefined)}}
 */
olx.interaction.DragRotateOptions;



/**
 * @interface
 */
olx.interaction.DragRotateOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.DragRotateOptionsExtern.prototype.condition;


/**
 * @typedef {{condition: (ol.events.ConditionType|undefined)}}
 */
olx.interaction.DragZoomOptions;



/**
 * @interface
 */
olx.interaction.DragZoomOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.DragZoomOptionsExtern.prototype.condition;


/**
 * @typedef {{layer: ol.layer.Vector,
 *            snapTolerance: (number|undefined),
 *            type: ol.geom.GeometryType}}
 */
olx.interaction.DrawOptions;



/**
 * @interface
 */
olx.interaction.DrawOptionsExtern = function() {};


/**
 * @type {ol.layer.Vector}
 */
olx.interaction.DrawOptionsExtern.prototype.layer;


/**
 * @type {number|undefined}
 */
olx.interaction.DrawOptionsExtern.prototype.snapTolerance;


/**
 * @type {ol.geom.GeometryType}
 */
olx.interaction.DrawOptionsExtern.prototype.type;


/**
 * @typedef {{condition: (ol.events.ConditionType|undefined),
 *            pixelDelta: (number|undefined)}}
 */
olx.interaction.KeyboardPanOptions;



/**
 * @interface
 */
olx.interaction.KeyboardPanOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.KeyboardPanOptionsExtern.prototype.condition;


/**
 * @type {number|undefined}
 */
olx.interaction.KeyboardPanOptionsExtern.prototype.pixelDelta;


/**
 * @typedef {{condition: (ol.events.ConditionType|undefined),
 *            delta: (number|undefined),
 *            duration: (number|undefined)}}
 */
olx.interaction.KeyboardZoomOptions;



/**
 * @interface
 */
olx.interaction.KeyboardZoomOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.KeyboardZoomOptionsExtern.prototype.condition;


/**
 * @type {number|undefined}
 */
olx.interaction.KeyboardZoomOptionsExtern.prototype.delta;


/**
 * @type {number|undefined}
 */
olx.interaction.KeyboardZoomOptionsExtern.prototype.duration;


/**
 * @typedef {{layers: (undefined|Array.<ol.layer.Layer>|function(ol.layer.Layer):boolean),
 *            pixelTolerance: (number|undefined)}}
 */
olx.interaction.ModifyOptions;



/**
 * @interface
 */
olx.interaction.ModifyOptionsExtern = function() {};


/**
 * @type {undefined|Array.<ol.layer.Layer>|function(ol.layer.Layer):boolean}
 */
olx.interaction.ModifyOptionsExtern.prototype.layers;


/**
 * @type {number|undefined}
 */
olx.interaction.ModifyOptionsExtern.prototype.pixelTolerance;


/**
 * @typedef {{duration: (number|undefined)}}
 */
olx.interaction.MouseWheelZoomOptions;



/**
 * @interface
 */
olx.interaction.MouseWheelZoomOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.interaction.MouseWheelZoomOptionsExtern.prototype.duration;


/**
 * @typedef {{addCondition: (ol.events.ConditionType|undefined),
 *            condition: (ol.events.ConditionType|undefined),
 *            layers: (undefined|Array.<ol.layer.Layer>|function(ol.layer.Layer):boolean)}}
 */
olx.interaction.SelectOptions;



/**
 * @interface
 */
olx.interaction.SelectOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.SelectOptionsExtern.prototype.addCondition;


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.SelectOptionsExtern.prototype.condition;


/**
 * @type {undefined|Array.<ol.layer.Layer>|function(ol.layer.Layer):boolean}
 */
olx.interaction.SelectOptionsExtern.prototype.layers;


/**
 * @typedef {{kinetic: (ol.Kinetic|undefined)}}
 */
olx.interaction.TouchPanOptions;



/**
 * @interface
 */
olx.interaction.TouchPanOptionsExtern = function() {};


/**
 * @type {ol.Kinetic|undefined}
 */
olx.interaction.TouchPanOptionsExtern.prototype.kinetic;


/**
 * @typedef {{threshold: (number|undefined)}}
 */
olx.interaction.TouchRotateOptions;



/**
 * @interface
 */
olx.interaction.TouchRotateOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.interaction.TouchRotateOptionsExtern.prototype.threshold;


/**
 * @typedef {{duration: (number|undefined)}}
 */
olx.interaction.TouchZoomOptions;



/**
 * @interface
 */
olx.interaction.TouchZoomOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.interaction.TouchZoomOptionsExtern.prototype.duration;


/**
 * @typedef {{brightness: (number|undefined),
 *            contrast: (number|undefined),
 *            hue: (number|undefined),
 *            maxResolution: (number|undefined),
 *            minResolution: (number|undefined),
 *            opacity: (number|undefined),
 *            saturation: (number|undefined),
 *            visible: (boolean|undefined)}}
 */
olx.layer.BaseOptions;



/**
 * @interface
 */
olx.layer.BaseOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.brightness;


/**
 * @type {number|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.contrast;


/**
 * @type {number|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.hue;


/**
 * @type {number|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.minResolution;


/**
 * @type {number|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.opacity;


/**
 * @type {number|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.saturation;


/**
 * @type {boolean|undefined}
 */
olx.layer.BaseOptionsExtern.prototype.visible;


/**
 * @typedef {{brightness: (number|undefined),
 *            contrast: (number|undefined),
 *            hue: (number|undefined),
 *            layers: (Array.<ol.layer.Base>|ol.Collection|undefined),
 *            maxResolution: (number|undefined),
 *            minResolution: (number|undefined),
 *            opacity: (number|undefined),
 *            saturation: (number|undefined),
 *            visible: (boolean|undefined)}}
 */
olx.layer.GroupOptions;



/**
 * @interface
 */
olx.layer.GroupOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.brightness;


/**
 * @type {number|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.contrast;


/**
 * @type {number|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.hue;


/**
 * @type {Array.<ol.layer.Base>|ol.Collection|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.layers;


/**
 * @type {number|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.minResolution;


/**
 * @type {number|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.opacity;


/**
 * @type {number|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.saturation;


/**
 * @type {boolean|undefined}
 */
olx.layer.GroupOptionsExtern.prototype.visible;


/**
 * @typedef {{brightness: (number|undefined),
 *            contrast: (number|undefined),
 *            hue: (number|undefined),
 *            maxResolution: (number|undefined),
 *            minResolution: (number|undefined),
 *            opacity: (number|undefined),
 *            saturation: (number|undefined),
 *            source: ol.source.Source,
 *            visible: (boolean|undefined)}}
 */
olx.layer.LayerOptions;



/**
 * @interface
 */
olx.layer.LayerOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.minResolution;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.opacity;


/**
 * @type {ol.source.Source}
 */
olx.layer.LayerOptionsExtern.prototype.source;


/**
 * @type {boolean|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.visible;


/**
 * @typedef {{brightness: (number|undefined),
 *            contrast: (number|undefined),
 *            hue: (number|undefined),
 *            maxResolution: (number|undefined),
 *            minResolution: (number|undefined),
 *            opacity: (number|undefined),
 *            preload: (number|undefined),
 *            saturation: (number|undefined),
 *            source: ol.source.Source,
 *            visible: (boolean|undefined)}}
 */
olx.layer.TileOptions;



/**
 * @interface
 */
olx.layer.TileOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.layer.TileOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.layer.TileOptionsExtern.prototype.minResolution;


/**
 * @type {number|undefined}
 */
olx.layer.TileOptionsExtern.prototype.opacity;


/**
 * @type {number|undefined}
 */
olx.layer.TileOptionsExtern.prototype.preload;


/**
 * @type {ol.source.Source}
 */
olx.layer.TileOptionsExtern.prototype.source;


/**
 * @type {boolean|undefined}
 */
olx.layer.TileOptionsExtern.prototype.visible;


/**
 * @typedef {{maxResolution: (number|undefined),
 *            minResolution: (number|undefined),
 *            opacity: (number|undefined),
 *            source: ol.source.Source,
 *            style: (ol.style.Style|undefined),
 *            transformFeatureInfo: (function(Array.<ol.Feature>):string|undefined),
 *            visible: (boolean|undefined)}}
 */
olx.layer.VectorLayerOptions;



/**
 * @interface
 */
olx.layer.VectorLayerOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.layer.VectorLayerOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.layer.VectorLayerOptionsExtern.prototype.minResolution;


/**
 * @type {number|undefined}
 */
olx.layer.VectorLayerOptionsExtern.prototype.opacity;


/**
 * @type {ol.source.Source}
 */
olx.layer.VectorLayerOptionsExtern.prototype.source;


/**
 * @type {ol.style.Style|undefined}
 */
olx.layer.VectorLayerOptionsExtern.prototype.style;


/**
 * @type {function(Array.<ol.Feature>):string|undefined}
 */
olx.layer.VectorLayerOptionsExtern.prototype.transformFeatureInfo;


/**
 * @type {boolean|undefined}
 */
olx.layer.VectorLayerOptionsExtern.prototype.visible;


/**
 * @typedef {{creator: (string|undefined),
 *            defaultDesc: (string|undefined),
 *            extractAttributes: (boolean|undefined),
 *            extractRoutes: (boolean|undefined),
 *            extractTracks: (boolean|undefined),
 *            extractWaypoints: (boolean|undefined)}}
 */
olx.parser.GPXOptions;



/**
 * @interface
 */
olx.parser.GPXOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.parser.GPXOptionsExtern.prototype.creator;


/**
 * @type {string|undefined}
 */
olx.parser.GPXOptionsExtern.prototype.defaultDesc;


/**
 * @type {boolean|undefined}
 */
olx.parser.GPXOptionsExtern.prototype.extractAttributes;


/**
 * @type {boolean|undefined}
 */
olx.parser.GPXOptionsExtern.prototype.extractRoutes;


/**
 * @type {boolean|undefined}
 */
olx.parser.GPXOptionsExtern.prototype.extractTracks;


/**
 * @type {boolean|undefined}
 */
olx.parser.GPXOptionsExtern.prototype.extractWaypoints;


/**
 * @typedef {{features: (Array.<ol.Feature>|ol.Feature),
 *            metadata: (Object|undefined)}}
 */
olx.parser.GPXWriteOptions;



/**
 * @interface
 */
olx.parser.GPXWriteOptionsExtern = function() {};


/**
 * @type {Array.<ol.Feature>|ol.Feature}
 */
olx.parser.GPXWriteOptionsExtern.prototype.features;


/**
 * @type {Object|undefined}
 */
olx.parser.GPXWriteOptionsExtern.prototype.metadata;


/**
 * @typedef {{extractAttributes: (boolean|undefined),
 *            extractStyles: (boolean|undefined),
 *            maxDepth: (number|undefined),
 *            trackAttributes: (Array.<string>|undefined)}}
 */
olx.parser.KMLOptions;



/**
 * @interface
 */
olx.parser.KMLOptionsExtern = function() {};


/**
 * @type {boolean|undefined}
 */
olx.parser.KMLOptionsExtern.prototype.extractAttributes;


/**
 * @type {boolean|undefined}
 */
olx.parser.KMLOptionsExtern.prototype.extractStyles;


/**
 * @type {number|undefined}
 */
olx.parser.KMLOptionsExtern.prototype.maxDepth;


/**
 * @type {Array.<string>|undefined}
 */
olx.parser.KMLOptionsExtern.prototype.trackAttributes;


/**
 * @typedef {{culture: (string|undefined),
 *            imagerySet: string,
 *            key: string,
 *            tileLoadFunction: (ol.TileLoadFunctionType|undefined)}}
 */
olx.source.BingMapsOptions;



/**
 * @interface
 */
olx.source.BingMapsOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.source.BingMapsOptionsExtern.prototype.culture;


/**
 * @type {string}
 */
olx.source.BingMapsOptionsExtern.prototype.imagerySet;


/**
 * @type {string}
 */
olx.source.BingMapsOptionsExtern.prototype.key;


/**
 * @type {ol.TileLoadFunctionType|undefined}
 */
olx.source.BingMapsOptionsExtern.prototype.tileLoadFunction;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            crossOrigin: (null|string|undefined),
 *            maxZoom: (number|undefined),
 *            tileLoadFunction: (ol.TileLoadFunctionType|undefined),
 *            url: (string|undefined)}}
 */
olx.source.OSMOptions;



/**
 * @interface
 */
olx.source.OSMOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.OSMOptionsExtern.prototype.attributions;


/**
 * @type {null|string|undefined}
 */
olx.source.OSMOptionsExtern.prototype.crossOrigin;


/**
 * @type {number|undefined}
 */
olx.source.OSMOptionsExtern.prototype.maxZoom;


/**
 * @type {ol.TileLoadFunctionType|undefined}
 */
olx.source.OSMOptionsExtern.prototype.tileLoadFunction;


/**
 * @type {string|undefined}
 */
olx.source.OSMOptionsExtern.prototype.url;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            crossOrigin: (null|string|undefined),
 *            extent: (ol.Extent|undefined),
 *            getFeatureInfoOptions: (olx.source.WMSGetFeatureInfoOptions|undefined),
 *            gutter: (number|undefined),
 *            logo: (string|undefined),
 *            maxZoom: (number|undefined),
 *            params: Object.<string,*>,
 *            projection: ol.proj.ProjectionLike,
 *            tileGrid: (ol.tilegrid.TileGrid|undefined),
 *            tileLoadFunction: (ol.TileLoadFunctionType|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined)}}
 */
olx.source.TileWMSOptions;



/**
 * @interface
 */
olx.source.TileWMSOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.attributions;


/**
 * @type {null|string|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.crossOrigin;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.extent;


/**
 * @type {number|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.gutter;


/**
 * @type {string|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.logo;


/**
 * @type {number|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.maxZoom;


/**
 * @type {Object.<string,*>}
 */
olx.source.TileWMSOptionsExtern.prototype.params;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.TileWMSOptionsExtern.prototype.projection;


/**
 * @type {ol.tilegrid.TileGrid|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.tileGrid;


/**
 * @type {ol.TileLoadFunctionType|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.tileLoadFunction;


/**
 * @type {string|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.urls;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            extent: (ol.Extent|undefined),
 *            features: (Array.<ol.Feature>|undefined),
 *            logo: (string|undefined),
 *            parser: (ol.parser.Parser|undefined),
 *            projection: (ol.proj.ProjectionLike|undefined),
 *            url: (string|undefined)}}
 */
olx.source.VectorOptions;



/**
 * @interface
 */
olx.source.VectorOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.VectorOptionsExtern.prototype.attributions;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.VectorOptionsExtern.prototype.extent;


/**
 * @type {Array.<ol.Feature>|undefined}
 */
olx.source.VectorOptionsExtern.prototype.features;


/**
 * @type {string|undefined}
 */
olx.source.VectorOptionsExtern.prototype.logo;


/**
 * @type {ol.parser.Parser|undefined}
 */
olx.source.VectorOptionsExtern.prototype.parser;


/**
 * @type {ol.proj.ProjectionLike|undefined}
 */
olx.source.VectorOptionsExtern.prototype.projection;


/**
 * @type {string|undefined}
 */
olx.source.VectorOptionsExtern.prototype.url;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            crossOrigin: (string|null|undefined),
 *            dimensions: (Object|undefined),
 *            extent: (ol.Extent|undefined),
 *            format: (string|undefined),
 *            layer: string,
 *            logo: (string|undefined),
 *            matrixSet: string,
 *            maxZoom: (number|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            requestEncoding: (ol.source.WMTSRequestEncoding|undefined),
 *            style: string,
 *            tileGrid: ol.tilegrid.WMTS,
 *            tileLoadFunction: (ol.TileLoadFunctionType|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined),
 *            version: (string|undefined)}}
 */
olx.source.WMTSOptions;



/**
 * @interface
 */
olx.source.WMTSOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.attributions;


/**
 * @type {string|null|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.crossOrigin;


/**
 * @type {Object|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.dimensions;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.extent;


/**
 * @type {string|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.format;


/**
 * @type {string}
 */
olx.source.WMTSOptionsExtern.prototype.layer;


/**
 * @type {string|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.logo;


/**
 * @type {string}
 */
olx.source.WMTSOptionsExtern.prototype.matrixSet;


/**
 * @type {number|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.maxZoom;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.WMTSOptionsExtern.prototype.projection;


/**
 * @type {ol.source.WMTSRequestEncoding|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.requestEncoding;


/**
 * @type {string}
 */
olx.source.WMTSOptionsExtern.prototype.style;


/**
 * @type {ol.tilegrid.WMTS}
 */
olx.source.WMTSOptionsExtern.prototype.tileGrid;


/**
 * @type {ol.TileLoadFunctionType|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.tileLoadFunction;


/**
 * @type {string|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.urls;


/**
 * @type {string|undefined}
 */
olx.source.WMTSOptionsExtern.prototype.version;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            crossOrigin: (null|string|undefined),
 *            extent: (ol.Extent|undefined),
 *            logo: (string|undefined),
 *            maxZoom: (number|undefined),
 *            minZoom: (number|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            tileLoadFunction: (ol.TileLoadFunctionType|undefined),
 *            tileUrlFunction: (ol.TileUrlFunctionType|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined)}}
 */
olx.source.XYZOptions;



/**
 * @interface
 */
olx.source.XYZOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.XYZOptionsExtern.prototype.attributions;


/**
 * @type {null|string|undefined}
 */
olx.source.XYZOptionsExtern.prototype.crossOrigin;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.XYZOptionsExtern.prototype.extent;


/**
 * @type {string|undefined}
 */
olx.source.XYZOptionsExtern.prototype.logo;


/**
 * @type {number|undefined}
 */
olx.source.XYZOptionsExtern.prototype.maxZoom;


/**
 * @type {number|undefined}
 */
olx.source.XYZOptionsExtern.prototype.minZoom;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.XYZOptionsExtern.prototype.projection;


/**
 * @type {ol.TileLoadFunctionType|undefined}
 */
olx.source.XYZOptionsExtern.prototype.tileLoadFunction;


/**
 * @type {ol.TileUrlFunctionType|undefined}
 */
olx.source.XYZOptionsExtern.prototype.tileUrlFunction;


/**
 * @type {string|undefined}
 */
olx.source.XYZOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.XYZOptionsExtern.prototype.urls;


/**
 * @typedef {{color: (string|ol.expr.Expression|undefined),
 *            opacity: (number|ol.expr.Expression|undefined),
 *            zIndex: (number|ol.expr.Expression|undefined)}}
 */
olx.style.FillOptions;



/**
 * @interface
 */
olx.style.FillOptionsExtern = function() {};


/**
 * @type {string|ol.expr.Expression|undefined}
 */
olx.style.FillOptionsExtern.prototype.color;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.FillOptionsExtern.prototype.opacity;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.FillOptionsExtern.prototype.zIndex;


/**
 * @typedef {{height: (number|ol.expr.Expression|undefined),
 *            opacity: (number|ol.expr.Expression|undefined),
 *            rotation: (number|ol.expr.Expression|undefined),
 *            url: (string|ol.expr.Expression),
 *            width: (number|ol.expr.Expression|undefined),
 *            xOffset: (number|ol.expr.Expression|undefined),
 *            yOffset: (number|ol.expr.Expression|undefined),
 *            zIndex: (number|ol.expr.Expression|undefined)}}
 */
olx.style.IconOptions;



/**
 * @interface
 */
olx.style.IconOptionsExtern = function() {};


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.IconOptionsExtern.prototype.height;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.IconOptionsExtern.prototype.opacity;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.IconOptionsExtern.prototype.rotation;


/**
 * @type {string|ol.expr.Expression}
 */
olx.style.IconOptionsExtern.prototype.url;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.IconOptionsExtern.prototype.width;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.IconOptionsExtern.prototype.xOffset;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.IconOptionsExtern.prototype.yOffset;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.IconOptionsExtern.prototype.zIndex;


/**
 * @typedef {{filter: (ol.expr.Expression|string|undefined),
 *            maxResolution: (number|undefined),
 *            minResolution: (number|undefined),
 *            name: (string|undefined),
 *            symbolizers: (Array.<ol.style.Symbolizer>|undefined),
 *            title: (string|undefined)}}
 */
olx.style.RuleOptions;



/**
 * @interface
 */
olx.style.RuleOptionsExtern = function() {};


/**
 * @type {ol.expr.Expression|string|undefined}
 */
olx.style.RuleOptionsExtern.prototype.filter;


/**
 * @type {number|undefined}
 */
olx.style.RuleOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.style.RuleOptionsExtern.prototype.minResolution;


/**
 * @type {string|undefined}
 */
olx.style.RuleOptionsExtern.prototype.name;


/**
 * @type {Array.<ol.style.Symbolizer>|undefined}
 */
olx.style.RuleOptionsExtern.prototype.symbolizers;


/**
 * @type {string|undefined}
 */
olx.style.RuleOptionsExtern.prototype.title;


/**
 * @typedef {{fill: (ol.style.Fill|undefined),
 *            size: (number|ol.expr.Expression|undefined),
 *            stroke: (ol.style.Stroke|undefined),
 *            type: (ol.style.ShapeType|undefined),
 *            zIndex: (number|ol.expr.Expression|undefined)}}
 */
olx.style.ShapeOptions;



/**
 * @interface
 */
olx.style.ShapeOptionsExtern = function() {};


/**
 * @type {ol.style.Fill|undefined}
 */
olx.style.ShapeOptionsExtern.prototype.fill;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.ShapeOptionsExtern.prototype.size;


/**
 * @type {ol.style.Stroke|undefined}
 */
olx.style.ShapeOptionsExtern.prototype.stroke;


/**
 * @type {ol.style.ShapeType|undefined}
 */
olx.style.ShapeOptionsExtern.prototype.type;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.ShapeOptionsExtern.prototype.zIndex;


/**
 * @typedef {{color: (string|ol.expr.Expression|undefined),
 *            opacity: (number|ol.expr.Expression|undefined),
 *            width: (number|ol.expr.Expression|undefined),
 *            zIndex: (number|ol.expr.Expression|undefined)}}
 */
olx.style.StrokeOptions;



/**
 * @interface
 */
olx.style.StrokeOptionsExtern = function() {};


/**
 * @type {string|ol.expr.Expression|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.color;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.opacity;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.width;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.zIndex;


/**
 * @typedef {{name: (string|undefined),
 *            rules: (Array.<ol.style.Rule>|undefined),
 *            symbolizers: (Array.<ol.style.Symbolizer>|undefined),
 *            title: (string|undefined)}}
 */
olx.style.StyleOptions;



/**
 * @interface
 */
olx.style.StyleOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.style.StyleOptionsExtern.prototype.name;


/**
 * @type {Array.<ol.style.Rule>|undefined}
 */
olx.style.StyleOptionsExtern.prototype.rules;


/**
 * @type {Array.<ol.style.Symbolizer>|undefined}
 */
olx.style.StyleOptionsExtern.prototype.symbolizers;


/**
 * @type {string|undefined}
 */
olx.style.StyleOptionsExtern.prototype.title;


/**
 * @typedef {{color: (string|ol.expr.Expression|undefined),
 *            fontFamily: (string|ol.expr.Expression|undefined),
 *            fontSize: (number|ol.expr.Expression|undefined),
 *            fontWeight: (string|ol.expr.Expression|undefined),
 *            opacity: (number|ol.expr.Expression|undefined),
 *            stroke: (ol.style.Stroke|undefined),
 *            text: (string|ol.expr.Expression),
 *            zIndex: (number|ol.expr.Expression|undefined)}}
 */
olx.style.TextOptions;



/**
 * @interface
 */
olx.style.TextOptionsExtern = function() {};


/**
 * @type {string|ol.expr.Expression|undefined}
 */
olx.style.TextOptionsExtern.prototype.color;


/**
 * @type {string|ol.expr.Expression|undefined}
 */
olx.style.TextOptionsExtern.prototype.fontFamily;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.TextOptionsExtern.prototype.fontSize;


/**
 * @type {string|ol.expr.Expression|undefined}
 */
olx.style.TextOptionsExtern.prototype.fontWeight;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.TextOptionsExtern.prototype.opacity;


/**
 * @type {ol.style.Stroke|undefined}
 */
olx.style.TextOptionsExtern.prototype.stroke;


/**
 * @type {string|ol.expr.Expression}
 */
olx.style.TextOptionsExtern.prototype.text;


/**
 * @type {number|ol.expr.Expression|undefined}
 */
olx.style.TextOptionsExtern.prototype.zIndex;


/**
 * @typedef {{minZoom: (number|undefined),
 *            origin: (ol.Coordinate|undefined),
 *            origins: (Array.<ol.Coordinate>|undefined),
 *            resolutions: !Array.<number>,
 *            tileSize: (ol.Size|undefined),
 *            tileSizes: (Array.<ol.Size>|undefined)}}
 */
olx.tilegrid.TileGridOptions;



/**
 * @interface
 */
olx.tilegrid.TileGridOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.minZoom;


/**
 * @type {ol.Coordinate|undefined}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.origin;


/**
 * @type {Array.<ol.Coordinate>|undefined}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.origins;


/**
 * @type {!Array.<number>}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.resolutions;


/**
 * @type {ol.Size|undefined}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.tileSize;


/**
 * @type {Array.<ol.Size>|undefined}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.tileSizes;


/**
 * @typedef {{matrixIds: !Array.<string>,
 *            origin: (ol.Coordinate|undefined),
 *            origins: (Array.<ol.Coordinate>|undefined),
 *            resolutions: !Array.<number>,
 *            tileSize: (ol.Size|undefined),
 *            tileSizes: (Array.<ol.Size>|undefined)}}
 */
olx.tilegrid.WMTSOptions;



/**
 * @interface
 */
olx.tilegrid.WMTSOptionsExtern = function() {};


/**
 * @type {!Array.<string>}
 */
olx.tilegrid.WMTSOptionsExtern.prototype.matrixIds;


/**
 * @type {ol.Coordinate|undefined}
 */
olx.tilegrid.WMTSOptionsExtern.prototype.origin;


/**
 * @type {Array.<ol.Coordinate>|undefined}
 */
olx.tilegrid.WMTSOptionsExtern.prototype.origins;


/**
 * @type {!Array.<number>}
 */
olx.tilegrid.WMTSOptionsExtern.prototype.resolutions;


/**
 * @type {ol.Size|undefined}
 */
olx.tilegrid.WMTSOptionsExtern.prototype.tileSize;


/**
 * @type {Array.<ol.Size>|undefined}
 */
olx.tilegrid.WMTSOptionsExtern.prototype.tileSizes;


/**
 * @typedef {{maxZoom: number}}
 */
olx.tilegrid.XYZOptions;



/**
 * @interface
 */
olx.tilegrid.XYZOptionsExtern = function() {};


/**
 * @type {number}
 */
olx.tilegrid.XYZOptionsExtern.prototype.maxZoom;
