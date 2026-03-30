const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function genresListGet(req, res) {
    const genresInfo = await db.getAllGenres();

    res.render("genres", { genres: genresInfo });
}

const validateGenreName = [
    body("newGenre").trim()
        .isLength({ min: 1, max: 255 }).withMessage("Genre name is required")
];

addGenresPost = [
    validateGenreName,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("genres", {
                errors: errors.array(),
                genres: await db.getAllGenres()
            });
        }
        
        const { newGenre } = matchedData(req);
        try {
            await db.addGenre(newGenre);
        }
        catch (queryError) {
            if (queryError.code == 23505) {
                return res.status(400).render("genres", {
                    errors: [{ msg: "Genre already exists"}],
                    genres: await db.getAllGenres()
                });
            }
            else {
                console.log("wot error wuh happened")
            }
        }

        res.redirect("/genres");
    }
]

module.exports = {
    genresListGet,
    addGenresPost
}