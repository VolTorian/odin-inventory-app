const db = require("../db/queries");

async function gamesListGet(req, res) {
    const gamesInfo = await db.getAllGames();
    const processedInfo = new Map();

    gamesInfo.forEach((game) => {
        if (processedInfo.has(game.id)) {
            processedInfo.get(game.id).genres.push(game.genre_name);
        }
        else {
            processedInfo.set(game.id, new Object({
                game_title: game.game_title,
                publisher_name: game.publisher_name,
                year: game.year,
                genres: [game.genre_name]
            }));
        }
    });
    // console.log(processedInfo);

    res.render("index", { games: processedInfo });
}

module.exports = {
    gamesListGet
}