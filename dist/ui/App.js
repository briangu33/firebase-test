"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var LandingPageComponent_1 = require("../components/pages/LandingPageComponent");
var radium_1 = require("radium");
ReactDom.render(React.createElement(radium_1.StyleRoot, null, React.createElement(LandingPageComponent_1.LandingPageComponent, null)), document.getElementById("app-container"));