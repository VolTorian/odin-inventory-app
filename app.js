const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

const indexRouter = require("./routes/indexRouter");
const gamesRouter = require("./routes/gamesRouter");
const developersRouter = require("./routes/developersRouter");
const genresRouter = require("./routes/genresRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);
app.use("/genres", genresRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app = listening on port ${PORT}.`);
});