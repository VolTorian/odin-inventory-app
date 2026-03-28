const db = require("../db/queries");

async function publishersListGet(req, res) {
    const publishersInfo = await db.getAllPublishers();

    res.render("publishers", { publishers: publishersInfo });
}

module.exports = {
    publishersListGet
}