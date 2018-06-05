"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var ErrorMiddleware_1 = require("./ErrorMiddleware");
var Env_1 = require("./Env");
var exphbs = require("express-handlebars");
var ApiController_1 = require("./ApiController");
exports.htmlDir = path.join(Env_1.rootPath, "html");
exports.jsDir = path.join(Env_1.rootPath, "dist", "bundle");
exports.resDir = path.join(Env_1.rootPath, "res");
exports.cssDir = path.join(Env_1.rootPath, "css");
var app = express();
var schedule = require("node-schedule");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.set("view engine", "hbs");
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(Env_1.rootPath, "views", "layouts"),
    helpers: {
        str: function str(context) {
            return JSON.stringify(context);
        }
    }
}));
app.use(ApiController_1.ApiController);
app.use("/js", express.static(exports.jsDir));
app.use("/res", express.static(exports.resDir));
app.use("/css", express.static(exports.cssDir));
app.use(ErrorMiddleware_1.ErrorMiddleware);
app.listen(Env_1.PORT, async function () {
    console.log("listening on port " + Env_1.PORT);
});