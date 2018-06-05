"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDom = require("react-dom");
const LandingPageComponent_1 = require("../components/pages/LandingPageComponent");
const RecorderPlayerPageComponent_1 = require("../components/pages/RecorderPlayerPageComponent");
const radium_1 = require("radium");
const ErrorPageComponent_1 = require("../components/pages/ErrorPageComponent");
const AutoComposePageComponent_1 = require("../components/pages/AutoComposePageComponent");
const AboutPageComponent_1 = require("../components/pages/AboutPageComponent");
if (initializedState.pageName === "landing") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null,
        React.createElement(LandingPageComponent_1.LandingPageComponent, null)), document.getElementById("app-container"));
}
else if (initializedState.pageName === "recorder") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null,
        React.createElement(RecorderPlayerPageComponent_1.RecorderPlayerPageComponent, null)), document.getElementById("app-container"));
}
else if (initializedState.pageName === "recorder-view") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null,
        React.createElement(RecorderPlayerPageComponent_1.RecorderPlayerPageComponent, null)), document.getElementById("app-container"));
}
else if (initializedState.pageName === "error") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null,
        React.createElement(ErrorPageComponent_1.ErrorPageComponent, null)), document.getElementById("app-container"));
}
else if (initializedState.pageName === "auto-compose") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null,
        React.createElement(AutoComposePageComponent_1.AutoComposePageComponent, null)), document.getElementById("app-container"));
}
else if (initializedState.pageName === "about") {
    ReactDom.render(React.createElement(radium_1.StyleRoot, null,
        React.createElement(AboutPageComponent_1.AboutPageComponent, null)), document.getElementById("app-container"));
}
