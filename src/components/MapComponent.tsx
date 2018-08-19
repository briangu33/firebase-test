import * as React from "react";
import * as Radium from "radium";
import MapGL, {Marker, Popup, NavigationControl} from "react-map-gl";
import {Viewport} from "../models/Viewport";
import {Post} from "../models/Post";
import CityPin from "./CityPin";

const MAPBOX_TOKEN = "pk.eyJ1IjoiYmd1IiwiYSI6ImNqY2RwZ2M4bzBpOXkzM3Q5bXZ2ejAxeGwifQ.r6hjLkDS5OgPGuwIKuEGWw";

@Radium
export class MapComponent extends React.Component<any, IMapComponentState> {
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

    private _renderPostMarker(post, index) {
        return (
            <Marker key={`marker-${index}`}
                    longitude={post.location.longitude}
                    latitude={post.location.latitude} >
                <CityPin size={20} onClick={() => {}} />
            </Marker>
        );
    }


    public render() {
        console.log(`height: ${this.state.viewport.height}`);
        console.log(`width: ${this.state.viewport.width}`);
        return (
            <MapGL
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({viewport})}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                { this.props.posts.map(this._renderPostMarker.bind(this)) }
            </MapGL>
        );
    }

}

export interface IMapComponentProps {
    posts: Post[];
}

export interface IMapComponentState {
    viewport: Viewport;
}