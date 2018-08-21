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
const tzjs_1 = require("tzjs");
const PostTableCell_1 = require("./PostTableCell");
let FeedComponent = class FeedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onStartTimeChange = (e) => {
            this.onTimeChange("startTime", e.target.value);
        };
        this.onEndTimeChange = (e) => {
            this.onTimeChange("endTime", e.target.value);
        };
        this.state = {
            newContent: "",
            startTime: new Date("2018-08-01T04:00:00Z"),
            endTime: new Date()
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
    onTimeChange(key, localTime) {
        const easternIso = new Date(localTime + ":00Z");
        const offset = tzjs_1.getOffset("America/New_York", easternIso);
        const date = new Date(easternIso.getTime() + offset * 60 * 1000);
        const obj = {};
        obj[key] = date;
        this.setState(obj, () => {
            this.props.onTimeWindowChange(this.state.startTime, this.state.endTime);
        });
    }
    render() {
        let rows = this.props.posts.map((post, rowIndex) => {
            return (React.createElement(PostTableCell_1.PostTableCell, { post: post, key: rowIndex }));
        });
        return (React.createElement("div", { style: {
                display: "block"
            } },
            rows,
            React.createElement("div", null,
                React.createElement("input", { ref: "newPostContent", type: "text", value: this.state.newContent, onChange: this.onContentChange.bind(this) }),
                React.createElement("input", { type: "button", value: "submit", onClick: this.onContentSubmit.bind(this) }),
                React.createElement("input", { type: "button", value: "refresh", onClick: this.onRefreshPress.bind(this) })),
            React.createElement("div", null,
                React.createElement("input", { type: "datetime-local", value: toLocalTimeEastern(this.state.startTime), min: new Date("August 1, 2018 00:00:00").toISOString(), max: new Date().toISOString(), onChange: this.onStartTimeChange }),
                React.createElement("input", { type: "datetime-local", value: toLocalTimeEastern(this.state.endTime), min: new Date("August 1, 2018 00:00:00").toISOString(), max: new Date().toISOString(), onChange: this.onEndTimeChange }))));
    }
};
FeedComponent = __decorate([
    Radium
], FeedComponent);
exports.FeedComponent = FeedComponent;
/**
 * eg. toLocalTimeEastern(new Date("2020-01-01T04:00:00Z")) returns "2020-01-01T00:00"
 */
function toLocalTimeEastern(date) {
    const offset = tzjs_1.getOffset("America/New_York", date);
    const easternIso = new Date(date.getTime() - offset * 60 * 1000).toISOString();
    return easternIso.substring(0, 16);
}
