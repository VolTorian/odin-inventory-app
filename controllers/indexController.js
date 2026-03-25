const db = require("../db/queries");

async function gamesListGet(req, res) {
    const gamesInfo = await db.getAllGames();
    // console.log(gamesInfo);
    res.send(gamesInfo.map((game) => {
        return Object.values(game).join(", ");
    }).join("; "));
}

module.exports = {
    gamesListGet
}