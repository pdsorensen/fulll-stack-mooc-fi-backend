const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", async ({ body }, response, next) => {
  const user = await User.findOne({ username: body.username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password"
    });
  }

  let { username, id, name } = user;

  const userForToken = {
    username,
    id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, username, name });
});

module.exports = router;
