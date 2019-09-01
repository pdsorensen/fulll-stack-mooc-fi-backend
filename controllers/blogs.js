const router = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

router.put("/blogs/:id", async (request, response) => {
  const { likes } = request.body;

  let result = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      likes
    },
    { new: true }
  );

  return response.json(result);
});

router.get("/blogs", async (request, response) => {
  let blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1
  });

  return response.json(blogs);
});

router.delete("/blogs/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    let blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response
        .status(401)
        .json({ error: `unauthorized to delete blog ${blog.id}` });
    }

    let blogs = await Blog.findByIdAndRemove(request.params.id);
    return response.json(blogs);
  } catch (exception) {
    return next(exception);
  }
});

router.post("/blogs", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = new Blog({ ...request.body, user: decodedToken.id });

    result = await blog.save();
    return response.status(201).json(result);
  } catch (exception) {
    return next(exception);
  }
});

module.exports = router;
