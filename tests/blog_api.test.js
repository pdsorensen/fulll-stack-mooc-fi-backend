const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("./../models/blog");
const User = require("./../models/user");
const app = require("../app");

const api = supertest(app);

const userData = {
  username: "Gosling",
  name: "Ryna Gosling",
  password: "secrethashgoeshere"
};

const initialBlogs = [
  {
    title: "Why so serious?",
    author: "The Joker",
    url: "www.malformed.com",
    likes: 666
  },
  {
    title: "How i tricked Othello",
    author: "Iago",
    url: "www.jealoux.com",
    likes: 0
  }
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  let user = new User(userData);
  await user.save();

  let blogObject = new Blog({ ...initialBlogs[0], user });
  await blogObject.save();

  blogObject = new Blog({ ...initialBlogs[1], user });
  await blogObject.save();
});

describe("blogs", () => {
  test("is returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("have the property id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("have a related user", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].user.username).toEqual(userData.username);
    expect(response.body[0].user.name).toEqual(userData.name);
  });
});

describe("requests with bad data", () => {
  test("defaults likes to 0", async () => {
    let result = await api.post("/api/blogs").send({
      title: "Blog post",
      author: "Harry Potter",
      url: "www.malformed.com"
    });

    expect(result.body.likes).toBe(0);
  });

  test("throws 400 if title or url properties is missing", async () => {
    await api
      .post("/api/blogs")
      .send({
        url: "www.malformed.com"
      })
      .expect(400);
  });
});

describe("blog controller is able to", () => {
  test("create a new blog entry", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "Blog post",
        author: "Harry Potter",
        url: "www.malformed.com",
        likes: 5
      })
      .expect(201);

    const response = await api.get("/api/blogs");

    expect(response.body.length).toBe(initialBlogs.length + 1);
  });

  test("delete a new blog entry ", async () => {
    const initial = await api.get("/api/blogs");

    await api
      .delete(`/api/blogs/${initial.body[0].id}`)
      .send({
        title: "Blog post",
        author: "Harry Potter",
        url: "www.malformed.com",
        likes: 5
      })
      .expect(200);

    const newBlogs = await api.get("/api/blogs");

    expect(newBlogs.body.length).toBe(initial.body.length - 1);
  });

  test("update a blog entry", async () => {
    const initial = await api.get("/api/blogs");

    let response = await api
      .put(`/api/blogs/${initial.body[0].id}`)
      .send({
        likes: initial.body[0].likes + 10
      })
      .expect(200);

    expect(response.body.likes).toBe(initial.body[0].likes + 10);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
