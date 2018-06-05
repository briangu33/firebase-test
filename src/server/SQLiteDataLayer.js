"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require("sqlite3");
const path = require("path");
const Env_1 = require("./Env");
const fs = require("fs");
const exec = require("child_process").exec;
class SQLiteDataLayer {
    constructor() {
        this.makeDirIfNotExists(path.join(Env_1.rootPath, "data"));
        this.makeDirIfNotExists(path.join(Env_1.rootPath, "data", "db"));
        sqlite3.verbose();
        const dbPath = path.join(Env_1.rootPath, "data", "db", "prod_db");
        this.db = new sqlite3.Database(dbPath);
    }
    makeDirIfNotExists(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
    execRunWithPromise(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, (err, result) => {
                return (err ? reject(err) : resolve(result));
            });
        });
    }
    execGetWithPromise(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, result) => {
                return (err ? reject(err) : resolve(result));
            });
        });
    }
    execAllWithPromise(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params, (err, result) => {
                return (err ? reject(err) : resolve(result));
            });
        });
    }
    execCommandWithPromise(command) {
        return new Promise((resolve, reject) => {
            exec(command, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
                if (err) {
                    return reject(err);
                }
                return resolve(stdout);
            });
        });
    }
    createTables() {
        return this.execRunWithPromise("CREATE TABLE IF NOT EXISTS compositions " +
            "(edit_token VARCHAR(100), " +
            "view_token VARCHAR(100), " +
            "name VARCHAR(100), " +
            "youtube_id VARCHAR(100), " +
            "recording_youtube_start DOUBLE, " +
            "recording_youtube_end DOUBLE, " +
            "start_recording_time BIGINT, " +
            "last_edited BIGINT, " +
            "view_count INT, " +
            "pitch_shift INT, " +
            "has_recorded BIT, " +
            "auto_recorded BIT, " +
            "video_duration DOUBLE, " +
            "PRIMARY KEY (edit_token), " +
            "UNIQUE (view_token)) ")
            .then(() => {
            return this.execRunWithPromise("CREATE TABLE IF NOT EXISTS compositions_notes_map " +
                "(composition_edit_token INT, " +
                "note_id INT, " +
                "start INT, " +
                "end INT)");
        })
            .then(() => {
        });
    }
}
SQLiteDataLayer.instancePromise = null;
exports.SQLiteDataLayer = SQLiteDataLayer;
