const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  expect(listHelper.dummy([])).toBe(1);
});

describe("total likes", () => {
  const blogs = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.dijkstra.com",
      likes: 5
    },
    {
      title: "Neuromancer",
      author: "William Gibson",
      url: "http://www.neuromancer.com",
      likes: 2
    },
    {
      title: "Les Miserables",
      author: "Victor Hugo",
      url: "http://www.hugo.com",
      likes: 5
    },
    {
      title: "Sprawl",
      author: "William Gibson",
      url: "http://www.sprawl.com",
      likes: 4
    }
  ];

  test("when list has multiple blogs equals the sum of likes", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(16);
  });

  test("favoriteBlog is returned from list of blogs", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[0]);
  });

  test("mostBlogs returns author of most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "William Gibson",
      blogs: 2
    });
  });

  test("mostLikes returns author of most likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "William Gibson",
      likes: 6
    });
  });
});
