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
const moment = require("moment");
const LandingPageComponent_1 = require("./pages/LandingPageComponent");
let PostTableCell = PostTableCell_1 = class PostTableCell extends React.Component {
    constructor(props) {
        super(props);
        this.onHoverStart = () => {
            this.setState({
                selected: true,
            });
        };
        this.onHoverEnd = () => {
            this.setState({
                selected: false,
            });
        };
        this.state = {
            selected: false,
            upvotes: 0,
            downvotes: 0,
            comments: 0
        };
        LandingPageComponent_1.db.collection("posts").doc(this.props.post.documentID).collection("upvotes")
            .onSnapshot((querySnapshot) => {
            this.setState({ upvotes: querySnapshot.size });
        });
        LandingPageComponent_1.db.collection("posts").doc(this.props.post.documentID).collection("downvotes")
            .onSnapshot((querySnapshot) => {
            this.setState({ downvotes: querySnapshot.size });
        });
        LandingPageComponent_1.db.collection("posts").doc(this.props.post.documentID).collection("comments")
            .onSnapshot((querySnapshot) => {
            this.setState({ comments: querySnapshot.size });
        });
    }
    render() {
        let timeAgo = moment(this.props.post.timestamp.toMillis()).fromNow();
        return (React.createElement("div", { onMouseEnter: this.onHoverStart, onMouseLeave: this.onHoverEnd, style: [PostTableCell_1.styles.container, { backgroundColor: this.state.selected ? "#bbbbbb" : "#ffffff" }] },
            React.createElement("div", { style: [PostTableCell_1.styles.topBar] },
                React.createElement("div", null, "document ID: " + this.props.post.documentID),
                React.createElement("div", null, "author: " + this.props.post.user + " (" + this.props.post.visibleUsername + ")")),
            React.createElement("div", { style: [PostTableCell_1.styles.contentContainer] }, this.props.post.contentText),
            React.createElement("div", null, "score: " + (this.state.upvotes - this.state.downvotes).toString()),
            React.createElement("div", null, "comments: " + this.state.comments.toString()),
            React.createElement("div", null, this.props.post.timestamp.toDate().toString() + " (" + timeAgo + ")")));
    }
};
PostTableCell.styles = {
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
PostTableCell = PostTableCell_1 = __decorate([
    Radium
], PostTableCell);
exports.PostTableCell = PostTableCell;
var PostTableCell_1;
