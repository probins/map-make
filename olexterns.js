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
olx.animation = {};


/**
 * @type {Object}
 */
olx.control = {};


/**
 * @type {Object}
 */
olx.format = {};


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
olx.render = {};


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
 * @typedef {{controls: (ol.Collection|Array.<ol.control.Control>|undefined),
 *            interactions: (ol.Collection|Array.<ol.interaction.Interaction>|undefined),
 *            layers: (Array.<ol.layer.Base>|ol.Collection|undefined),
 *            ol3Logo: (boolean|undefined),
 *            overlays: (ol.Collection|Array.<ol.Overlay>|undefined),
 *            pixelRatio: (number|undefined),
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
 * @type {boolean|undefined}
 */
olx.MapOptionsExtern.prototype.ol3Logo;


/**
 * @type {ol.Collection|Array.<ol.Overlay>|undefined}
 */
olx.MapOptionsExtern.prototype.overlays;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.pixelRatio;


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
 * @type {boolean|undefined}
 */
olx.OverlayOptionsExtern.prototype.insertFirst;


/**
 * @type {ol.Coordinate|undefined}
 */
olx.OverlayOptionsExtern.prototype.position;


/**
 * @type {ol.OverlayPositioning|undefined}
 */
olx.OverlayOptionsExtern.prototype.positioning;


/**
 * @type {boolean|undefined}
 */
olx.OverlayOptionsExtern.prototype.stopEvent;


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
 *            constrainRotation: (boolean|number|undefined),
 *            enableRotation: (boolean|undefined),
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
 * @type {boolean|number|undefined}
 */
olx.View2DOptionsExtern.prototype.constrainRotation;


/**
 * @type {boolean|undefined}
 */
olx.View2DOptionsExtern.prototype.enableRotation;


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
 * @type {number|undefined}
 */
olx.View2DOptionsExtern.prototype.zoomFactor;


/**
 * @typedef {{duration: (number|undefined),
 *            easing: (function(number):number|undefined),
 *            resolution: number,
 *            start: (number|undefined)}}
 */
olx.animation.BounceOptions;



/**
 * @interface
 */
olx.animation.BounceOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.animation.BounceOptionsExtern.prototype.duration;


/**
 * @type {function(number):number|undefined}
 */
olx.animation.BounceOptionsExtern.prototype.easing;


/**
 * @type {number}
 */
olx.animation.BounceOptionsExtern.prototype.resolution;


/**
 * @type {number|undefined}
 */
olx.animation.BounceOptionsExtern.prototype.start;


/**
 * @typedef {{duration: (number|undefined),
 *            easing: (function(number):number|undefined),
 *            source: ol.Coordinate,
 *            start: (number|undefined)}}
 */
olx.animation.PanOptions;



/**
 * @interface
 */
olx.animation.PanOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.animation.PanOptionsExtern.prototype.duration;


/**
 * @type {function(number):number|undefined}
 */
olx.animation.PanOptionsExtern.prototype.easing;


/**
 * @type {ol.Coordinate}
 */
olx.animation.PanOptionsExtern.prototype.source;


/**
 * @type {number|undefined}
 */
olx.animation.PanOptionsExtern.prototype.start;


/**
 * @typedef {{duration: (number|undefined),
 *            easing: (function(number):number|undefined),
 *            rotation: number,
 *            start: (number|undefined)}}
 */
olx.animation.RotateOptions;



/**
 * @interface
 */
olx.animation.RotateOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.animation.RotateOptionsExtern.prototype.duration;


/**
 * @type {function(number):number|undefined}
 */
olx.animation.RotateOptionsExtern.prototype.easing;


/**
 * @type {number}
 */
olx.animation.RotateOptionsExtern.prototype.rotation;


/**
 * @type {number|undefined}
 */
olx.animation.RotateOptionsExtern.prototype.start;


/**
 * @typedef {{duration: (number|undefined),
 *            easing: (function(number):number|undefined),
 *            resolution: number,
 *            start: (number|undefined)}}
 */
olx.animation.ZoomOptions;



/**
 * @interface
 */
olx.animation.ZoomOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.animation.ZoomOptionsExtern.prototype.duration;


/**
 * @type {function(number):number|undefined}
 */
olx.animation.ZoomOptionsExtern.prototype.easing;


/**
 * @type {number}
 */
olx.animation.ZoomOptionsExtern.prototype.resolution;


/**
 * @type {number|undefined}
 */
olx.animation.ZoomOptionsExtern.prototype.start;


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
 *            target: (Element|string|undefined)}}
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
 * @type {Element|string|undefined}
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
 * @type {string|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.undefinedHTML;


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
 * @typedef {{className: (string|undefined),
 *            maxResolution: (number|undefined),
 *            minResolution: (number|undefined)}}
 */
olx.control.ZoomSliderOptions;



/**
 * @interface
 */
olx.control.ZoomSliderOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.control.ZoomSliderOptionsExtern.prototype.className;


/**
 * @type {number|undefined}
 */
olx.control.ZoomSliderOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.control.ZoomSliderOptionsExtern.prototype.minResolution;


/**
 * @typedef {{defaultProjection: ol.proj.ProjectionLike}}
 */
olx.format.GeoJSONOptions;



/**
 * @interface
 */
olx.format.GeoJSONOptionsExtern = function() {};


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.format.GeoJSONOptionsExtern.prototype.defaultProjection;


/**
 * @typedef {{defaultStyle: (Array.<ol.style.Style>|undefined)}}
 */
olx.format.KMLOptions;



/**
 * @interface
 */
olx.format.KMLOptionsExtern = function() {};


/**
 * @type {Array.<ol.style.Style>|undefined}
 */
olx.format.KMLOptionsExtern.prototype.defaultStyle;


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
 * @typedef {{formatConstructors: (Array.<function(new: ol.format.Format)>|undefined),
 *            reprojectTo: ol.proj.ProjectionLike}}
 */
olx.interaction.DragAndDropOptions;



/**
 * @interface
 */
olx.interaction.DragAndDropOptionsExtern = function() {};


/**
 * @type {Array.<function(new: ol.format.Format)>|undefined}
 */
olx.interaction.DragAndDropOptionsExtern.prototype.formatConstructors;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.interaction.DragAndDropOptionsExtern.prototype.reprojectTo;


/**
 * @typedef {{condition: (ol.events.ConditionType|undefined),
 *            style: ol.style.Style}}
 */
olx.interaction.DragBoxOptions;



/**
 * @interface
 */
olx.interaction.DragBoxOptionsExtern = function() {};


/**
 * @type {ol.events.ConditionType|undefined}
 */
olx.interaction.DragBoxOptionsExtern.prototype.condition;


/**
 * @type {ol.style.Style}
 */
olx.interaction.DragBoxOptionsExtern.prototype.style;


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
 * @typedef {{condition: (ol.events.ConditionType|undefined),
 *            style: ol.style.Style}}
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
 * @type {ol.style.Style}
 */
olx.interaction.DragZoomOptionsExtern.prototype.style;


/**
 * @typedef {{snapTolerance: (number|undefined),
 *            source: (ol.source.Vector|undefined),
 *            styleFunction: (ol.feature.StyleFunction|undefined),
 *            type: ol.geom.GeometryType}}
 */
olx.interaction.DrawOptions;



/**
 * @interface
 */
olx.interaction.DrawOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.interaction.DrawOptionsExtern.prototype.snapTolerance;


/**
 * @type {ol.source.Vector|undefined}
 */
olx.interaction.DrawOptionsExtern.prototype.source;


/**
 * @type {ol.feature.StyleFunction|undefined}
 */
olx.interaction.DrawOptionsExtern.prototype.styleFunction;


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
olx.layer.LayerOptionsExtern.prototype.brightness;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.contrast;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.hue;


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
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.saturation;


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
olx.layer.TileOptionsExtern.prototype.brightness;


/**
 * @type {number|undefined}
 */
olx.layer.TileOptionsExtern.prototype.contrast;


/**
 * @type {number|undefined}
 */
olx.layer.TileOptionsExtern.prototype.hue;


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
 * @type {number|undefined}
 */
olx.layer.TileOptionsExtern.prototype.saturation;


/**
 * @type {ol.source.Source}
 */
olx.layer.TileOptionsExtern.prototype.source;


/**
 * @type {boolean|undefined}
 */
olx.layer.TileOptionsExtern.prototype.visible;


/**
 * @typedef {{brightness: (number|undefined),
 *            contrast: (number|undefined),
 *            hue: (number|undefined),
 *            maxResolution: (number|undefined),
 *            minResolution: (number|undefined),
 *            opacity: (number|undefined),
 *            saturation: (number|undefined),
 *            source: ol.source.Vector,
 *            styleFunction: (ol.feature.StyleFunction|undefined),
 *            visible: (boolean|undefined)}}
 */
olx.layer.VectorOptions;



/**
 * @interface
 */
olx.layer.VectorOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.brightness;


/**
 * @type {number|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.contrast;


/**
 * @type {number|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.hue;


/**
 * @type {number|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.maxResolution;


/**
 * @type {number|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.minResolution;


/**
 * @type {number|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.opacity;


/**
 * @type {number|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.saturation;


/**
 * @type {ol.source.Vector}
 */
olx.layer.VectorOptionsExtern.prototype.source;


/**
 * @type {ol.feature.StyleFunction|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.styleFunction;


/**
 * @type {boolean|undefined}
 */
olx.layer.VectorOptionsExtern.prototype.visible;


/**
 * @typedef {{features: (Array.<ol.Feature>|ol.Collection|undefined),
 *            map: (ol.Map|undefined),
 *            styleFunction: (ol.feature.StyleFunction|undefined)}}
 */
olx.render.FeaturesOverlayOptions;



/**
 * @interface
 */
olx.render.FeaturesOverlayOptionsExtern = function() {};


/**
 * @type {Array.<ol.Feature>|ol.Collection|undefined}
 */
olx.render.FeaturesOverlayOptionsExtern.prototype.features;


/**
 * @type {ol.Map|undefined}
 */
olx.render.FeaturesOverlayOptionsExtern.prototype.map;


/**
 * @type {ol.feature.StyleFunction|undefined}
 */
olx.render.FeaturesOverlayOptionsExtern.prototype.styleFunction;


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
 *            doc: (Document|undefined),
 *            extent: (ol.Extent|undefined),
 *            logo: (string|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            reprojectTo: ol.proj.ProjectionLike,
 *            text: (string|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined)}}
 */
olx.source.GPXOptions;



/**
 * @interface
 */
olx.source.GPXOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.GPXOptionsExtern.prototype.attributions;


/**
 * @type {Document|undefined}
 */
olx.source.GPXOptionsExtern.prototype.doc;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.GPXOptionsExtern.prototype.extent;


/**
 * @type {string|undefined}
 */
olx.source.GPXOptionsExtern.prototype.logo;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.GPXOptionsExtern.prototype.projection;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.GPXOptionsExtern.prototype.reprojectTo;


/**
 * @type {string|undefined}
 */
olx.source.GPXOptionsExtern.prototype.text;


/**
 * @type {string|undefined}
 */
olx.source.GPXOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.GPXOptionsExtern.prototype.urls;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            defaultProjection: ol.proj.ProjectionLike,
 *            extent: (ol.Extent|undefined),
 *            logo: (string|undefined),
 *            object: (GeoJSONObject|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            reprojectTo: ol.proj.ProjectionLike,
 *            text: (string|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined)}}
 */
olx.source.GeoJSONOptions;



/**
 * @interface
 */
olx.source.GeoJSONOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.GeoJSONOptionsExtern.prototype.attributions;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.GeoJSONOptionsExtern.prototype.defaultProjection;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.GeoJSONOptionsExtern.prototype.extent;


/**
 * @type {string|undefined}
 */
olx.source.GeoJSONOptionsExtern.prototype.logo;


/**
 * @type {GeoJSONObject|undefined}
 */
olx.source.GeoJSONOptionsExtern.prototype.object;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.GeoJSONOptionsExtern.prototype.projection;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.GeoJSONOptionsExtern.prototype.reprojectTo;


/**
 * @type {string|undefined}
 */
olx.source.GeoJSONOptionsExtern.prototype.text;


/**
 * @type {string|undefined}
 */
olx.source.GeoJSONOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.GeoJSONOptionsExtern.prototype.urls;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            defaultStyle: (Array.<ol.style.Style>|undefined),
 *            doc: (Document|undefined),
 *            extent: (ol.Extent|undefined),
 *            logo: (string|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            reprojectTo: ol.proj.ProjectionLike,
 *            text: (string|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined)}}
 */
olx.source.KMLOptions;



/**
 * @interface
 */
olx.source.KMLOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.KMLOptionsExtern.prototype.attributions;


/**
 * @type {Array.<ol.style.Style>|undefined}
 */
olx.source.KMLOptionsExtern.prototype.defaultStyle;


/**
 * @type {Document|undefined}
 */
olx.source.KMLOptionsExtern.prototype.doc;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.KMLOptionsExtern.prototype.extent;


/**
 * @type {string|undefined}
 */
olx.source.KMLOptionsExtern.prototype.logo;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.KMLOptionsExtern.prototype.projection;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.KMLOptionsExtern.prototype.reprojectTo;


/**
 * @type {string|undefined}
 */
olx.source.KMLOptionsExtern.prototype.text;


/**
 * @type {string|undefined}
 */
olx.source.KMLOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.KMLOptionsExtern.prototype.urls;


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
 *            gutter: (number|undefined),
 *            hidpi: (boolean|undefined),
 *            logo: (string|undefined),
 *            maxZoom: (number|undefined),
 *            params: Object.<string,*>,
 *            projection: ol.proj.ProjectionLike,
 *            serverType: (ol.source.wms.ServerType|undefined),
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
 * @type {boolean|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.hidpi;


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
 * @type {ol.source.wms.ServerType|undefined}
 */
olx.source.TileWMSOptionsExtern.prototype.serverType;


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
 *            doc: (Document|undefined),
 *            extent: (ol.Extent|undefined),
 *            format: ol.format.Format,
 *            logo: (string|undefined),
 *            node: (Node|undefined),
 *            object: (Object|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            text: (string|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined)}}
 */
olx.source.VectorFileOptions;



/**
 * @interface
 */
olx.source.VectorFileOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.attributions;


/**
 * @type {Document|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.doc;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.extent;


/**
 * @type {ol.format.Format}
 */
olx.source.VectorFileOptionsExtern.prototype.format;


/**
 * @type {string|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.logo;


/**
 * @type {Node|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.node;


/**
 * @type {Object|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.object;


/**
 * @type {ol.proj.ProjectionLike}
 */
olx.source.VectorFileOptionsExtern.prototype.projection;


/**
 * @type {string|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.text;


/**
 * @type {string|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.VectorFileOptionsExtern.prototype.urls;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            extent: (ol.Extent|undefined),
 *            features: (Array.<ol.Feature>|undefined),
 *            logo: (string|undefined),
 *            projection: ol.proj.ProjectionLike,
 *            state: (ol.source.State|undefined)}}
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
 * @type {ol.proj.ProjectionLike}
 */
olx.source.VectorOptionsExtern.prototype.projection;


/**
 * @type {ol.source.State|undefined}
 */
olx.source.VectorOptionsExtern.prototype.state;


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
 * @typedef {{fill: (ol.style.Fill|undefined),
 *            radius: number,
 *            stroke: (ol.style.Stroke|undefined)}}
 */
olx.style.CircleOptions;



/**
 * @interface
 */
olx.style.CircleOptionsExtern = function() {};


/**
 * @type {ol.style.Fill|undefined}
 */
olx.style.CircleOptionsExtern.prototype.fill;


/**
 * @type {number}
 */
olx.style.CircleOptionsExtern.prototype.radius;


/**
 * @type {ol.style.Stroke|undefined}
 */
olx.style.CircleOptionsExtern.prototype.stroke;


/**
 * @typedef {{color: (ol.Color|string|undefined)}}
 */
olx.style.FillOptions;



/**
 * @interface
 */
olx.style.FillOptionsExtern = function() {};


/**
 * @type {ol.Color|string|undefined}
 */
olx.style.FillOptionsExtern.prototype.color;


/**
 * @typedef {{anchor: (Array.<number>|undefined),
 *            anchorXUnits: (ol.style.IconAnchorUnits|undefined),
 *            anchorYUnits: (ol.style.IconAnchorUnits|undefined),
 *            crossOrigin: (null|string|undefined),
 *            rotation: (number|undefined),
 *            scale: (number|undefined),
 *            size: (ol.Size|undefined),
 *            src: string}}
 */
olx.style.IconOptions;



/**
 * @interface
 */
olx.style.IconOptionsExtern = function() {};


/**
 * @type {Array.<number>|undefined}
 */
olx.style.IconOptionsExtern.prototype.anchor;


/**
 * @type {ol.style.IconAnchorUnits|undefined}
 */
olx.style.IconOptionsExtern.prototype.anchorXUnits;


/**
 * @type {ol.style.IconAnchorUnits|undefined}
 */
olx.style.IconOptionsExtern.prototype.anchorYUnits;


/**
 * @type {null|string|undefined}
 */
olx.style.IconOptionsExtern.prototype.crossOrigin;


/**
 * @type {number|undefined}
 */
olx.style.IconOptionsExtern.prototype.rotation;


/**
 * @type {number|undefined}
 */
olx.style.IconOptionsExtern.prototype.scale;


/**
 * @type {ol.Size|undefined}
 */
olx.style.IconOptionsExtern.prototype.size;


/**
 * @type {string}
 */
olx.style.IconOptionsExtern.prototype.src;


/**
 * @typedef {{color: (ol.Color|string|undefined),
 *            lineCap: (string|undefined),
 *            lineDash: (Array.<number>|undefined),
 *            lineJoin: (string|undefined),
 *            miterLimit: (number|undefined),
 *            width: (number|undefined)}}
 */
olx.style.StrokeOptions;



/**
 * @interface
 */
olx.style.StrokeOptionsExtern = function() {};


/**
 * @type {ol.Color|string|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.color;


/**
 * @type {string|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.lineCap;


/**
 * @type {Array.<number>|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.lineDash;


/**
 * @type {string|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.lineJoin;


/**
 * @type {number|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.miterLimit;


/**
 * @type {number|undefined}
 */
olx.style.StrokeOptionsExtern.prototype.width;


/**
 * @typedef {{fill: (ol.style.Fill|undefined),
 *            image: (ol.style.Image|undefined),
 *            stroke: (ol.style.Stroke|undefined),
 *            text: (ol.style.Text|undefined),
 *            zIndex: (number|undefined)}}
 */
olx.style.StyleOptions;



/**
 * @interface
 */
olx.style.StyleOptionsExtern = function() {};


/**
 * @type {ol.style.Fill|undefined}
 */
olx.style.StyleOptionsExtern.prototype.fill;


/**
 * @type {ol.style.Image|undefined}
 */
olx.style.StyleOptionsExtern.prototype.image;


/**
 * @type {ol.style.Stroke|undefined}
 */
olx.style.StyleOptionsExtern.prototype.stroke;


/**
 * @type {ol.style.Text|undefined}
 */
olx.style.StyleOptionsExtern.prototype.text;


/**
 * @type {number|undefined}
 */
olx.style.StyleOptionsExtern.prototype.zIndex;


/**
 * @typedef {{fill: (ol.style.Fill|undefined),
 *            font: (string|undefined),
 *            rotation: (number|undefined),
 *            stroke: (ol.style.Stroke|undefined),
 *            text: (string|undefined),
 *            textAlign: (string|undefined),
 *            textBaseline: (string|undefined)}}
 */
olx.style.TextOptions;



/**
 * @interface
 */
olx.style.TextOptionsExtern = function() {};


/**
 * @type {ol.style.Fill|undefined}
 */
olx.style.TextOptionsExtern.prototype.fill;


/**
 * @type {string|undefined}
 */
olx.style.TextOptionsExtern.prototype.font;


/**
 * @type {number|undefined}
 */
olx.style.TextOptionsExtern.prototype.rotation;


/**
 * @type {ol.style.Stroke|undefined}
 */
olx.style.TextOptionsExtern.prototype.stroke;


/**
 * @type {string|undefined}
 */
olx.style.TextOptionsExtern.prototype.text;


/**
 * @type {string|undefined}
 */
olx.style.TextOptionsExtern.prototype.textAlign;


/**
 * @type {string|undefined}
 */
olx.style.TextOptionsExtern.prototype.textBaseline;


/**
 * @typedef {{minZoom: (number|undefined),
 *            origin: (ol.Coordinate|undefined),
 *            origins: (Array.<ol.Coordinate>|undefined),
 *            resolutions: !Array.<number>,
 *            tileSize: (number|undefined),
 *            tileSizes: (Array.<number>|undefined)}}
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
 * @type {number|undefined}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.tileSize;


/**
 * @type {Array.<number>|undefined}
 */
olx.tilegrid.TileGridOptionsExtern.prototype.tileSizes;


/**
 * @typedef {{matrixIds: !Array.<string>,
 *            origin: (ol.Coordinate|undefined),
 *            origins: (Array.<ol.Coordinate>|undefined),
 *            resolutions: !Array.<number>,
 *            tileSize: (number|undefined),
 *            tileSizes: (Array.<number>|undefined)}}
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
 * @type {number|undefined}
 */
olx.tilegrid.WMTSOptionsExtern.prototype.tileSize;


/**
 * @type {Array.<number>|undefined}
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
