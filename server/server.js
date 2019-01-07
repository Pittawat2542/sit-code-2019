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

hbs.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});

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

app.post("/register", async (req, res) => {
  let body = req.body;

  for (let key in body) {
    let value = body[key];

    if (!value) return res.status(400).send();
  }

  let teamId, firstMember, secondMember, thirdMember;

  try {
    teamId = await knex("sit_code_teams").insert({
      team_name: body.team_name,
      school: body.team_school,
      teacher_name: body.team_teacher,
      teacher_phone_number: body.team_phone,
      programming_language: body.team_programming_language,
      address: body.team_address
    });
  } catch (error) {
    return res.status(400).send(error.code);
  }

  try {
    firstMember = await knex("sit_code_members").insert({
      name_prefix: body.first_name_prefix,
      first_name: body.first_name,
      last_name: body.first_surname,
      grade_level: body.first_grade,
      phone_number: body.first_phone,
      email: body.first_email,
      team_id: teamId,
      isLead: true
    });
  } catch (error) {
    return res.status(400).send(error.code);
  }

  try {
    secondMember = await knex("sit_code_members").insert({
      name_prefix: body.second_name_prefix,
      first_name: body.second_name,
      last_name: body.second_surname,
      grade_level: body.second_grade,
      phone_number: body.second_phone,
      email: body.second_email,
      team_id: teamId
    });
  } catch (error) {
    return res.status(400).send(error.code);
  }

  try {
    thirdMember = await knex("sit_code_members").insert({
      name_prefix: body.third_name_prefix,
      first_name: body.third_name,
      last_name: body.third_surname,
      grade_level: body.third_grade,
      phone_number: body.third_phone,
      email: body.third_email,
      team_id: teamId
    });
  } catch (error) {
    return res.status(400).send(error.code);
  }

  if (firstMember && secondMember && thirdMember) {
    return res.send("OK");
  } else {
    return res.status(400).send();
  }
});

app.get("/announcement", async (req, res) => {
  let data = await knex("sit_code_teams").select("team_name", "school");
  let arr = [];
  data.map(item =>
    arr.push({ team_name: item.team_name, team_school: item.school })
  );

  res.render("announcement", { arr });
});

app.get("/scoreboard", (req, res) => res.render("scoreboard"));

app.get("/mockscoreboard", (req, res) => {
  res.send([
    {
      rank: 1,
      team_name: "Test",
      question1: 10,
      question2: 99,
      question3: 10,
      question4: 10,
      question5: 10,
      question6: 10,
      question7: 10,
      question8: 10,
      question9: 10,
      question10: 20
    },
    {
      rank: 2,
      team_name: "Test 2",
      question1: 10,
      question2: 10,
      question3: 10,
      question4: 10,
      question5: 10,
      question6: 10,
      question7: 10,
      question8: 10,
      question9: 10,
      question10: 10
    },
    {
      rank: 3,
      team_name: "Test 3",
      question1: 10,
      question2: 10,
      question3: 10,
      question4: 10,
      question5: 10,
      question6: 10,
      question7: 10,
      question8: 10,
      question9: 10,
      question10: 10
    },
    {
      rank: 4,
      team_name: "Test 4",
      question1: 10,
      question2: 10,
      question3: 10,
      question4: 10,
      question5: 10,
      question6: 10,
      question7: 10,
      question8: 10,
      question9: 10,
      question10: 10
    }
  ]);
});

app.get("/title", (req, res) => res.render("title"));

app.listen(process.env.PORT, () =>
  console.log(`Server is up on port ${process.env.PORT}`)
);
