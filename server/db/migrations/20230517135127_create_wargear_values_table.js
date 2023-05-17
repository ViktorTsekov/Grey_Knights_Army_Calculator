/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wargear_values', table => {
    table.increments('id').primary().unsigned().notNullable()
    table.string('name').notNullable()
    table.integer('cost').defaultTo(0)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('wargear_values')
};
