const knexConfig = require('../db/knexfile.js')
let knex = require('knex')(knexConfig.development)

if(process.env.NODE_ENV === 'production') {
  knex = require('knex')(knexConfig.production)
} 

const findUserByName = (username) => {
  return knex('users')
    .select('*')
    .where({name: username})
    .then((result) => {
      return result.filter(user => user.is_deleted === 0)
    })
}

const findUserById = (id) => {
  return knex('users')
    .select('*')
    .where({id: id})
    .then((result) => {
      return result.filter(user => user.is_deleted === 0)
    })
}

module.exports = {findUserByName, findUserById}
