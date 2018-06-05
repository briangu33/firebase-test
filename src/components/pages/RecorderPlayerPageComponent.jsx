"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var axios = require("axios");
var RecorderPlayerPageComponent = /** @class */ (function (_super) {
    __extends(RecorderPlayerPageComponent, _super);
    function RecorderPlayerPageComponent(props) {
        return _super.call(this) || this;
    }
    RecorderPlayerPageComponent.prototype.render = function () {
        return (<div>

            </div>);
    };
    RecorderPlayerPageComponent.styles = {
        base: {
            width: "100vw",
        },
    };
    RecorderPlayerPageComponent = __decorate([
        Radium
    ], RecorderPlayerPageComponent);
    return RecorderPlayerPageComponent;
}(React.Component));
exports.RecorderPlayerPageComponent = RecorderPlayerPageComponent;
