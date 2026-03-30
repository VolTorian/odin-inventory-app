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
    addPublisher,
    addGenre
};