require("./config/config");

const _ = require("lodash");
const bodyParser = require("body-parser");
const compression = require("compression");
const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
const helmet = require("helmet");
const papaParse = require("papaparse");
const path = require("path");

const knex = require("./db/knex");

const app = express();
const publicPath = path.join(__dirname + "/../public");
const viewPath = path.join(publicPath + "/views");
const partialsPath = path.join(viewPath + "/partials");

const openDate = new Date(2019, 0, 11, 0, 0, 0, 0);
const closeDate = new Date(2019, 0, 18, 23, 59, 59, 0);
const announceDate = new Date(2019, 0, 19, 15, 0, 0, 0);
const onlineRoundDate = new Date(2019, 0, 19, 18, 0, 0, 0);
const codingAnnounceDate = new Date(2019, 0, 23, 16, 0, 0, 0);

let passedTeams = [];

fs.readFile(__dirname + "/files/data.csv", (err, data) => {
  if (err) {
    console.log(err);
    return res.status(500);
  }

  let parsed = papaParse.parse(data.toString());

  // Get first top 40
  parsed.data = parsed.data.slice(1, parsed.data.length - 2);
  parsed.data.sort((a, b) => {
    if (a[9] == b[9]) {
      return b[8] - a[8];
    } else {
      return b[9] - a[9];
    }
  });

  parsed.data = parsed.data.slice(0, 40);

  // Sort by school name, then by team name
  parsed.data.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    else if (a[0] < b[0]) return -1;
    else {
      if (a[1] > b[1]) return 1;
      else if (a[1] < b[1]) return -1;
      else return 0;
    }
  });

  parsed.data.map((x, index) =>
    passedTeams.push({
      teamName: x[1],
      school: x[0]
    })
  );
  // console.log(passedTeams.sort((a, b) => {
  //   if (a.teamName.toLowerCase() > b.teamName.toLowerCase()) return 1;
  //   else return -1;
  // }));
});

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
    isClose: Date.now() > closeDate,
    isOnlineRound: Date.now() >= onlineRoundDate,
    isCodingAnnounce: Date.now() >= codingAnnounceDate
  })
);

// app.get("/register", (req, res) => {
//   if (Date.now() < openDate || Date.now() > closeDate) {
//     res.redirect("/");
//   } else {
//     res.render("register");
//   }
// });

// app.post("/register", async (req, res) => {
//   if (Date.now() < openDate || Date.now() > closeDate) {
//     return res.status(503).send();
//   } else {
//     let body = req.body;

//     // Check if any data in the request body is empty
//     for (let key in body) {
//       let value = body[key];

//       if (!value) return res.status(400).send();
//     }

//     let data = await knex("sit_code_teams")
//       .select("team_name")
//       .where({
//         team_name: body.team_name.trim()
//       });

//     if (data.length !== 0) return res.status(400).send("ER_DUP_ENTRY");

//     let teamId;

//     try {
//       teamId = await knex("sit_code_teams").insert({
//         team_name: body.team_name.trim(),
//         school: body.team_school.trim(),
//         teacher_name: body.team_teacher.trim(),
//         teacher_phone_number: body.team_phone,
//         programming_language: body.team_programming_language,
//         address: body.team_address.trim()
//       });

//       await knex("sit_code_members").insert({
//         name_prefix: body.first_name_prefix,
//         first_name: body.first_name.trim(),
//         last_name: body.first_surname.trim(),
//         grade_level: body.first_grade,
//         phone_number: body.first_phone,
//         email: body.first_email.trim(),
//         team_id: teamId,
//         isLead: true
//       });

//       await knex("sit_code_members").insert({
//         name_prefix: body.second_name_prefix,
//         first_name: body.second_name.trim(),
//         last_name: body.second_surname.trim(),
//         grade_level: body.second_grade,
//         phone_number: body.second_phone,
//         email: body.second_email.trim(),
//         team_id: teamId
//       });

//       await knex("sit_code_members").insert({
//         name_prefix: body.third_name_prefix,
//         first_name: body.third_name.trim(),
//         last_name: body.third_surname.trim(),
//         grade_level: body.third_grade,
//         phone_number: body.third_phone,
//         email: body.third_email.trim(),
//         team_id: teamId
//       });

//       res.send("OK");
//     } catch (error) {
//       return res.status(400).send(error.code);
//     }
//   }
// });

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

app.get("/team-checker", (req, res) => {
  res.render("team-checker");
});

app.get("/team-list", async (req, res) => {
  if (req.header("x-password-checker") !== "6p2QxYDfBQ2XjJnR5t23b6NC9qqGOLIE") {
    return res.status("400").send();
  }
  let data = await knex("sit_code_teams").select("id", "team_name", "school");
  let arr = [];
  data.map(item =>
    arr.push({
      id: item.id,
      team_name: item.team_name,
      team_school: item.school
    })
  );

  res.send({ arr });
});

app.get("/countdown", (req, res) => res.render("countdown"))

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

app.get("/announcement-coding-round", (req, res) => {
  if (Date.now() < codingAnnounceDate) {
    res.redirect("/");
  } else {
    res.render("codingAnnouncement", {
      passedTeams
    });
  }
});

app.get("*", (req, res) => res.redirect("/"));

app.listen(process.env.PORT, () =>
  console.log(`Server is up on port ${process.env.PORT}`)
);
