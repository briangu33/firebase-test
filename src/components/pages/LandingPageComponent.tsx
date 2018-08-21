import * as React from "react";
import * as Radium from "radium";
import {MapComponent} from "../MapComponent";
import {FeedComponent} from "../FeedComponent";
import {Post} from "../../models/Post";
import * as fb from "firebase";
import GeoPoint = fb.firestore.GeoPoint;
import {NewPostModal} from "../NewPostModal";
import * as ReactModal from "react-modal";
import {PostSubmission} from "../../models/PostSubmission";

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
const settings = {timestampsInSnapshots: true};
db.settings(settings);

@Radium
export class LandingPageComponent extends React.Component<any, ILandingPageComponentState> {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            onlyOnePost: false,
            swCorner: new GeoPoint(-90, -180),
            neCorner: new GeoPoint(90, 180),
            startTime: new Date("August 1, 2018 00:00:00"),
            endTime: new Date("August 1, 2025 00:00:00"),
            user: "any-user",
            isChoosingPostLocation: false,
            isWritingPost: false
        };

        db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                this.state.posts.push(doc.data());
                this.setState({});
            });
        });
    }

    public componentDidMount() {
        document.addEventListener("keydown", this._onKeyDown);
    }

    public componentWillUnmount() {
        document.removeEventListener("keydown", this._onKeyDown);
    }

    private _onKeyDown = (event) => {
        const keyName = event.key;
        console.log(keyName.toString());
        if (keyName === "Escape" && this.state.isChoosingPostLocation) {
            console.log("cancelling");
            this.setState({
                isChoosingPostLocation: false
            });
        }
    };

    private refresh() {
        this.setState({
            posts: []
        });

        let posts: Post[] = [];

        db.collection("posts").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let post = doc.data() as Post;
                    if (this.isInMapRegion(post) && this.isInTimeWindow(post)) {
                        posts.push(post);
                    }
                    this.setState({
                        posts: posts
                    });
                });
            });
    }


    private onRefreshPress() {
        this.refresh();
    }

    private onTimeWindowChange(startTime = new Date("August 1, 2018 00:00:00"), endTime = new Date("August 1, 2025 00:00:00")) {
        this.setState({
            startTime: startTime,
            endTime: endTime
        });
    }

    private onHoverOverPost = (index: number) => {
        this.setState({
            selectedIndex: index
        });
    };

    private onUnhoverOverPost = (index: number) => {
        this.setState({
            selectedIndex: this.state.selectedIndex === index ? null : this.state.selectedIndex
        });
    };

    private isInMapRegion(post: Post) {
        return post.location.latitude > this.state.swCorner.latitude
            && post.location.latitude < this.state.neCorner.latitude
            && post.location.longitude > this.state.swCorner.longitude
            && post.location.longitude < this.state.neCorner.longitude;
    }

    private isInTimeWindow(post: Post) {
        return post.timestamp.toMillis() > this.state.startTime.getTime()
            && post.timestamp.toMillis() < this.state.endTime.getTime();
    }

    private onViewportChange(swCorner: GeoPoint, neCorner: GeoPoint) {
        this.setState({
            swCorner: swCorner,
            neCorner: neCorner
        });
    }

    private onClickAdd = () => {
        this.setState({
            isChoosingPostLocation: !this.state.isChoosingPostLocation
        });
    };

    private onChoosePostLocation = (loc: number[]) => {
        this.setState({
            isChoosingPostLocation: false,
            isWritingPost: true,
            newPostLocation: new GeoPoint(loc[1], loc[0])
        });
    };

    private onSubmitNewPost = (submission: PostSubmission) => {
        let newPostRef = db.collection("posts").doc();
        newPostRef.set({
            documentID: newPostRef.id,
            contentText: submission.contentText,
            location: submission.location,
            timestamp: firebase.firestore.Timestamp.now(),
            user: submission.user,
            visibleUsername: submission.visibleUsername
        })
            .then((docRef) => {
                console.log("posted");
                this.setState({
                    isChoosingPostLocation: false,
                    isWritingPost: false,
                    newPostLocation: null,
                    endTime: new Date(Date.now() + 5000)
                }, () => {
                    this.refresh();
                });
            });
    };

    private onCancelWritingPost = () => {
        this.setState({
            isChoosingPostLocation: false,
            isWritingPost: false,
            newPostLocation: null
        });
    };

    private onClickMapMarker = (index: number) => {
        this.setState({
            selectedIndex: index
        });
    };

    public render() {
        let mapContainerElement = document.getElementById("map-container");
        console.log(mapContainerElement ? mapContainerElement.clientHeight : "none");

        return (
            <div
                style={[
                    LandingPageComponent.styles.container
                ]}
            >
                <div style={[LandingPageComponent.styles.feedContainer]}>
                    <FeedComponent
                        posts={this.state.posts}
                        onRefreshPress={this.onRefreshPress.bind(this)}
                        onTimeWindowChange={this.onTimeWindowChange.bind(this)}
                        isChoosingPostLocation={this.state.isChoosingPostLocation}
                        isWritingPost={this.state.isWritingPost}
                        onHoverOverPost={this.onHoverOverPost}
                        onUnhoverOverPost={this.onUnhoverOverPost}
                        selectedIndex={this.state.selectedIndex}
                    />
                </div>
                <div style={[LandingPageComponent.styles.mapContainer]} id={"map-container"}>
                    <MapComponent
                        posts={this.state.posts}
                        onViewportChange={this.onViewportChange.bind(this)}
                        isChoosingPostLocation={this.state.isChoosingPostLocation}
                        isWritingPost={this.state.isWritingPost}
                        onChoosePostLocation={this.onChoosePostLocation}
                        selectedIndex={this.state.selectedIndex}
                        onClickMapMarker={this.onClickMapMarker}
                    />
                </div>
                <div style={[LandingPageComponent.styles.addButton]}>
                    <button
                        onClick={this.onClickAdd}
                    >
                        {this.state.isChoosingPostLocation ? "cancel" : "add post"}
                    </button>
                </div>
                <ReactModal
                    isOpen={this.state.isWritingPost}
                    style={ModalStyle}
                    contentLabel="New Post"
                    onRequestClose={this.onCancelWritingPost}>
                    <NewPostModal
                        onSubmit={this.onSubmitNewPost}
                        onCancel={this.onCancelWritingPost}
                        location={this.state.newPostLocation}
                    />
                </ReactModal>
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
            width: "100%"
        },
        feedContainer: {
            flex: 1,
            height: "100%"
        },
        addButton: {
            position: "absolute",
            right: 10,
            top: 10
        }
    };
}

export interface ILandingPageComponentState {
    posts: Post[];
    swCorner: GeoPoint;
    neCorner: GeoPoint;
    startTime?: Date;
    endTime?: Date;
    user: string;
    onlyOnePost: boolean;
    isChoosingPostLocation: boolean;
    isWritingPost: boolean;
    newPostLocation?: GeoPoint;
    selectedIndex?: number;
}

export const ModalStyle = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    content: {
        position: "relative",
        background: "#fff",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: "0px",
        outline: "none",
        padding: "20px",
        boxSizing: "border-box",
        color: "rgba(0, 0, 0, 0.87)",
        direction: "ltr",
        display: "block",
        fontSize: "14px",
        lineHeight: "20px",
        overflowX: "hidden",
        overflowY: "auto",
        paddingBottom: "36px",
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingTop: "48px",
        transitionDelay: "0s",
        transitionDuration: "0.2s",
        transitionProperty: "all",
        transitionTimingFunction: "ease",
        width: "475px",
        "boxShadow": "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"
    }
};