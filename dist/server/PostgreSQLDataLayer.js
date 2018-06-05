"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var _require = require("pg"),
    Pool = _require.Pool,
    Client = _require.Client;

var pool = new Pool({
    user: "brian",
    host: "localhost",
    database: "super_awesome_application",
    password: "null",
    port: 5432
});
var client = new Client({
    user: "brian",
    host: "localhost",
    database: "super_awesome_application",
    password: "null",
    port: 5432
});
client.connect();
client.query("SELECT NOW() as now").then(function (res) {
    return console.log(res.rows[0]);
}).catch(function (e) {
    return console.error(e.stack);
});

var PostgreSQLDataLayer = function () {
    function PostgreSQLDataLayer() {
        _classCallCheck(this, PostgreSQLDataLayer);
    }

    _createClass(PostgreSQLDataLayer, null, [{
        key: "getInstance",
        value: async function getInstance() {
            if (PostgreSQLDataLayer.instancePromise !== null) {
                return PostgreSQLDataLayer.instancePromise;
            }
            var dataLayer = new PostgreSQLDataLayer();
            return PostgreSQLDataLayer.instancePromise;
        }
    }]);

    return PostgreSQLDataLayer;
}();

PostgreSQLDataLayer.instancePromise = null;
exports.PostgreSQLDataLayer = PostgreSQLDataLayer;