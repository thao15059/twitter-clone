const express = require("express");

const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", (req, res, next) => {
  const payload = req.body;
  const { firstName, lastName, username, email, password } = req.body;

  if (
    firstName.trim() &&
    lastName.trim() &&
    username.trim() &&
    email.trim() &&
    password
  ) {
    return;
  }

  payload.errorMessage = "Make sure each field has a valid value";
  res.status(200).render("register", payload);
});

module.exports = router;
