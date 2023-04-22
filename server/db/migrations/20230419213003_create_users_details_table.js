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
  .then(() => {
    // Copy users data to users_details
    knex('users').select("id").then((result) => {
      result.forEach(async (el) => {
        await knex('users_details').insert({
          user_id: el.id,
          date_of_registration: "-",
        })
      })
    })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users_details')
};
