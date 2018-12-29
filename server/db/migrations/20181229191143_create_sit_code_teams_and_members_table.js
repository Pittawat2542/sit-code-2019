exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("sit_code_teams", function(table) {
      table.increments();
      table
        .string("name")
        .unique()
        .notNullable();
      table.string("school").notNullable();
      table.string("teacher_name").notNullable();
      table.string("teacher_phone_number").notNullable();
      table
        .string("programming_language")
        .notNullable()
        .defaultTo("C");
      table.timestamps();
    })
    .createTable("sit_code_members", function(table) {
      table.increments("id");
      table.string("name_prefix").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("grade_level").notNullable();
      table.string("phone_number").notNullable();
      table.string("email").notNullable();
      table.integer("team_id").unsigned();
      table
        .foreign("team_id")
        .references("id")
        .inTable("sit_code_teams").onD;
      table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("sit_code_teams").dropTable("sit_code_members");
};
