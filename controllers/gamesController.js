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

const validateChosenPublisher = [
    body("chosenPublisher").custom(async (publisher) => {
        const publishersList = await db.getAllPublishers();

        if (!publishersList.map(item => item.publisher_name).includes(publisher)) {
            throw new Error("Publisher not found. Please add it first"); //normal users shouldn't reach here..?
        }
        else {
            console.log("valid existing publisher selected")
        }
    })
]

const validateYear = [
    body("yearReleased").isInt({ min: 1958, max: 2099 })
        .withMessage("Please enter a valid release year")
]

const validateChosenGenres = [
    body("chosenGenres").custom(async (chosenGenres) => {
        const genresList = (await db.getAllGenres()).map(item => item.genre_name);

        if (!Array.isArray(chosenGenres)) {
            chosenGenres = [chosenGenres];
        }

        if (!chosenGenres.every((genre) => genresList.includes(genre))) {
            throw new Error("Genre not found. Please add it first"); //normal users shouldn't reach here..?
        }
        else {
            console.log("all selected genres valid");
        }
    })
]

addGamesPost = [
    validateTitle,
    validateChosenPublisher,
    validateYear,
    validateChosenGenres,
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

        const { title, chosenPublisher, yearReleased, chosenGenres} = matchedData(req);
        try {
            if (!Array.isArray(chosenGenres)) {
                await db.addGame(title, chosenPublisher, yearReleased, [chosenGenres]);
            }
            else {
                await db.addGame(title, chosenPublisher, yearReleased, chosenGenres);
            }
        }
        catch (queryError) {
            console.log("Error adding game")
            console.log(queryError)
        }

        res.redirect("/");
    }
]

module.exports = {
    addGamesGet,
    addGamesPost
}