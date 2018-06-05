import {IDataLayer} from "./IDataLayer";
import * as sqlite3 from "sqlite3";
import {RunResult} from "sqlite3";
import * as path from "path";
import {rootPath} from "./Env";
import * as fs from "fs";

const exec = require("child_process").exec;

export class SQLiteDataLayer implements IDataLayer {
    private static instancePromise: Promise<SQLiteDataLayer> = null;
    private db: sqlite3.Database;

    private constructor() {
        this.makeDirIfNotExists(path.join(rootPath, "data"));
        this.makeDirIfNotExists(path.join(rootPath, "data", "db"));
        sqlite3.verbose();
        const dbPath = path.join(rootPath, "data", "db", "prod_db");
        this.db = new sqlite3.Database(dbPath);
    }

    private makeDirIfNotExists(path: string) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }

    private execRunWithPromise(query: string, params: any[] = []): Promise<RunResult> {
        return new Promise<RunResult>((resolve, reject) => {
            this.db.run(query, params, (err, result) => {
                return (err ? reject(err) : resolve(result));
            });
        });
    }

    private execGetWithPromise(query: string, params: any[] = []): Promise<RunResult> {
        return new Promise<RunResult>((resolve, reject) => {
            this.db.get(query, params, (err, result) => {
                return (err ? reject(err) : resolve(result));
            });
        });
    }

    private execAllWithPromise(query: string, params: any[] = []): Promise<RunResult[]> {
        return new Promise<RunResult[]>((resolve, reject) => {
            this.db.all(query, params, (err, result) => {
                return (err ? reject(err) : resolve(result));
            });
        });
    }

    private execCommandWithPromise(command: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            exec(command, {maxBuffer: 1024 * 1024}, (err, stdout, stderr) => {
                if (err) {
                    return reject(err);
                }
                return resolve(stdout);
            });
        });
    }

    public createTables(): Promise<void> {
        return this.execRunWithPromise(
            "CREATE TABLE IF NOT EXISTS compositions " +
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
                return this.execRunWithPromise(
                    "CREATE TABLE IF NOT EXISTS compositions_notes_map " +
                    "(composition_edit_token INT, " +
                    "note_id INT, " +
                    "start INT, " +
                    "end INT)");
            })
            .then(() => {
            });
    }
}
