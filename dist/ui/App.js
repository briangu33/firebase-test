"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var LandingPageComponent_1 = require("../components/pages/LandingPageComponent");
var RecorderPlayerPageComponent_1 = require("../components/pages/RecorderPlayerPageComponent");
var radium_1 = require("radium");
var ErrorPageComponent_1 = require("../components/pages/ErrorPageComponent");
var AutoComposePageComponent_1 = require("../components/pages/AutoComposePageComponent");
var AboutPageComponent_1 = require("../components/pages/AboutPageComponent");
if (initializedState.pageName === "landing") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null, React.createElement(LandingPageComponent_1.LandingPageComponent, null)), document.getElementById("app-container"));
} else if (initializedState.pageName === "recorder") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null, React.createElement(RecorderPlayerPageComponent_1.RecorderPlayerPageComponent, null)), document.getElementById("app-container"));
} else if (initializedState.pageName === "recorder-view") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null, React.createElement(RecorderPlayerPageComponent_1.RecorderPlayerPageComponent, null)), document.getElementById("app-container"));
} else if (initializedState.pageName === "error") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null, React.createElement(ErrorPageComponent_1.ErrorPageComponent, null)), document.getElementById("app-container"));
} else if (initializedState.pageName === "auto-compose") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null, React.createElement(AutoComposePageComponent_1.AutoComposePageComponent, null)), document.getElementById("app-container"));
} else if (initializedState.pageName === "about") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null, React.createElement(AboutPageComponent_1.AboutPageComponent, null)), document.getElementById("app-container"));
}