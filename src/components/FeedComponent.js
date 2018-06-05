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
let FeedComponent = class FeedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newContent: ""
        };
    }
    onContentChange(event) {
        this.setState({
            newContent: event.target.value
        });
    }
    onContentSubmit() {
        this.props.onPostSubmit(this.state.newContent);
    }
    onRefreshPress() {
        this.props.onRefreshPress();
    }
    render() {
        let rows = this.props.posts.map((post, rowIndex) => {
            return (React.createElement("div", { key: rowIndex, style: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    height: 40,
                    borderWidth: 3,
                } },
                rowIndex,
                post.content));
        });
        return (React.createElement("div", null,
            rows,
            React.createElement("div", null,
                React.createElement("input", { ref: "newPostContent", type: "text", value: this.state.newContent, onChange: this.onContentChange.bind(this) }),
                React.createElement("input", { type: "button", value: "submit", onClick: this.onContentSubmit.bind(this) }),
                React.createElement("input", { type: "button", value: "refresh", onClick: this.onRefreshPress.bind(this) }))));
    }
};
FeedComponent = __decorate([
    Radium
], FeedComponent);
exports.FeedComponent = FeedComponent;
