const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games JOIN games_genres ON games.id = games_genres.game_id");

    return rows;
}

async function getAllPublishers() {
    const { rows } = await pool.query("SELECT * FROM publishers");

    return rows;
}

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");

    return rows;
}

async function addGame(title, publisher, year, genres) {
    console.log("in queries adding game")

    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await client.query("INSERT INTO games (game_title, year, publisher_name) VALUES ($1, $2, $3)", [title, year, publisher]);
        for (const genre of genres) {
            await client.query(`INSERT INTO games_genres (game_id, genre_name) VALUES
                ((SELECT id FROM games WHERE game_title = ($1) AND publisher_name = ($2)), ($3))`,
                [title, publisher, genre]);
        }
        await client.query("COMMIT");
    }
    catch (e) {
        await client.query("ROLLBACK");
        console.log(`Error in transaction for adding game!`)
        throw e;
    }
    finally {
        client.release();
    }
    
}

async function addPublisher(publisherName) {
    await pool.query("INSERT INTO publishers (publisher_name) VALUES ($1)", [publisherName]);
}

async function addGenre(genreName) {
    await pool.query("INSERT INTO genres (genre_name) VALUES ($1)", [genreName]);
}

module.exports = {
    getAllGames,
    getAllPublishers,
    getAllGenres,
    addGame,
    addPublisher,
    addGenre
};