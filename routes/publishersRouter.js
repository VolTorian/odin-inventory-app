const { Router } = require("express");
const publishersRouter = Router();
const publishersController = require("../controllers/publishersController");

publishersRouter.get("/", publishersController.publishersListGet);

module.exports = publishersRouter;