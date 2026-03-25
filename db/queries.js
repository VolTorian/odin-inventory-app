const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games JOIN games_genres ON games.id = games_genres.game_id");

    return rows;
}

module.exports = {
    getAllGames
};