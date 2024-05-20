const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const config = require("config");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
const routes = require("./routes")(app);

const PORT = config.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
