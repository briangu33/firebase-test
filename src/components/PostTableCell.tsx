import * as React from "react";
import * as Radium from "radium";
import {Post} from "../models/Post";
import * as moment from "moment";
import {db} from "./pages/LandingPageComponent";

@Radium
export class PostTableCell extends React.Component<IPostTableCellProps, IPostTableCellState> {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            upvotes: 0,
            downvotes: 0,
            comments: 0
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

    private onHoverStart = () => {
        this.setState({
            selected: true,
        });
    }

    private onHoverEnd = () => {
        this.setState({
            selected: false,
        });
    }

    public render() {
        let timeAgo = moment(this.props.post.timestamp.toMillis()).fromNow();

        return (
            <div
                onMouseEnter={this.onHoverStart}
                onMouseLeave={this.onHoverEnd}
                style={[PostTableCell.styles.container, { backgroundColor: this.state.selected ? "#bbbbbb" : "#ffffff" }]}
            >
                <div style={[PostTableCell.styles.topBar]}>
                    <div>
                        {"document ID: " + this.props.post.documentID}
                    </div>
                    <div>
                        {"author: " + this.props.post.user + " (" + this.props.post.visibleUsername + ")"}
                    </div>
                </div>
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
        contentContainer: {
            marginBottom: "10px"
        }
    };
}

export interface IPostTableCellProps {
    post: Post;
    key: number;
}

export interface IPostTableCellState {
    selected: boolean;
    upvotes: number;
    downvotes: number;
    comments: number;
}

