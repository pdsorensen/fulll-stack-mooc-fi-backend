const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("./../models/user");
const Blog = require("./../models/blog");
const app = require("../app");

const api = supertest(app);

const initialUser = {
  username: "Gosling",
  name: "Ryna Gosling",
  password: "secrethashgoeshere",
  blogs: []
};

const initialBlog = {
  title: "Why so serious?",
  author: "The Joker",
  url: "www.malformed.com",
  likes: 666
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  let blog = new Blog(initialBlog);
  let user = new User({ ...initialUser, blogs: [blog] });

  await blog.save();
  await user.save();
});

describe("a user", () => {
  test("has a collection of blogs", async () => {
    const { body } = await api.get("/api/users");
    expect(body[0].blogs[0].author).toEqual(initialBlog.author);
    expect(body[0].blogs[0].title).toEqual(initialBlog.title);
    expect(body[0].blogs[0].url).toEqual(initialBlog.url);
  });
});

describe("user controller", () => {
  test("is able to create user entry", async () => {
    await api
      .post("/api/users")
      .send({
        username: "willy",
        name: "William",
        password: "secretpassword"
      })
      .expect(201);

    const response = await api.get("/api/users");
    expect(response.body.length).toBe(2);
  });

  test("is able to retrieve users", async () => {
    const response = await api.get("/api/users").expect(200);
  });
});

describe("creating a user", () => {
  test("throws 400 on invalid data", async () => {
    await api
      .post("/api/users")
      .send({
        username: "willy",
        name: "William",
        password: "se"
      })
      .expect(400);
  });

  test("must have a unique username", async () => {
    await api
      .post("/api/users")
      .send({
        username: "Gosling",
        name: "William",
        password: "secretpassword"
      })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
