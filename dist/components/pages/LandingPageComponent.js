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
var MapComponent_1 = require("../MapComponent");
var FeedComponent_1 = require("../FeedComponent");
var fb = require("firebase");
var GeoPoint = fb.firestore.GeoPoint;
exports.firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var config = {
    apiKey: "AIzaSyCtB2dkz32dvHJJs04utPn7fVtfD3nKObU",
    authDomain: "wya-mit.firebaseapp.com",
    databaseURL: "https://wya-mit.firebaseio.com",
    projectId: "wya-mit",
    storageBucket: "wya-mit.appspot.com",
    messagingSenderId: "385985702046"
};
exports.firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
exports.db = exports.firebase.firestore();
var settings = { timestampsInSnapshots: true };
exports.db.settings(settings);
var LandingPageComponent = LandingPageComponent_1 = function (_React$Component) {
    _inherits(LandingPageComponent, _React$Component);

    function LandingPageComponent(props) {
        _classCallCheck(this, LandingPageComponent);

        var _this = _possibleConstructorReturn(this, (LandingPageComponent.__proto__ || Object.getPrototypeOf(LandingPageComponent)).call(this, props));

        _this.state = {
            posts: [],
            onlyOnePost: false,
            swCorner: new GeoPoint(-90, -180),
            neCorner: new GeoPoint(90, 180),
            startTime: new Date("August 1, 2018 00:00:00"),
            endTime: new Date(),
            user: "any-user"
        };
        exports.db.collection("posts").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data());
                _this.state.posts.push(doc.data());
                _this.setState({});
            });
        });
        return _this;
    }

    _createClass(LandingPageComponent, [{
        key: "submitPost",
        value: function submitPost(content) {
            /*
            console.log(content);
            let post: Post = {
                content: content,
                latitude: 47.594 + Math.random() * 0.001,
                longitude: -122.148 + Math.random() * 0.001,
            };
             let docName = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
            let docRef = db.collection("posts").doc(docName);
            docRef.set(post)
                .then(writeResult => {
                    console.log(`Document written at: ${writeResult.writeTime}`);
                })
                .catch(function (error) {
                    console.error("Error setting document: ", error);
                });
                */
        }
    }, {
        key: "onRefreshPress",
        value: function onRefreshPress() {
            var _this2 = this;

            this.setState({
                posts: []
            });
            var posts = [];
            exports.db.collection("posts").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var post = doc.data();
                    if (_this2.isInMapRegion(post) && _this2.isInTimeWindow(post)) {
                        posts.push(post);
                    }
                    _this2.setState({
                        posts: posts
                    });
                });
            });
        }
    }, {
        key: "onTimeWindowChange",
        value: function onTimeWindowChange() {
            var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date("August 1, 2018 00:00:00");
            var endTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

            this.setState({
                startTime: startTime,
                endTime: endTime
            });
        }
    }, {
        key: "isInMapRegion",
        value: function isInMapRegion(post) {
            return post.location.latitude > this.state.swCorner.latitude && post.location.latitude < this.state.neCorner.latitude && post.location.longitude > this.state.swCorner.longitude && post.location.longitude < this.state.neCorner.longitude;
        }
    }, {
        key: "isInTimeWindow",
        value: function isInTimeWindow(post) {
            return post.timestamp.toMillis() > this.state.startTime.getTime() && post.timestamp.toMillis() < this.state.endTime.getTime();
        }
    }, {
        key: "onViewportChange",
        value: function onViewportChange(swCorner, neCorner) {
            this.setState({
                swCorner: swCorner,
                neCorner: neCorner
            });
        }
    }, {
        key: "render",
        value: function render() {
            var mapContainerElement = document.getElementById("map-container");
            console.log(mapContainerElement ? mapContainerElement.clientHeight : "none");
            return React.createElement("div", { style: [LandingPageComponent_1.styles.container] }, React.createElement("div", { style: [LandingPageComponent_1.styles.feedContainer] }, React.createElement(FeedComponent_1.FeedComponent, { posts: this.state.posts, onPostSubmit: this.submitPost.bind(this), onRefreshPress: this.onRefreshPress.bind(this), onTimeWindowChange: this.onTimeWindowChange.bind(this) })), React.createElement("div", { style: [LandingPageComponent_1.styles.mapContainer], id: "map-container" }, React.createElement(MapComponent_1.MapComponent, { posts: this.state.posts, onViewportChange: this.onViewportChange.bind(this) })));
        }
    }]);

    return LandingPageComponent;
}(React.Component);
LandingPageComponent.styles = {
    container: {
        display: "flex",
        flexDirection: "row"
    },
    mapContainer: {
        flex: 1,
        height: "100%",
        width: "100%"
    },
    feedContainer: {
        flex: 1,
        height: "100%"
    }
};
LandingPageComponent = LandingPageComponent_1 = __decorate([Radium], LandingPageComponent);
exports.LandingPageComponent = LandingPageComponent;
var LandingPageComponent_1;