require("./config/config");

const _ = require("lodash");
const express = require("express");
const hbs = require("hbs");

const path = require("path");

const { knex } = require("./db/knex");

const app = express();
const publicPath = path.join(__dirname + "/../public");
const viewPath = path.join(publicPath + "/views");
const partialsPath = path.join(viewPath + "/partials");

// Middlewares

hbs.registerPartials(partialsPath);
app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));

// Routes

app.get("/", (req, res) => res.render("index"));

app.get("/register", (req, res) => res.render("register"));

app.post("/register", (req, res) => res.send("OK"))

app.listen(process.env.PORT, () =>
  console.log(`Server is up on port ${process.env.PORT}`)
);
