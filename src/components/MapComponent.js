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
const react_map_gl_1 = require("react-map-gl");
const CityPin_1 = require("./CityPin");
const geo_viewport_1 = require("@mapbox/geo-viewport");
const firebase = require("firebase");
var GeoPoint = firebase.firestore.GeoPoint;
const MAPBOX_TOKEN = "pk.eyJ1IjoiYmd1IiwiYSI6ImNqY2RwZ2M4bzBpOXkzM3Q5bXZ2ejAxeGwifQ.r6hjLkDS5OgPGuwIKuEGWw";
let MapComponent = class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }
    onViewportChange(viewport) {
        this.setState({ viewport });
        let boundingBox = geo_viewport_1.bounds([this.state.viewport.longitude, this.state.viewport.latitude], this.state.viewport.zoom, [this.state.viewport.width, this.state.viewport.height], 512); // must be 512!!!
        this.props.onViewportChange(new GeoPoint(boundingBox[1], boundingBox[0]), new GeoPoint(boundingBox[3], boundingBox[2]));
        // some dumb ordering thing
    }
    _renderPostMarker(post, index) {
        return (React.createElement(react_map_gl_1.Marker, { key: `marker-${index}`, longitude: post.location.longitude, latitude: post.location.latitude },
            React.createElement(CityPin_1.default, { size: 20, onClick: () => { } })));
    }
    render() {
        console.log(`height: ${this.state.viewport.height}`);
        console.log(`width: ${this.state.viewport.width}`);
        console.log("bounding box: ", geo_viewport_1.bounds([this.state.viewport.longitude, this.state.viewport.latitude], this.state.viewport.zoom, [this.state.viewport.width, this.state.viewport.height], 512));
        return (React.createElement(react_map_gl_1.default, Object.assign({}, this.state.viewport, { onViewportChange: this.onViewportChange.bind(this), mapboxApiAccessToken: MAPBOX_TOKEN }), this.props.posts.map(this._renderPostMarker.bind(this))));
    }
};
MapComponent = __decorate([
    Radium
], MapComponent);
exports.MapComponent = MapComponent;
