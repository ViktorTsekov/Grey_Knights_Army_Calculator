const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

if(process.env.NODE_ENV === 'production') {
  knex = require('knex')(knexConfig.production)
} 

const retrieveAllWargearValues = () => {
  return knex('wargear_values')
    .select({
      id: 'wargear_values.id',
      name: 'wargear_values.name',
      cost: 'wargear_values.cost'
    })
    .then((result) => {
      return result
    })
}

const updateWargearValueById = (id, value) => {
  return knex('wargear_values')
    .where({id: id})
    .update({cost: value.cost})
}

module.exports = {retrieveAllWargearValues, updateWargearValueById}
