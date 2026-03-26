const { Router } = require("express");
const gamesRouter = Router();

gamesRouter.get("/", (req, res) => {
    console.log("games router get");
    res.send("temporary games router get");
});

module.exports = gamesRouter;