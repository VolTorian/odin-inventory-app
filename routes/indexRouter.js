const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    console.log("index router for games get");
    res.send("temporary index router for games get");
});

module.exports = indexRouter;