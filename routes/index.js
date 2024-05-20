// routes/index.js

const Controller = require("../controllers");
const Middleware = require("../middleware/index.js");

module.exports = (app) => {
  app.post("/api/signup", Controller.signup);
  app.post("/api/login", Controller.login);
  app.post("/api/book", Middleware, Controller.Book.create);
  app.get("/api/book", Middleware, Controller.Book.get);
  app.get("/api/book/:id", Middleware, Controller.Book.getBookById);
  app.put("/api/book/:id", Middleware, Controller.Book.update);
  app.delete("/api/book/:id", Middleware, Controller.Book.deleteBookById);
};
