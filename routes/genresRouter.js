const { Router } = require("express");
const genresRouter = Router();

genresRouter.get("/", (req, res) => {
    console.log("genres router get");
    res.send("temporary genres router get");
});

module.exports = genresRouter;