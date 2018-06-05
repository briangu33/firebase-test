"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool, Client } = require("pg");
const pool = new Pool({
    user: "brian",
    host: "localhost",
    database: "super_awesome_application",
    password: "null",
    port: 5432
});
const client = new Client({
    user: "brian",
    host: "localhost",
    database: "super_awesome_application",
    password: "null",
    port: 5432
});
client.connect();
client.query("SELECT NOW() as now")
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));
class PostgreSQLDataLayer {
    static async getInstance() {
        if (PostgreSQLDataLayer.instancePromise !== null) {
            return PostgreSQLDataLayer.instancePromise;
        }
        const dataLayer = new PostgreSQLDataLayer();
        return PostgreSQLDataLayer.instancePromise;
    }
}
PostgreSQLDataLayer.instancePromise = null;
exports.PostgreSQLDataLayer = PostgreSQLDataLayer;
