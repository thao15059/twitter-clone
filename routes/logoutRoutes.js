const express = require("express");

const app = express();
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      return res.redirect("/login");
    });
  }
});

module.exports = router;
