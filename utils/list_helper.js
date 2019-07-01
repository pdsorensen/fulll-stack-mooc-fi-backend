const _ = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return _.sumBy(blogs, "likes");
};

const favoriteBlog = blogs => {
  return _.maxBy(blogs, "likes");
};

const mostBlogs = blogs => {
  let authorMap = _.reduce(
    blogs,
    (carry, { author }) => {
      let index = _.findIndex(carry, ["author", author]);
      if (index !== -1) {
        carry[index].blogs += 1;
      } else {
        carry.push({ author, blogs: 1 });
      }

      return carry;
    },
    []
  );

  return _.maxBy(authorMap, "blogs");
};

const mostLikes = blogs => {
  let authorMap = _.reduce(
    blogs,
    (carry, { author, likes }) => {
      let index = _.findIndex(carry, ["author", author]);
      if (index !== -1) {
        carry[index].likes += likes;
      } else {
        carry.push({
          author,
          likes
        });
      }

      return carry;
    },
    []
  );

  return _.maxBy(authorMap, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
  favoriteBlog
};
