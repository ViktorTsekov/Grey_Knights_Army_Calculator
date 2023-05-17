/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('army_values', table => {
    table.increments('id').primary().unsigned().notNullable()
    table.string('name').notNullable()
    table.string('class').notNullable()
    table.string('unit_size').notNullable()
    table.integer('cost_per_unit').defaultTo(0)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('army_values')
};
