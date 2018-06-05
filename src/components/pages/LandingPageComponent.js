"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Radium = require("radium");
const MapComponent_1 = require("../MapComponent");
const FeedComponent_1 = require("../FeedComponent");
exports.firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
let config = {
    apiKey: "AIzaSyBiSP-MkxBb9Nxwcg62Q5F_dDrEOG0lNf8",
    authDomain: "fir-test-c5d35.firebaseapp.com",
    databaseURL: "https://fir-test-c5d35.firebaseio.com",
    projectId: "fir-test-c5d35",
    storageBucket: "fir-test-c5d35.appspot.com",
    messagingSenderId: "963950806435"
};
exports.firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
exports.db = exports.firebase.firestore();
const settings = { timestampsInSnapshots: true };
exports.db.settings(settings);
let LandingPageComponent = LandingPageComponent_1 = class LandingPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        exports.db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                this.state.posts.push(doc.data());
                this.setState({});
            });
        });
    }
    submitPost(content) {
        console.log(content);
        let post = {
            content: content,
            latitude: 47.594 + Math.random() * 0.001,
            longitude: -122.148 + Math.random() * 0.001,
        };
        let docName = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);
        let docRef = exports.db.collection("posts").doc(docName);
        docRef.set(post)
            .then(writeResult => {
            console.log(`Document written at: ${writeResult.writeTime}`);
        })
            .catch(function (error) {
            console.error("Error setting document: ", error);
        });
    }
    onRefreshPress() {
        this.setState({
            posts: []
        });
        exports.db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                this.state.posts.push(doc.data());
                this.setState({});
            });
        });
    }
    render() {
        let mapContainerElement = document.getElementById("map-container");
        console.log(mapContainerElement ? mapContainerElement.clientHeight : "none");
        return (React.createElement("div", { style: [
                LandingPageComponent_1.styles.container
            ] },
            React.createElement("div", { style: [LandingPageComponent_1.styles.feedContainer] },
                React.createElement(FeedComponent_1.FeedComponent, { posts: this.state.posts, onPostSubmit: this.submitPost.bind(this), onRefreshPress: this.onRefreshPress.bind(this) })),
            React.createElement("div", { style: [LandingPageComponent_1.styles.mapContainer], id: "map-container" },
                React.createElement(MapComponent_1.MapComponent, { posts: this.state.posts }))));
    }
};
LandingPageComponent.styles = {
    container: {
        display: "flex",
        flexDirection: "row"
    },
    mapContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
    },
    feedContainer: {
        flex: 1,
        height: "100%"
    }
};
LandingPageComponent = LandingPageComponent_1 = __decorate([
    Radium
], LandingPageComponent);
exports.LandingPageComponent = LandingPageComponent;
var LandingPageComponent_1;