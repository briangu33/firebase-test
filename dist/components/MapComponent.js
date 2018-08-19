"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var react_map_gl_1 = require("react-map-gl");
var CityPin_1 = require("./CityPin");
var MAPBOX_TOKEN = "pk.eyJ1IjoiYmd1IiwiYSI6ImNqY2RwZ2M4bzBpOXkzM3Q5bXZ2ejAxeGwifQ.r6hjLkDS5OgPGuwIKuEGWw";
var MapComponent = function (_React$Component) {
    _inherits(MapComponent, _React$Component);

    function MapComponent(props) {
        _classCallCheck(this, MapComponent);

        var _this = _possibleConstructorReturn(this, (MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).call(this, props));

        _this.state = {
            viewport: {
                latitude: 37.729976,
                longitude: -122.135260,
                zoom: 10,
                bearing: 0,
                pitch: 0,
                width: window.innerWidth / 2,
                height: window.innerHeight
            }
        };
        return _this;
    }

    _createClass(MapComponent, [{
        key: "_renderPostMarker",
        value: function _renderPostMarker(post, index) {
            return React.createElement(react_map_gl_1.Marker, { key: "marker-" + index, longitude: post.location.longitude, latitude: post.location.latitude }, React.createElement(CityPin_1.default, { size: 20, onClick: function onClick() {} }));
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            console.log("height: " + this.state.viewport.height);
            console.log("width: " + this.state.viewport.width);
            return React.createElement(react_map_gl_1.default, Object.assign({}, this.state.viewport, { onViewportChange: function onViewportChange(viewport) {
                    return _this2.setState({ viewport: viewport });
                }, mapboxApiAccessToken: MAPBOX_TOKEN }), this.props.posts.map(this._renderPostMarker.bind(this)));
        }
    }]);

    return MapComponent;
}(React.Component);
MapComponent = __decorate([Radium], MapComponent);
exports.MapComponent = MapComponent;