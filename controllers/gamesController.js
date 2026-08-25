const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

async function addGamesGet(req, res) {
    res.render("games");
}

const validateTitle = [
    body("title").trim()
        .isLength({ min: 1, max: 255 }).withMessage("Game title is required")
]

module.exports = {
    addGamesGet
}