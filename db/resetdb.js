const { Client } = require("pg");

const SQL = `
    DROP TABLE games_developers;
    DROP TABLE games_genres;
    DROP TABLE developers;
    DROP TABLE genres;
    DROP TABLE games;
`;

async function main() {
    console.log("dropping tables...");
    let connectionString;
    if (process.env.NODE_ENV === "DEV") {
        console.log("development environment");
        connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PSQL_PORT}/${process.env.DATABASE}`;
    }
    else if (process.env.NODE_ENV === "PROD") {
        console.log("production environment");
        connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
    }
    else {
        console.log("what the funk environment??");
    }
    const client = new Client({
        connectionString: connectionString,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();