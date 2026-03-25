const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query("SELECT * FROM games");
    console.log("temporary games query");
    return rows;
}

module.exports = {
    getAllGames
};