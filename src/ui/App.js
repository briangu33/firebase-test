"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDom = require("react-dom");
const LandingPageComponent_1 = require("../components/pages/LandingPageComponent");
const radium_1 = require("radium");
ReactDom.render(React.createElement(radium_1.StyleRoot, null,
    React.createElement(LandingPageComponent_1.LandingPageComponent, null)), document.getElementById("app-container"));
