// Book-Collection-Backend\server.js

require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/coverImage", express.static(path.join(__dirname, "coverImage")));

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const routes = require("./routes")(app);

// const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Welcome to the Book Collection API!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
