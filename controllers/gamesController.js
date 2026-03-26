const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const validateTitle = [
    body("title").trim()
        .isLength({ min: 0, max: 255 }).withMessage("Game title is required")
]