import * as React from "react";
import * as Radium from "radium";
import {Post} from "../models/Post";
import {getOffset} from "tzjs";
import {ChangeEvent} from "react";
import {PostTableCell} from "./PostTableCell";
import {db} from "./pages/LandingPageComponent";

@Radium
export class FeedComponent extends React.Component<IFeedComponentProps, IFeedComponentState> {
    constructor(props) {
        super(props);

        this.state = {
            startTime: new Date("2018-08-01T04:00:00Z"),
            endTime: new Date("2025-08-01T04:00:00Z")
        };
    }

    private onRefreshPress() {
        this.props.onRefreshPress();
    }

    private onStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.onTimeChange("startTime", e.target.value);
    };

    private onEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.onTimeChange("endTime", e.target.value);
    };

    private onTimeChange(key: "startTime" | "endTime", localTime: string) {
        const easternIso = new Date(localTime + ":00Z");
        const offset = getOffset("America/New_York", easternIso);
        const date = new Date(easternIso.getTime() + offset * 60 * 1000);

        const obj = {};
        obj[key] = date;
        this.setState(obj, () => {
            this.props.onTimeWindowChange(this.state.startTime, this.state.endTime);
        });
    }

    private onDeletePost = (postID: string) => {
        // delete upvotes, downvotes, comment upvotes, comment downvotes, comments, post (firebase offers no way to do this at all levels)

        console.log("delet this: ", postID);
        db.collection("posts").doc(postID).collection("upvotes").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let id = doc.data().documentID;
                    db.collection("posts").doc(postID).collection("upvotes").doc(id).delete();
                });
            });
        db.collection("posts").doc(postID).collection("downvotes").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let id = doc.data().documentID;
                    db.collection("posts").doc(postID).collection("downvotes").doc(id).delete();
                });
            });
        db.collection("posts").doc(postID).collection("comments").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let id = doc.data().documentID;
                    db.collection("posts").doc(postID).collection("comments").doc(id).collection("upvotes").get()
                        .then((querySnapshot2) => {
                            querySnapshot.forEach((doc2) => {
                                let id2 = doc2.data().documentID;
                                db.collection("posts").doc(postID).collection("comments").doc(id).collection("upvotes").doc(id2).delete();
                            });
                        });
                    db.collection("posts").doc(postID).collection("comments").doc(id).collection("downvotes").get()
                        .then((querySnapshot2) => {
                            querySnapshot.forEach((doc2) => {
                                let id2 = doc2.data().documentID;
                                db.collection("posts").doc(postID).collection("comments").doc(id).collection("downvotes").doc(id2).delete();
                            });
                        });
                    db.collection("posts").doc(postID).collection("comments").doc(id).delete();
                });
            });
        db.collection("posts").doc(postID).delete().then(() => {
            console.log("successfully deleted post");
            this.onRefreshPress();
        });
    };

    private onUpvotePost = (postID: string) => {
        console.log("upvot this: ", postID);
        let newUpvoteRef = db.collection("posts").doc(postID).collection("upvotes").doc();
        newUpvoteRef.set({
            documentID: newUpvoteRef.id,
            user: "wya-test-" + newUpvoteRef.id
        })
            .then((docRef) => {
                console.log("upvoted");
            });
    };

    private onDownvotePost = (postID: string) => {
        console.log("downvot this: ", postID);
        let newUpvoteRef = db.collection("posts").doc(postID).collection("downvotes").doc();
        newUpvoteRef.set({
            documentID: newUpvoteRef.id,
            user: "wya-test-" + newUpvoteRef.id
        })
            .then((docRef) => {
                console.log("upvoted");
            });
    };

    public render() {
        let rows = this.props.posts.map((post: Post, rowIndex: number) => {
            return (
                <PostTableCell
                    post={post}
                    key={rowIndex}
                    index={rowIndex}
                    onDeletePost={this.onDeletePost}
                    onUpvotePost={this.onUpvotePost}
                    onDownvotePost={this.onDownvotePost}
                    onHover={this.props.onHoverOverPost}
                    onUnhover={this.props.onUnhoverOverPost}
                />
            );
        });

        return (
            <div
                style={{
                    display: "block"
                }}
            >
                {rows}
                <div>
                    <input
                        type="datetime-local"
                        value={toLocalTimeEastern(this.state.startTime)}
                        min={new Date("August 1, 2018 00:00:00").toISOString()}
                        max={new Date("2025-08-01T04:00:00Z").toISOString()}
                        onChange={this.onStartTimeChange}
                    />
                    <input
                        type="datetime-local"
                        value={toLocalTimeEastern(this.state.endTime)}
                        min={new Date("August 1, 2018 00:00:00").toISOString()}
                        max={new Date("2025-08-01T04:00:00Z").toISOString()}
                        onChange={this.onEndTimeChange}
                    />
                    <input
                        type="button"
                        value="refresh"
                        onClick={this.onRefreshPress.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

/**
 * eg. toLocalTimeEastern(new Date("2020-01-01T04:00:00Z")) returns "2020-01-01T00:00"
 */
function toLocalTimeEastern(date: Date): string {
    const offset = getOffset("America/New_York", date);
    const easternIso = new Date(date.getTime() - offset * 60 * 1000).toISOString();
    return easternIso.substring(0, 16);
}

function randomString(length = 20): string {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export interface IFeedComponentProps {
    posts: Post[];
    onRefreshPress: () => void;
    onTimeWindowChange: (startTime: Date, endTime: Date) => void;
    isChoosingPostLocation: boolean;
    isWritingPost: boolean;
    onHoverOverPost: (index: number) => void;
    onUnhoverOverPost: (index: number) => void;
}

export interface IFeedComponentState {
    startTime: Date;
    endTime: Date;
}