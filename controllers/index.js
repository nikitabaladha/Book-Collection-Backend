// Book-Collection-Backend\controllers\index.js

const signup = require("./signup");
const login = require("./login");
const User = require("./User");
const Book = require("./Book");

module.exports = {
  signup,
  login,
  User,
  Book,
};
