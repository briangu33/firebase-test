"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ReactPageRenderMiddleware_1 = require("./ReactPageRenderMiddleware");
exports.ApiController = express.Router();
// const dataStore = new InMemoryDataLayer();
function returnJson(res, promise) {
    promise.then(function (data) {
        return res.json(data);
    }).catch(function (err) {
        res.status(500);
        res.json(err);
        console.log(err);
    });
}
exports.ApiController.get("/", function (req, res) {
    res.render("index", {
        pageName: ReactPageRenderMiddleware_1.ReactPage.Landing
    });
});