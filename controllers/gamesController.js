const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function addGamesGet(req, res) {
    const genresList = await db.getAllGenres();
    const publishersList = await db.getAllPublishers();

    res.render("games", { genres: genresList, publishers: publishersList });
}

const validateTitle = [
    body("title").trim()
        .isLength({ min: 1, max: 255 }).withMessage("Game title is required")
]

addGamesPost = [
    validateTitle,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const genresList = await db.getAllGenres();
            const publishersList = await db.getAllPublishers();

            return res.status(400).render("games", {
                errors: errors.array(),
                genres: genresList,
                publishers: publishersList
            });
        }

        res.redirect("/");
    }
]

module.exports = {
    addGamesGet,
    addGamesPost
}