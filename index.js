const express = require("express");
const path = require("path");

const middleware = require("./middleware");

const app = express();
const port = 3003;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.set("view engine", "pug");
app.set("views", "views");

// Statics
app.use(express.static(path.join(__dirname, "public")));

// Routes
const loginRoute = require("./routes/loginRoutes");

app.use("/login", loginRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: "Home",
  };

  res.status(200).render("home", payload);
});
