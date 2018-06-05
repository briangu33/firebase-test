"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ReactPageRenderMiddleware(req, res, next) {
    next();
}
exports.ReactPageRenderMiddleware = ReactPageRenderMiddleware;
var ReactPage;
(function (ReactPage) {
    ReactPage["Landing"] = "landing";
    ReactPage["Recorder"] = "recorder";
    ReactPage["RecorderView"] = "recorder-view";
    ReactPage["Error"] = "error";
    ReactPage["AutoCompose"] = "auto-compose";
    ReactPage["About"] = "about";
})(ReactPage = exports.ReactPage || (exports.ReactPage = {}));
