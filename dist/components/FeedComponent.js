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
var FeedComponent = function (_React$Component) {
    _inherits(FeedComponent, _React$Component);

    function FeedComponent(props) {
        _classCallCheck(this, FeedComponent);

        var _this = _possibleConstructorReturn(this, (FeedComponent.__proto__ || Object.getPrototypeOf(FeedComponent)).call(this, props));

        _this.state = {
            newContent: ""
        };
        return _this;
    }

    _createClass(FeedComponent, [{
        key: "onContentChange",
        value: function onContentChange(event) {
            this.setState({
                newContent: event.target.value
            });
        }
    }, {
        key: "onContentSubmit",
        value: function onContentSubmit() {
            this.props.onPostSubmit(this.state.newContent);
        }
    }, {
        key: "onRefreshPress",
        value: function onRefreshPress() {
            this.props.onRefreshPress();
        }
    }, {
        key: "render",
        value: function render() {
            var rows = this.props.posts.map(function (post, rowIndex) {
                return React.createElement("div", { key: rowIndex, style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        height: 40,
                        borderWidth: 3
                    } }, rowIndex, post.contentText);
            });
            return React.createElement("div", null, rows, React.createElement("div", null, React.createElement("input", { ref: "newPostContent", type: "text", value: this.state.newContent, onChange: this.onContentChange.bind(this) }), React.createElement("input", { type: "button", value: "submit", onClick: this.onContentSubmit.bind(this) }), React.createElement("input", { type: "button", value: "refresh", onClick: this.onRefreshPress.bind(this) })));
        }
    }]);

    return FeedComponent;
}(React.Component);
FeedComponent = __decorate([Radium], FeedComponent);
exports.FeedComponent = FeedComponent;