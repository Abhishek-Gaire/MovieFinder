const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public"))); //Static files

const routes = require("./routes/route");

app.use(routes);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
