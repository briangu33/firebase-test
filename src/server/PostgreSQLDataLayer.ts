const {Pool, Client} = require("pg");

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

export class PostgreSQLDataLayer {

    private static instancePromise: Promise<PostgreSQLDataLayer> = null;

    public static async getInstance(): Promise<PostgreSQLDataLayer> {
        if (PostgreSQLDataLayer.instancePromise !== null) {
            return PostgreSQLDataLayer.instancePromise;
        }

        const dataLayer = new PostgreSQLDataLayer();


        return PostgreSQLDataLayer.instancePromise;
    }

}