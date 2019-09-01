const router = require("express").Router();
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

router.get("/comments", async (request, response) => {
  let comments = await Comment.find({}).populate("blog", {
    id: 1
  });

  return response.json(comments);
});

router.post("/comments", async (request, response, next) => {
  try {
    const comment = new Comment({ ...request.body, blog: request.body.blogId });

    result = await comment.save();
    return response.status(201).json(result);
  } catch (exception) {
    return next(exception);
  }
});

module.exports = router;
