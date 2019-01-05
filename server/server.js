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

app.get("/", (req, res) =>
  res.render("index", {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
  })
);

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => res.send("OK"));

// TEST Routes

app.get("/test", (req, res) => {
  knex("sit_code_teams")
    .select()
    .then(teams => {
      res.send(teams);
    });
});

app.get("/test/form", (req, res) => {
  res.render("form-test");
});

app.post("/test", (req, res) => {
  let body = req.body;

  knex("sit_code_teams")
    .insert({
      name: body.team_name,
      school: body.team_school,
      teacher_name: body.team_teacher,
      teacher_phone_number: body.team_phone,
      programming_language: body.team_programming_language
    })
    .then(team_id => console.log(team_id));
});

app.listen(process.env.PORT, () =>
  console.log(`Server is up on port ${process.env.PORT}`)
);
