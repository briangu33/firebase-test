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
    ReactDom.render(<radium_1.StyleRoot>
            <LandingPageComponent_1.LandingPageComponent />
        </radium_1.StyleRoot>, document.getElementById("app-container"));
}
else if (initializedState.pageName === "recorder") {
    ReactDom.render(<radium_1.StyleRoot>
            <RecorderPlayerPageComponent_1.RecorderPlayerPageComponent />
        </radium_1.StyleRoot>, document.getElementById("app-container"));
}
else if (initializedState.pageName === "recorder-view") {
    ReactDom.render(<radium_1.StyleRoot>
            <RecorderPlayerPageComponent_1.RecorderPlayerPageComponent />
        </radium_1.StyleRoot>, document.getElementById("app-container"));
}
else if (initializedState.pageName === "error") {
    ReactDom.render(<radium_1.StyleRoot>
            <ErrorPageComponent_1.ErrorPageComponent />
        </radium_1.StyleRoot>, document.getElementById("app-container"));
}
else if (initializedState.pageName === "auto-compose") {
    ReactDom.render(<radium_1.StyleRoot>
            <AutoComposePageComponent_1.AutoComposePageComponent />
        </radium_1.StyleRoot>, document.getElementById("app-container"));
}
else if (initializedState.pageName === "about") {
    ReactDom.render(<radium_1.StyleRoot>
            <AboutPageComponent_1.AboutPageComponent />
        </radium_1.StyleRoot>, document.getElementById("app-container"));
}
