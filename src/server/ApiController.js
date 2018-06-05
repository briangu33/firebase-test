"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ReactPageRenderMiddleware_1 = require("./ReactPageRenderMiddleware");
exports.ApiController = express.Router();
// const dataStore = new InMemoryDataLayer();
function returnJson(res, promise) {
    promise
        .then(data => res.json(data))
        .catch(err => {
        res.status(500);
        res.json(err);
        console.log(err);
    });
}
exports.ApiController.get("/", (req, res) => {
    res.render("index", {
        pageName: ReactPageRenderMiddleware_1.ReactPage.Landing
    });
});
