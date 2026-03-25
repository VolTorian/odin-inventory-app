const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS publishers (
        publisher_name VARCHAR(255) PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        game_title VARCHAR(255),
        publisher_name VARCHAR(255) REFERENCES publishers(publisher_name),
        year INT
    );

    CREATE TABLE IF NOT EXISTS genres (
        genre_name VARCHAR(255) PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS games_genres (
        game_id INTEGER REFERENCES games(id),
        genre_name VARCHAR(255) REFERENCES genres(genre_name),
        PRIMARY KEY (game_id, genre_name)
    );

    BEGIN;
    INSERT INTO publishers (publisher_name)
    VALUES
        ('Sega');
    
    INSERT INTO publishers (publisher_name)
    VALUES
        ('Nintendo');

    INSERT INTO games (game_title, year, publisher_name)
    VALUES
        ('Sonic the Hedgehog', 1991, 'Sega');

    INSERT INTO games (game_title, year, publisher_name)
    VALUES
        ('Xenoblade Chronicles X', 2015, 'Nintendo');

    INSERT INTO genres (genre_name)
    VALUES
        ('platformer'),
        ('action'),
        ('rpg');
    
    INSERT INTO games_genres (game_id, genre_name)
    VALUES
        ((SELECT id FROM games WHERE game_title = 'Sonic the Hedgehog' AND publisher_name = 'Sega'), 'platformer'),
        ((SELECT id FROM games WHERE game_title = 'Xenoblade Chronicles X' AND publisher_name = 'Nintendo'), 'action'),
        ((SELECT id FROM games WHERE game_title = 'Xenoblade Chronicles X' AND publisher_name = 'Nintendo'), 'rpg');
    COMMIT;
`; //the actual post/get queries may need more work to ensure uniqueness... two indie games both named "Piece by Piece" released within the same week

async function main() {
    console.log("seeding...");
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
    console.log("seeding done");
}

main();