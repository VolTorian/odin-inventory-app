const { Router } = require("express");
const publishersRouter = Router();
const publishersController = require("../controllers/publishersController");

publishersRouter.get("/", publishersController.publishersListGet);
publishersRouter.post("/", publishersController.addPublishersPost);

module.exports = publishersRouter;