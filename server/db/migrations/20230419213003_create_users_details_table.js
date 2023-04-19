/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users_details', table => {
    table.integer('user_id').primary().unsigned().notNullable().references('id').inTable('users')
    table.string('date_of_registration').notNullable()
    table.string('ip_address')
    table.string('geo_location')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users_details')
};
