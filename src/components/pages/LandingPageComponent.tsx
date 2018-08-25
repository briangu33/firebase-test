import * as React from "react";
import * as Radium from "radium";
import {MapComponent} from "../MapComponent";
import {PostsFeedComponent} from "../PostsFeedComponent";
import {Post} from "../../models/Post";
import * as fb from "firebase";
import GeoPoint = fb.firestore.GeoPoint;
import {NewPostModal} from "../NewPostModal";
import * as ReactModal from "react-modal";
import {NewPostInfo} from "../../models/NewPostInfo";
import {Challenge} from "../../models/Challenge";
import {ChallengesFeedComponent} from "../ChallengesFeedComponent";
import {NewChallengeInfo} from "../../models/NewChallengeInfo";
import {NewChallengeModal} from "../NewChallengeModal";

export const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

let config = {
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
            challenges: [],
            onlyOnePost: false,
            swCorner: new GeoPoint(-90, -180),
            neCorner: new GeoPoint(90, 180),
            startTime: new Date("August 1, 2018 00:00:00"),
            endTime: new Date("August 1, 2025 00:00:00"),
            user: "any-user",
            isChoosingPostLocation: false,
            isWritingPost: false,
            isChoosingChallengeLocation: false,
            isWritingChallenge: false,
            mode: LandingPageMode.Posts
        };

        db.collection("posts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                this.state.posts.push(doc.data());
                this.setState({});
            });
        });

        db.collection("challenges").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.state.challenges.push(doc.data());
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
        if (keyName === "Escape" && this.state.isChoosingPostLocation) {
            this.setState({
                isChoosingPostLocation: false,
                isChoosingChallengeLocation: false,
                isWritingPost: false,
                isWritingChallenge: false
            });
        }
    };

    private refresh() {
        this.setState({
            posts: [],
            challenges: [],
            onlyOnePost: false
        });

        let posts: Post[] = [];
        let challenges: Challenge[] = [];

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

        db.collection("challenges").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let challenge = doc.data() as Challenge;
                    challenges.push(challenge);
                    this.setState({
                        challenges: challenges
                    });
                });
            });
    }

    private getMapLocations() {
        if (this.state.mode === LandingPageMode.Posts) {
            return this.state.posts.map(post => post.location);
        } else if (this.state.mode === LandingPageMode.Challenges) {
            return this.state.challenges.map(challenge => challenge.location);
        }
        return [];
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

    private onHoverOverItem = (index: number) => {
        this.setState({
            selectedIndex: index
        });
    };

    private onUnhoverOverItem = (index: number) => {
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
        if (this.state.mode === LandingPageMode.Posts) {
            this.setState({
                isChoosingPostLocation: !this.state.isChoosingPostLocation,
                isWritingPost: false,
                isChoosingChallengeLocation: false,
                isWritingChallenge: false,
            });
        } else if (this.state.mode === LandingPageMode.Challenges) {
            this.setState({
                isChoosingChallengeLocation: !this.state.isChoosingChallengeLocation,
                isWritingChallenge: false,
                isChoosingPostLocation: false,
                isWritingPost: false
            });
        }
    };

    private onChoosePostLocation = (loc: number[]) => {
        this.setState({
            isChoosingPostLocation: false,
            isWritingPost: true,
            isChoosingChallengeLocation: false,
            isWritingChallenge: false,
            newContentLocation: new GeoPoint(loc[1], loc[0])
        });
    };

    private onChooseChallengeLocation = (loc: number[]) => {
        this.setState({
            isChoosingPostLocation: false,
            isWritingPost: false,
            isChoosingChallengeLocation: false,
            isWritingChallenge: true,
            newContentLocation: new GeoPoint(loc[1], loc[0])
        });
    }

    private onSubmitNewPost = (newPost: NewPostInfo) => {
        let newPostRef = db.collection("posts").doc();
        newPostRef.set({
            documentID: newPostRef.id,
            contentText: newPost.contentText,
            location: newPost.location,
            timestamp: firebase.firestore.Timestamp.now(),
            user: newPost.user,
            visibleUsername: newPost.visibleUsername
        })
            .then((docRef) => {
                console.log("posted");
                this.setState({
                    isChoosingPostLocation: false,
                    isWritingPost: false,
                    newContentLocation: null,
                    endTime: new Date(Date.now() + 5000)
                }, () => {
                    this.refresh();
                });
            });
    };

    private onSubmitNewChallenge = (newChallenge: NewChallengeInfo) => {
        let newChallengeRef = db.collection("challenges").doc();
        newChallengeRef.set({
            documentID: newChallengeRef.id,
            challengeName: newChallenge.challengeName,
            challengeText: newChallenge.challengeText,
            location: newChallenge.location,
            maxDistance: newChallenge.maxDistance,
            pictureChallengeEnabled: newChallenge.pictureChallengeEnabled
        })
            .then((docRef) => {
                console.log("created new challenge");
                this.setState({
                    isChoosingChallengeLocation: false,
                    isWritingChallenge: false,
                    newContentLocation: null,
                }, () => {
                    this.refresh();
                });
            });
    }

    private onCancelWritingContent = () => {
        this.setState({
            isChoosingPostLocation: false,
            isWritingPost: false,
            isChoosingChallengeLocation: false,
            isWritingChallenge: false,
            newContentLocation: null
        });
    };

    private onClickMapMarker = (index: number) => {
        this.setState({
            selectedIndex: index
        });
    };

    private onSinglePostQuery = (postID: string) => {
        this.setState({
            posts: [],
            onlyOnePost: true
        });

        let posts: Post[] = [];

        db.collection("posts").doc(postID).get()
            .then(doc => {
                if (doc.exists) {
                    posts = [(doc.data() as Post)];
                    this.setState({
                        posts: posts
                    });
                }
            });
    };

    private onPostsModeClick = () => {
        this.setState({
            mode: LandingPageMode.Posts
        });
    };

    private onChallengesModeClick = () => {
        this.setState({
            mode: LandingPageMode.Challenges
        });
    };

    private onReportsModeClick = () => {
        this.setState({
            mode: LandingPageMode.Reports
        });
    };

    public render() {
        let feedComponent = (<div/>);
        let onChooseNewContentLocationFn = this.onChoosePostLocation;
        let topRightButtonText = this.state.isChoosingPostLocation ? "cancel" : "add post";
        let mapCenter = null;
        let mapZoom = null;

        switch (this.state.mode) {
            case LandingPageMode.Posts:
                feedComponent = (<PostsFeedComponent
                    posts={this.state.posts}
                    onRefreshPress={this.onRefreshPress.bind(this)}
                    onTimeWindowChange={this.onTimeWindowChange.bind(this)}
                    isChoosingPostLocation={this.state.isChoosingPostLocation}
                    isWritingPost={this.state.isWritingPost}
                    onHoverOverPost={this.onHoverOverItem}
                    onUnhoverOverPost={this.onUnhoverOverItem}
                    selectedIndex={this.state.selectedIndex}
                    onSinglePostQuery={this.onSinglePostQuery}
                />);
                onChooseNewContentLocationFn = this.onChoosePostLocation;
                topRightButtonText = this.state.isChoosingPostLocation ? "cancel" : "add post";
                if (this.state.onlyOnePost) {
                    mapCenter = this.state.posts[0].location;
                    mapZoom = 13;
                }
                break;
            case LandingPageMode.Challenges:
                feedComponent = (<ChallengesFeedComponent
                    challenges={this.state.challenges}
                    onRefreshPress={this.onRefreshPress.bind(this)}
                    isChoosingChallengeLocation={this.state.isChoosingChallengeLocation}
                    isWritingChallenge={this.state.isWritingChallenge}
                    onHoverOverChallenge={this.onHoverOverItem}
                    onUnhoverOverChallenge={this.onUnhoverOverItem}
                    selectedIndex={this.state.selectedIndex}
                />);
                onChooseNewContentLocationFn = this.onChooseChallengeLocation;
                topRightButtonText = this.state.isChoosingChallengeLocation ? "cancel" : "add challenge";
                break;
            // case LandingPageMode.Reports:
            //     feedComponent = (<ReportsFeedComponent/>);
            //     break;
            default:
                console.log("didn't recognize mode");
        }

        return (
            <div
                style={[
                    LandingPageComponent.styles.container
                ]}
            >
                <div style={[LandingPageComponent.styles.feedContainer]}>
                    <button
                        onClick={this.onPostsModeClick}
                    >
                        posts
                    </button>
                    <button
                        onClick={this.onChallengesModeClick}
                    >
                        challenges
                    </button>
                    <button
                        onClick={this.onReportsModeClick}
                    >
                        reports
                    </button>
                    {feedComponent}
                </div>
                <div style={[LandingPageComponent.styles.mapContainer]} id={"map-container"}>
                    <MapComponent
                        locations={this.getMapLocations()}
                        onViewportChange={this.onViewportChange.bind(this)}
                        isChoosingNewContentLocation={this.state.isChoosingPostLocation || this.state.isChoosingChallengeLocation}
                        isWritingNewContent={this.state.isWritingPost || this.state.isWritingChallenge}
                        onChooseNewContentLocation={onChooseNewContentLocationFn}
                        selectedIndex={this.state.selectedIndex}
                        onClickMapMarker={this.onClickMapMarker}
                        withCenter={mapCenter}
                        withZoom={mapZoom}
                    />
                </div>
                <div style={[LandingPageComponent.styles.addButton]}>
                    <button
                        onClick={this.onClickAdd}
                    >
                        {topRightButtonText}
                    </button>
                </div>
                <ReactModal
                    isOpen={this.state.isWritingPost}
                    style={ModalStyle}
                    contentLabel="New Post"
                    onRequestClose={this.onCancelWritingContent}>
                    <NewPostModal
                        onSubmit={this.onSubmitNewPost}
                        onCancel={this.onCancelWritingContent}
                        location={this.state.newContentLocation}
                    />
                </ReactModal>
                <ReactModal
                    isOpen={this.state.isWritingChallenge}
                    style={ModalStyle}
                    contentLabel="New Challenge"
                    onRequestClose={this.onCancelWritingContent}>
                    <NewChallengeModal
                        onSubmit={this.onSubmitNewChallenge}
                        onCancel={this.onCancelWritingContent}
                        location={this.state.newContentLocation}
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
    challenges: Challenge[];
    swCorner: GeoPoint;
    neCorner: GeoPoint;
    startTime?: Date;
    endTime?: Date;
    user: string;
    onlyOnePost: boolean;
    isChoosingPostLocation: boolean;
    isWritingPost: boolean;
    newContentLocation?: GeoPoint;
    isChoosingChallengeLocation: boolean;
    isWritingChallenge: boolean;
    newChallengeLocation?: GeoPoint;
    selectedIndex?: number;
    mode: LandingPageMode;
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

enum LandingPageMode {
    Posts = "posts",
    Challenges = "challenges",
    Reports = "reports"
}