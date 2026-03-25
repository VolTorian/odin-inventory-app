const { Router } = require("express");
const developersRouter = Router();
// const developerController

developersRouter.get("/", (req, res) => {
    console.log("developers router get");
    res.send("temporary developers router get");
});

module.exports = developersRouter;