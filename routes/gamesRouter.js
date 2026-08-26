const { Router } = require("express");
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/", gamesController.addGamesGet);
gamesRouter.post("/", gamesController.addGamesPost);

module.exports = gamesRouter;