import * as React from "react";
import * as Radium from "radium";
import {MapComponent} from "../MapComponent";
import {FeedComponent} from "../FeedComponent";
import {Post} from "../../models/Post";

export const firebase = require("firebase");
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
firebase.initializeApp(config);


// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

@Radium
export class LandingPageComponent extends React.Component<any, ILandingPageComponentState> {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                this.state.posts.push(doc.data());
                this.setState({});
            });
        });
    }


    private submitPost(content) {
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


    private onRefreshPress() {
        this.setState({
            posts: []
        });

        db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                this.state.posts.push(doc.data());
                this.setState({});
            });
        });
    }

    public render() {
        let mapContainerElement = document.getElementById("map-container");
        console.log(mapContainerElement ? mapContainerElement.clientHeight : "none");

        return (
            <div style={[
                LandingPageComponent.styles.container
            ]}>
                <div style={[LandingPageComponent.styles.feedContainer]}>
                    <FeedComponent
                        posts={this.state.posts}
                        onPostSubmit={this.submitPost.bind(this)}
                        onRefreshPress={this.onRefreshPress.bind(this)}
                    />
                </div>
                <div style={[LandingPageComponent.styles.mapContainer]} id={"map-container"}>
                    <MapComponent
                        posts={this.state.posts}
                    />
                </div>
            </div>
        );
    }

    private static styles = {
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
}

export interface ILandingPageComponentState {
    posts: Post[];
}