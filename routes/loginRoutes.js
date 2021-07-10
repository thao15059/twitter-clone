const express = require("express");

const User = require("../schemas/UserSchema");

const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
  const payload = {
    pageTitle: "Login",
  };
  res.status(200).render("login", payload);
});

router.post("/", async (req, res, next) => {
  const payload = req.body;
  payload.pageTitle = "Login";
  const { logUsername, logPassword } = req.body;

  if (!logUsername.trim() && !logPassword.trim()) {
    payload.errorMessage = "Make sure each field has a valid value.";
    return res.status(400).render("login", payload);
  }

  try {
    const userInDb = await User.findOne({
      $or: [{ username: logUsername }, { email: logUsername }],
    });

    if (!userInDb) {
      payload.errorMessage = "Login credentials incorrect";
      return res.status(400).render("login", payload);
    }

    userInDb.comparePassword(logPassword, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        payload.errorMessage = "Login credentials incorrect";
        return res.status(400).render("login", payload);
      }
      req.session.user = userInDb;
      return res.redirect("/");
    });
  } catch (error) {
    payload.errorMessage = "Something went wrong";
    return res.status(400).render("login", payload);
  }
});

module.exports = router;
