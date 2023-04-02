const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

const findUserByName = (username) => {
  return knex('users')
    .select('*')
    .where({name: username})
    .then((result) => {
      return result
    })
}

const findUserById = (id) => {
  return knex('users')
    .select('*')
    .where({id: id})
    .then((result) => {
      return result
    })
}

module.exports = {findUserByName, findUserById}
