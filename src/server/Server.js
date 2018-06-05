"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ErrorMiddleware_1 = require("./ErrorMiddleware");
const Env_1 = require("./Env");
const exphbs = require("express-handlebars");
const ApiController_1 = require("./ApiController");
exports.htmlDir = path.join(Env_1.rootPath, "html");
exports.jsDir = path.join(Env_1.rootPath, "dist", "bundle");
exports.resDir = path.join(Env_1.rootPath, "res");
exports.cssDir = path.join(Env_1.rootPath, "css");
const app = express();
const schedule = require("node-schedule");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.set("view engine", "hbs");
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(Env_1.rootPath, "views", "layouts"),
    helpers: {
        str: (context) => {
            return JSON.stringify(context);
        }
    }
}));
app.use(ApiController_1.ApiController);
app.use("/js", express.static(exports.jsDir));
app.use("/res", express.static(exports.resDir));
app.use("/css", express.static(exports.cssDir));
app.use(ErrorMiddleware_1.ErrorMiddleware);
app.listen(Env_1.PORT, async () => {
    console.log(`listening on port ${Env_1.PORT}`);
});
