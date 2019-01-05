exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("sit_code_teams", function(table) {
      table.increments();
      table
        .string("team_name")
        .unique()
        .notNullable();
      table.string("school").notNullable();
      table.string("teacher_name").notNullable();
      table.string("teacher_phone_number").notNullable();
      table
        .string("programming_language")
        .notNullable()
        .defaultTo("Java");
      table.string("address").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
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
      table.boolean("isLead").defaultTo(false);
      table
        .foreign("team_id")
        .references("id")
        .inTable("sit_code_teams")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("sit_code_members").dropTable("sit_code_teams");
};
