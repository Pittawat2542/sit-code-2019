require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");

const path = require("path");

const knex = require("./db/knex");

const app = express();
const publicPath = path.join(__dirname + "/../public");
const viewPath = path.join(publicPath + "/views");
const partialsPath = path.join(viewPath + "/partials");

// Middlewares

hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

app.get("/", (req, res) => res.render("index"));

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => res.send("OK"));

app.get("/test", (req, res) => {
  knex
    .select("name")
    .from("sit_code_teams")
    .where('name', 'like', '%team%')
    .then(teams => {
      res.send(teams);
    });
});

app.listen(process.env.PORT, () =>
  console.log(`Server is up on port ${process.env.PORT}`)
);
