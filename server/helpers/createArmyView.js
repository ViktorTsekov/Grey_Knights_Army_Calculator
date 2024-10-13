const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

const addNewArmyToDb = (army) => {
  return knex('armies').insert(army)
}

const updateExistingArmy = (armyId, armyName, armyList) => {
  return knex('armies')
    .where({id: armyId})
    .update({
      army_name: armyName,
      army_list: armyList
    })
}

module.exports = {addNewArmyToDb, updateExistingArmy}
