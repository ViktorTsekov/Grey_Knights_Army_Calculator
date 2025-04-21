const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

if(process.env.NODE_ENV === 'production') {
  knex = require('knex')(knexConfig.production)
} 

const retrieveAllArmyValues = () => {
  return knex('army_values')
    .select({
      id: 'army_values.id',
      name: 'army_values.name',
      class: 'army_values.class',
      unitSize: 'army_values.unit_size',
      costPerUnit: 'army_values.cost_per_unit'
    })
    .then((result) => {
      return result
    })
}

const updateArmyValueById = (id, value) => {
  return knex('army_values')
    .where({id: id})
    .update({cost_per_unit: value.costPerUnit})
}

module.exports = {retrieveAllArmyValues, updateArmyValueById}
