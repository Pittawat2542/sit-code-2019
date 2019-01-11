require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const helmet = require("helmet");
const compression = require("compression");

const path = require("path");

const knex = require("./db/knex");

const app = express();
const publicPath = path.join(__dirname + "/../public");
const viewPath = path.join(publicPath + "/views");
const partialsPath = path.join(viewPath + "/partials");

const openDate = new Date(2019, 0, 11, 0, 0, 0, 0);
const closeDate = new Date(2019, 0, 18, 23, 59, 59, 0);
const announceDate = new Date(2019, 0, 19, 18, 0, 0, 0);

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
app.use(helmet());
app.use(compression());

app.disable("x-powered-by");

// Routes

app.get("/", (req, res) =>
  res.render("index", {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    isOpen: !(Date.now() < openDate || Date.now() > closeDate),
    isAnnounce: Date.now() >= announceDate,
    isClose: Date.now() > closeDate
  })
);

app.get("/register", (req, res) => {
  if (Date.now() < openDate || Date.now() > closeDate) {
    res.redirect("/");
  } else {
    res.render("register");
  }
});

app.post("/register", async (req, res) => {
  if (Date.now() < openDate || Date.now() > closeDate) {
    res.status(503).send();
  } else {
    let body = req.body;

    for (let key in body) {
      let value = body[key];

      if (!value) return res.status(400).send();
    }

    let teamId, firstMember, secondMember, thirdMember;

    try {
      teamId = await knex("sit_code_teams").insert({
        team_name: body.team_name.trim(),
        school: body.team_school.trim(),
        teacher_name: body.team_teacher.trim(),
        teacher_phone_number: body.team_phone,
        programming_language: body.team_programming_language,
        address: body.team_address.trim()
      });
    } catch (error) {
      return res.status(400).send(error.code);
    }

    try {
      firstMember = await knex("sit_code_members").insert({
        name_prefix: body.first_name_prefix,
        first_name: body.first_name.trim(),
        last_name: body.first_surname.trim(),
        grade_level: body.first_grade,
        phone_number: body.first_phone,
        email: body.first_email.trim(),
        team_id: teamId,
        isLead: true
      });
    } catch (error) {
      return res.status(400).send(error.code);
    }

    try {
      secondMember = await knex("sit_code_members").insert({
        name_prefix: body.second_name_prefix,
        first_name: body.second_name.trim(),
        last_name: body.second_surname.trim(),
        grade_level: body.second_grade,
        phone_number: body.second_phone,
        email: body.second_email.trim(),
        team_id: teamId
      });
    } catch (error) {
      return res.status(400).send(error.code);
    }

    try {
      thirdMember = await knex("sit_code_members").insert({
        name_prefix: body.third_name_prefix,
        first_name: body.third_name.trim(),
        last_name: body.third_surname.trim(),
        grade_level: body.third_grade,
        phone_number: body.third_phone,
        email: body.third_email.trim(),
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
  }
});

app.get("/announcement", async (req, res) => {
  if (Date.now() < announceDate) {
    res.redirect("/");
  } else {
    let data = await knex("sit_code_teams").select("team_name", "school");
    let arr = [];
    data.map(item =>
      arr.push({ team_name: item.team_name, team_school: item.school })
    );

    res.render("announcement", { arr });
  }
});

app.get("/scoreboard", (req, res) => res.render("scoreboard"));

app.get("/mockscoreboard", (req, res) => {
  res.send([
    {
      team_name: "Test",
      question1: "✓",
      question2: "✓",
      question3: "✓",
      question4: "✓",
      question5: "✖",
      question6: "✓",
      question7: "✓",
      question8: "✓",
      question9: "✓",
      question10: "✓"
    },
    {
      team_name: "Test 2",
      question1: "✓",
      question2: "✓",
      question3: "✓",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 3",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 4",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 5",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 6",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 7",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 8",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 9",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    },
    {
      team_name: "Test 10",
      question1: "-",
      question2: "-",
      question3: "✖",
      question4: "✖",
      question5: "✓",
      question6: "-",
      question7: "✓",
      question8: "✓",
      question9: "✖",
      question10: "✓"
    }
  ]);
});

app.get("/title", (req, res) => res.render("title"));

app.get("*", (req, res) => res.redirect("/"));

app.listen(process.env.PORT, () =>
  console.log(`Server is up on port ${process.env.PORT}`)
);
