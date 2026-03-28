const db = require("../db/queries");

async function genresListGet(req, res) {
    const genresInfo = await db.getAllGenres();

    res.render("genres", { genres: genresInfo });
}

module.exports = {
    genresListGet
}