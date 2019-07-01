const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/users", async (request, response) => {
  let users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1
  });

  return response.json(users);
});

router.post("/users", async ({ body }, response, next) => {
  try {
    if (body.password.length < 3) {
      return response
        .status(400)
        .json({ error: "password must be minimum 3 characters" });
    }

    const saltRounds = 10;
    const password = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      password
    });

    result = await user.save();
    return response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
