"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.DEBUG_PORT = 4000;
exports.PROD_PORT = 80;
exports.IS_PROD = process.env.NODE_ENV === "production";
exports.PORT = exports.IS_PROD ? exports.PROD_PORT : exports.DEBUG_PORT;
exports.rootPath = path.join(__dirname, "../../");
