const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

async function publishersListGet(req, res) {
    const publishersInfo = await db.getAllPublishers();

    res.render("publishers", { publishers: publishersInfo });
}

const validatePublisherName = [
    body("newPublisher").trim()
        .isLength({ min: 1, max: 255 }).withMessage("Publisher name is required")
]

addPublishersPost = [
    validatePublisherName,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("publishers", {
                errors: errors.array(),
                publishers: await db.getAllPublishers()
            });
        }
        
        const { newPublisher } = matchedData(req);
        try {
            await db.addPublisher(newPublisher);
        }
        catch (queryError) {
            if (queryError.code == 23505) {
                return res.status(400).render("publishers", {
                    errors: [{ msg: "Publisher already exists"}],
                    publishers: await db.getAllPublishers()
                });
            }
            else {
                console.log("wot error wuh happened")
            }
        }

        res.redirect("/publishers");
    }
]

module.exports = {
    publishersListGet,
    addPublishersPost
}