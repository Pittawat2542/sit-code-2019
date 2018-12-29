exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("sit_code_teams")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("sit_code_teams").insert([
        {
          name: "Team A",
          school: "School A",
          teacher_name: "Teacher A",
          teacher_phone_number: "0123456789",
          programming_language: "C"
        },
        {
          name: "Team B",
          school: "School B",
          teacher_name: "Teacher B",
          teacher_phone_number: "0876543219",
          programming_language: "Java"
        },
        {
          name: "Team C",
          school: "School C",
          teacher_name: "Teacher C",
          teacher_phone_number: "0234567890",
          programming_language: "Python"
        }
      ]);
    });
};
