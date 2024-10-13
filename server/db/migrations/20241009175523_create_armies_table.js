/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('armies', (table) => {
    table.increments('id').primary().unsigned().notNullable()
    table.string('army_name').notNullable()
    table.text('army_list').notNullable()
    table.integer('is_deleted').notNullable().defaultTo(0)
    table.integer('user_id').unsigned().notNullable().index().references('id').inTable('users')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('armies')
};
