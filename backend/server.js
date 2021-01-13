const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// CORS-enabled for only localhost:8081
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const port = 8000;

app.get("/", (req, res) => {
  res.json({ message: "Hello server!" });
});

require("./app/routes/listingRoutes.js")(app);

// The app.listen() function is used to bind and listen the connections on the specified host and port.
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/foodpacked_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to database!");
});
db.on("error", console.error.bind(console, "Conection error:"));