const { Pool } = require("pg");

if (process.env.NODE_ENV === "DEV") {
    module.exports = new Pool({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PSQL_PORT
    });
}
else if (process.env.NODE_ENV === "PROD") {
    module.exports = new Pool({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    });
}
else {
    console.log("what node_env???")
}
