"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ICON = "M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3\n  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9\n  C20.1,15.8,20.2,15.8,20.2,15.7z";
var pinStyle = {
    cursor: "pointer",
    fill: "#d00",
    stroke: "none"
};

var CityPin = function (_React$PureComponent) {
    _inherits(CityPin, _React$PureComponent);

    function CityPin() {
        _classCallCheck(this, CityPin);

        return _possibleConstructorReturn(this, (CityPin.__proto__ || Object.getPrototypeOf(CityPin)).apply(this, arguments));
    }

    _createClass(CityPin, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                _props$size = _props.size,
                size = _props$size === undefined ? 20 : _props$size,
                onClick = _props.onClick;

            return React.createElement("svg", { height: size, viewBox: "0 0 24 24", style: Object.assign({}, pinStyle, { transform: "translate(" + -size / 2 + "px," + -size + "px)" }), onClick: onClick }, React.createElement("path", { d: ICON }));
        }
    }]);

    return CityPin;
}(React.PureComponent);

exports.default = CityPin;