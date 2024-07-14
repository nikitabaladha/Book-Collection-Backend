const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const config = require("config");

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use("/coverImage", express.static(path.join(__dirname, "coverImage")));
const routes = require("./routes")(app);

const PORT = config.PORT || 3001;
// const PORT = 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
