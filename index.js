const express = require("express");
const path = require("path");
require("dotenv").config();
require("./database");
const session = require("express-session");

const middleware = require("./middleware");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");
const postsApiRoute = require("./routes/api/posts");

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.use("/api/posts", postsApiRoute);

// app.use(middleware.notFound);
// app.use(middleware.errorHandler);

app.get("/", middleware.requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user,
  };

  return res.status(200).render("home", payload);
});
