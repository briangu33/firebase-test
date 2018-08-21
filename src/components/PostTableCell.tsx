import * as React from "react";
import * as Radium from "radium";
import {Post} from "../models/Post";
import * as moment from "moment";
import {db} from "./pages/LandingPageComponent";

@Radium
export class PostTableCell extends React.Component<IPostTableCellProps, IPostTableCellState> {

    private _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            upvotes: 0,
            downvotes: 0,
            comments: 0,
        };

        db.collection("posts").doc(this.props.post.documentID).collection("upvotes")
            .onSnapshot((querySnapshot) => {
                this.setState({ upvotes: querySnapshot.size });
            });

        db.collection("posts").doc(this.props.post.documentID).collection("downvotes")
            .onSnapshot((querySnapshot) => {
                this.setState({ downvotes: querySnapshot.size });
            });

        db.collection("posts").doc(this.props.post.documentID).collection("comments")
            .onSnapshot((querySnapshot) => {
                this.setState({ comments: querySnapshot.size });
            });
    }

    public componentDidMount() {
        this._isMounted = true;
    }

    public componentWillUnmount() {
        this._isMounted = false;
    }

    private onHoverStart = () => {
        if (this._isMounted) {
            this.props.onHover(this.props.index);
        }
    }

    private onHoverEnd = () => {
        if (this._isMounted) {
            this.props.onUnhover(this.props.index);
        }
    }

    private onDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            this.props.onDeletePost(this.props.post.documentID as string);
        }
    }

    private onUpvoteClick = () => {
        this.props.onUpvotePost(this.props.post.documentID as string);
    }

    private onDownvoteClick = () => {
        this.props.onDownvotePost(this.props.post.documentID as string);
    }

    public render() {
        let timeAgo = moment(this.props.post.timestamp.toMillis()).fromNow();

        return (
            <div
                onMouseEnter={this.onHoverStart}
                onMouseLeave={this.onHoverEnd}
                style={[PostTableCell.styles.container, { backgroundColor: this.props.isSelected ? "#cccccc" : "#ffffff" }]}
            >
                <div style={[PostTableCell.styles.topBar]}>
                    <div>
                        {"document ID: " + this.props.post.documentID}
                    </div>
                    <div>
                        {"author: " + this.props.post.visibleUsername + " (" + this.props.post.user + ")"}
                    </div>
                </div>
                <div style={[PostTableCell.styles.contentAndButtonsContainer]}>
                    <div style={[PostTableCell.styles.contentAndMetadataContainer]}>
                        <div style={[PostTableCell.styles.contentContainer]}>
                            {this.props.post.contentText}
                        </div>
                        <div>
                            {"score: " + (this.state.upvotes - this.state.downvotes).toString()}
                        </div>
                        <div>
                            {"comments: " + this.state.comments.toString()}
                        </div>
                        <div>
                            {this.props.post.timestamp.toDate().toString() + " (" + timeAgo + ")"}
                        </div>
                    </div>
                    <div style={[PostTableCell.styles.buttonsContainer]}>
                        <button
                            onClick={this.onDeleteClick}
                        >
                            {"delete"}
                        </button>
                        <button
                            onClick={this.onUpvoteClick}
                        >
                            {"upvote"}
                        </button>
                        <button
                            onClick={this.onDownvoteClick}
                        >
                            {"downvote"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private static styles = {
        container: {
            display: "flex",
            padding: "10px",
            flexDirection: "column",
            borderWidth: 2,
            borderBottomStyle: "solid",
            borderColor: "#22bbff",
            width: "100%",
            backgroundColor: "#ffffff"
        },
        topBar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomStyle: "solid",
            borderColor: "#999999",
            borderWidth: 1,
            marginBottom: "10px"
        },
        contentAndButtonsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        buttonsContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginLeft: "10px"
        },
        contentAndMetadataContainer: {
            borderRightStyle: "solid",
            borderColor: "#999999",
            borderWidth: 1,
            paddingRight: "10px"
        },
        contentContainer: {
            marginBottom: "10px"
        }
    };
}

export interface IPostTableCellProps {
    post: Post;
    index: number;
    onDeletePost: (postID: string) => void;
    onUpvotePost: (postID: string) => void;
    onDownvotePost: (postID: string) => void;
    onHover: (index: number) => void;
    onUnhover: (index: number) => void;
    isSelected: boolean;
}

export interface IPostTableCellState {
    upvotes: number;
    downvotes: number;
    comments: number;
}

