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
let ErrorPageComponent = ErrorPageComponent_1 = class ErrorPageComponent extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (React.createElement("div", { style: [
                ErrorPageComponent_1.styles.base
            ] }));
    }
};
ErrorPageComponent.styles = {
    base: {
        width: "100%"
    }
};
ErrorPageComponent = ErrorPageComponent_1 = __decorate([
    Radium
], ErrorPageComponent);
exports.ErrorPageComponent = ErrorPageComponent;
var ErrorPageComponent_1;
