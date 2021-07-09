const express = require("express");
const path = require("path");

require("dotenv").config();

const mongoose = require("./database");
const middleware = require("./middleware");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: "Home",
  };

  res.status(200).render("home", payload);
});
