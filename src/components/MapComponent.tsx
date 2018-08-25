import * as React from "react";
import * as Radium from "radium";
import MapGL, {Marker, Popup, NavigationControl} from "react-map-gl";
import {Viewport} from "../models/Viewport";
import CityPin from "./CityPin";
import {bounds} from "@mapbox/geo-viewport";
import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

const MAPBOX_TOKEN = "pk.eyJ1IjoiYmd1IiwiYSI6ImNqY2RwZ2M4bzBpOXkzM3Q5bXZ2ejAxeGwifQ.r6hjLkDS5OgPGuwIKuEGWw";

@Radium
export class MapComponent extends React.Component<any, IMapComponentState> {
    constructor(props) {
        super(props);

        let centerX = -71.093333;
        let centerY = 42.358601;
        let zoom = 13;

        this.state = {
            viewport: {
                latitude: centerY,
                longitude: centerX,
                zoom: zoom,
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

    private _renderLocationMarker(location, index) {
        return (
            <Marker key={`marker-${index}`}
                    longitude={location.longitude}
                    latitude={location.latitude}>
                <CityPin
                    size={20}
                    onClick={this.onClickMarker}
                    selected={(this.props.selectedIndex !== null) && (index === this.props.selectedIndex)}
                    index={index}
                />
            </Marker>
        );
    }

    private onClick = (...args) => {
        if (this.props.isChoosingNewContentLocation) {
            this.props.onChooseNewContentLocation(args[0].lngLat);
        }
    };

    private onClickMarker = (index: number) => {
        if (!this.props.isChoosingNewContentLocation && !this.props.isWritingNewContent) {
            this.props.onClickMapMarker(index);
        }
    }

    private onHover = (...args) => {
        this.setState({
            mouseLng: args[0].lngLat[0],
            mouseLat: args[0].lngLat[1]
        });
    };


    public render() {
        let viewport = {
            latitude: this.state.viewport.latitude,
            longitude: this.state.viewport.longitude,
            zoom: this.state.viewport.zoom,
            bearing: this.state.viewport.bearing,
            pitch: this.state.viewport.pitch,
            width: this.state.viewport.width,
            height: this.state.viewport.height
        };

        if (this.props.withCenter !== null) {
            viewport.longitude = this.props.withCenter.longitude;
            viewport.latitude = this.props.withCenter.latitude;
        }
        if (this.props.withZoom !== null) {
            viewport.zoom = this.props.withZoom;
        }

        return (
            <div>
                <pre id="info">
                    {"long: " + this.state.mouseLng + ", lat: " + this.state.mouseLat}
                </pre>
                <MapGL
                    {...viewport}
                    onViewportChange={this.onViewportChange.bind(this)}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onClick={this.onClick}
                    onHover={this.onHover}
                    dragPan={!this.props.isChoosingNewContentLocation}
                    doubleClickZoom={!this.props.isChoosingNewContentLocation}
                >
                    {this.props.locations.map(this._renderLocationMarker.bind(this))}
                </MapGL>
            </div>
        );
    }

}

export interface IMapComponentProps {
    locations: GeoPoint[];
    onViewportChange: any; // rip types
    isChoosingNewContentLocation: boolean;
    isWritingNewContent: boolean;
    onChooseNewContentLocation: (loc: number[]) => void;
    selectedIndex?: number;
    onClickMapMarker: (index: number) => void;
    onlyOneItem: boolean;
    withCenter?: GeoPoint;
    withZoom?: number;
}

export interface IMapComponentState {
    viewport: Viewport;
    mouseLng: number;
    mouseLat: number;
}