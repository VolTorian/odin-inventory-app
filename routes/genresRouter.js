const { Router } = require("express");
const genresRouter = Router();
const genresController = require("../controllers/genresController");

genresRouter.get("/", genresController.genresListGet);

genresRouter.post("/", genresController.addGenresPost);

module.exports = genresRouter;