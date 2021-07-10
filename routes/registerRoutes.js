const express = require("express");

const User = require("../schemas/UserSchema");

const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", async (req, res, next) => {
  const payload = {
    pageTitle: "Register",
  };
  return res.status(200).render("register", payload);
});

router.post("/", async (req, res, next) => {
  const payload = req.body;
  payload.pageTitle = "Register";
  const { firstName, lastName, username, email, password } = req.body;

  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !username.trim() ||
    !email.trim()
  ) {
    payload.errorMessage = "Make sure each field has a valid value";
    return res.status(400).render("register", payload);
  }

  try {
    const userInDb = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userInDb) {
      if (email === userInDb.email) {
        payload.errorMessage = "Email already in use.";
        return res.status(400).render("register", payload);
      }

      if (email === userInDb.username) {
        payload.errorMessage = "Username already in use.";
        return res.status(400).render("register", payload);
      }
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await newUser.save(function (err, user) {
      if (err) throw err;
      console.log(user);
      req.session.user = user;
      return res.redirect("/");
    });
  } catch (error) {
    payload.errorMessage = "Something went wrong";
    return res.status(400).render("register", payload);
  }
});

module.exports = router;
