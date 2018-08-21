import * as React from "react";
import * as Radium from "radium";
import MapGL, {Marker, Popup, NavigationControl} from "react-map-gl";
import {Viewport} from "../models/Viewport";
import {Post} from "../models/Post";
import CityPin from "./CityPin";
import {bounds} from "@mapbox/geo-viewport";
import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

const MAPBOX_TOKEN = "pk.eyJ1IjoiYmd1IiwiYSI6ImNqY2RwZ2M4bzBpOXkzM3Q5bXZ2ejAxeGwifQ.r6hjLkDS5OgPGuwIKuEGWw";

@Radium
export class MapComponent extends React.Component<any, IMapComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 37.729976,
                longitude: -122.135260,
                zoom: 13,
                bearing: 0,
                pitch: 0,
                width: window.innerWidth / 2,
                height: window.innerHeight
            },
            mouseLng: 0,
            mouseLat: 0
        };

    }

    private onViewportChange(viewport) {
        this.setState({viewport});
        let boundingBox = bounds([this.state.viewport.longitude, this.state.viewport.latitude],
            this.state.viewport.zoom, [this.state.viewport.width, this.state.viewport.height], 512); // must be 512!!!
        this.props.onViewportChange(new GeoPoint(boundingBox[1], boundingBox[0]), new GeoPoint(boundingBox[3], boundingBox[2]));
        // some dumb ordering thing
    }

    private _renderPostMarker(post, index) {
        return (
            <Marker key={`marker-${index}`}
                    longitude={post.location.longitude}
                    latitude={post.location.latitude}>
                <CityPin
                    size={20}
                    onClick={() => {
                    }}
                    selected={this.props.selectedIndex && index === this.props.selectedIndex}
                />
            </Marker>
        );
    }

    private onClick = (...args) => {
        if (this.props.isChoosingPostLocation) {
            this.props.onChoosePostLocation(args[0].lngLat);
        }
        ;
    };

    private onHover = (...args) => {
        this.setState({
            mouseLng: args[0].lngLat[0],
            mouseLat: args[0].lngLat[1]
        });
    };


    public render() {
        return (
            <div>
                <pre id="info">
                    {"long: " + this.state.mouseLng + ", lat: " + this.state.mouseLat}
                </pre>
                <MapGL
                    {...this.state.viewport}
                    onViewportChange={this.onViewportChange.bind(this)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onClick={this.onClick}
                    onHover={this.onHover}
                    dragPan={!this.props.isChoosingPostLocation}
                    doubleClickZoom={!this.props.isChoosingPostLocation}
                >
                    {this.props.posts.map(this._renderPostMarker.bind(this))}
                </MapGL>
            </div>
        );
    }

}

export interface IMapComponentProps {
    posts: Post[];
    onViewportChange: any; // rip types
    isChoosingPostLocation: boolean;
    isWritingPost: boolean;
    onChoosePostLocation: (loc: number[]) => {};
    selectedIndex?: number;
}

export interface IMapComponentState {
    viewport: Viewport;
    mouseLng: number;
    mouseLat: number;
}