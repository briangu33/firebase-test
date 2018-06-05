"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require("sqlite3");
var path = require("path");
var Env_1 = require("./Env");
var fs = require("fs");
var exec = require("child_process").exec;

var SQLiteDataLayer = function () {
    function SQLiteDataLayer() {
        _classCallCheck(this, SQLiteDataLayer);

        this.makeDirIfNotExists(path.join(Env_1.rootPath, "data"));
        this.makeDirIfNotExists(path.join(Env_1.rootPath, "data", "db"));
        sqlite3.verbose();
        var dbPath = path.join(Env_1.rootPath, "data", "db", "prod_db");
        this.db = new sqlite3.Database(dbPath);
    }

    _createClass(SQLiteDataLayer, [{
        key: "makeDirIfNotExists",
        value: function makeDirIfNotExists(path) {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
        }
    }, {
        key: "execRunWithPromise",
        value: function execRunWithPromise(query) {
            var _this = this;

            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            return new Promise(function (resolve, reject) {
                _this.db.run(query, params, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }, {
        key: "execGetWithPromise",
        value: function execGetWithPromise(query) {
            var _this2 = this;

            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            return new Promise(function (resolve, reject) {
                _this2.db.get(query, params, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }, {
        key: "execAllWithPromise",
        value: function execAllWithPromise(query) {
            var _this3 = this;

            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            return new Promise(function (resolve, reject) {
                _this3.db.all(query, params, function (err, result) {
                    return err ? reject(err) : resolve(result);
                });
            });
        }
    }, {
        key: "execCommandWithPromise",
        value: function execCommandWithPromise(command) {
            return new Promise(function (resolve, reject) {
                exec(command, { maxBuffer: 1024 * 1024 }, function (err, stdout, stderr) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(stdout);
                });
            });
        }
    }, {
        key: "createTables",
        value: function createTables() {
            var _this4 = this;

            return this.execRunWithPromise("CREATE TABLE IF NOT EXISTS compositions " + "(edit_token VARCHAR(100), " + "view_token VARCHAR(100), " + "name VARCHAR(100), " + "youtube_id VARCHAR(100), " + "recording_youtube_start DOUBLE, " + "recording_youtube_end DOUBLE, " + "start_recording_time BIGINT, " + "last_edited BIGINT, " + "view_count INT, " + "pitch_shift INT, " + "has_recorded BIT, " + "auto_recorded BIT, " + "video_duration DOUBLE, " + "PRIMARY KEY (edit_token), " + "UNIQUE (view_token)) ").then(function () {
                return _this4.execRunWithPromise("CREATE TABLE IF NOT EXISTS compositions_notes_map " + "(composition_edit_token INT, " + "note_id INT, " + "start INT, " + "end INT)");
            }).then(function () {});
        }
    }]);

    return SQLiteDataLayer;
}();

SQLiteDataLayer.instancePromise = null;
exports.SQLiteDataLayer = SQLiteDataLayer;