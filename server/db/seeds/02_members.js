exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("sit_code_members")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("sit_code_members").insert([
        {
          name_prefix: "นาย",
          first_name: "รักชาติ",
          last_name: "ประเทศไทย",
          grade_level: "ม.4",
          phone_number: "0093648502",
          email: "example1@example.com",
          team_id: 1
        },
        {
          name_prefix: "นาย",
          first_name: "รักชาติ 2",
          last_name: "ประเทศไทย 2",
          grade_level: "ม.5",
          phone_number: "0093123502",
          email: "example2@example.com",
          team_id: 1
        },
        {
          name_prefix: "นาย",
          first_name: "รักชาติ 3",
          last_name: "ประเทศไทย 3",
          grade_level: "ม.6",
          phone_number: "0241648502",
          email: "example3@example.com",
          team_id: 1
        }
      ]);
    });
};
