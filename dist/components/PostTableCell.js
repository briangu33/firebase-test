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
var moment = require("moment");
var LandingPageComponent_1 = require("./pages/LandingPageComponent");
var PostTableCell = PostTableCell_1 = function (_React$Component) {
    _inherits(PostTableCell, _React$Component);

    function PostTableCell(props) {
        _classCallCheck(this, PostTableCell);

        var _this = _possibleConstructorReturn(this, (PostTableCell.__proto__ || Object.getPrototypeOf(PostTableCell)).call(this, props));

        _this.onHoverStart = function () {
            _this.setState({
                selected: true
            });
        };
        _this.onHoverEnd = function () {
            _this.setState({
                selected: false
            });
        };
        _this.state = {
            selected: false,
            upvotes: 0,
            downvotes: 0,
            comments: 0
        };
        LandingPageComponent_1.db.collection("posts").doc(_this.props.post.documentID).collection("upvotes").onSnapshot(function (querySnapshot) {
            _this.setState({ upvotes: querySnapshot.size });
        });
        LandingPageComponent_1.db.collection("posts").doc(_this.props.post.documentID).collection("downvotes").onSnapshot(function (querySnapshot) {
            _this.setState({ downvotes: querySnapshot.size });
        });
        LandingPageComponent_1.db.collection("posts").doc(_this.props.post.documentID).collection("comments").onSnapshot(function (querySnapshot) {
            _this.setState({ comments: querySnapshot.size });
        });
        return _this;
    }

    _createClass(PostTableCell, [{
        key: "render",
        value: function render() {
            var timeAgo = moment(this.props.post.timestamp.toMillis()).fromNow();
            return React.createElement("div", { onMouseEnter: this.onHoverStart, onMouseLeave: this.onHoverEnd, style: [PostTableCell_1.styles.container, { backgroundColor: this.state.selected ? "#bbbbbb" : "#ffffff" }] }, React.createElement("div", { style: [PostTableCell_1.styles.topBar] }, React.createElement("div", null, "document ID: " + this.props.post.documentID), React.createElement("div", null, "author: " + this.props.post.user + " (" + this.props.post.visibleUsername + ")")), React.createElement("div", { style: [PostTableCell_1.styles.contentContainer] }, this.props.post.contentText), React.createElement("div", null, "score: " + (this.state.upvotes - this.state.downvotes).toString()), React.createElement("div", null, "comments: " + this.state.comments.toString()), React.createElement("div", null, this.props.post.timestamp.toDate().toString() + " (" + timeAgo + ")"));
        }
    }]);

    return PostTableCell;
}(React.Component);
PostTableCell.styles = {
    container: {
        display: "flex",
        padding: "10px",
        flexDirection: "column",
        borderWidth: 2,
        borderBottomStyle: "solid",
        borderColor: "#22bbff",
        width: "100%",
        backgroundColor: "#ffffff"
    },
    topBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomStyle: "solid",
        borderColor: "#999999",
        borderWidth: 1,
        marginBottom: "10px"
    },
    contentContainer: {
        marginBottom: "10px"
    }
};
PostTableCell = PostTableCell_1 = __decorate([Radium], PostTableCell);
exports.PostTableCell = PostTableCell;
var PostTableCell_1;