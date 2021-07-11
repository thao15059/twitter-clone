const express = require("express");

const app = express();
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ posts: [] });
});

router.post("/", (req, res, next) => {
  if (!req.body.content) {
    return res.sendStatus(400);
  }

  res.status(200).json({ post: {} });
});

module.exports = router;
