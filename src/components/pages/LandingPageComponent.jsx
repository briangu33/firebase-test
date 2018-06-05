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
var LandingPageComponent = /** @class */ (function (_super) {
    __extends(LandingPageComponent, _super);
    function LandingPageComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LandingPageComponent.prototype.render = function () {
        var cells = [["1", "two", "three"], ["four", "5", "six"], ["seven", "eight", "9"]];
        var rows = cells.map(function (row, rowIndex) {
            var cellsList = row.map(function (cell, colIndex) {
                return (<div key={colIndex} style={{}}>
                        <p>{cell}</p>
                    </div>);
            });
            return (<div key={rowIndex} style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
            }}>
                    {cellsList}
                </div>);
        });
        return (<div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
        }}>
                {rows}
            </div>);
    };
    LandingPageComponent.styles = {
        base: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
        title: {
            fontSize: "4em",
        },
        subtitle: {
            fontSize: "1.5em",
        },
        composeButton: {
            padding: "10px 5px 10px 5px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            cursor: "pointer",
            transition: "200ms",
            fontSize: "1.2em",
            opacity: 0.8,
            marginRight: "20px",
            ":hover": {
                fontWeight: "bold"
            },
        },
        advancedEditorButton: {
            padding: "10px 5px 10px 5px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2em",
            opacity: 0.8,
            ":hover": {
                fontWeight: "bold"
            },
        },
        stanfordButton: {
            padding: "10px 5px 10px 5px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            cursor: "auto",
            fontSize: "1.2em",
            opacity: 0.8,
            ":hover": {
                fontWeight: "bold"
            },
        },
    };
    LandingPageComponent = __decorate([
        Radium
    ], LandingPageComponent);
    return LandingPageComponent;
}(React.Component));
exports.LandingPageComponent = LandingPageComponent;
