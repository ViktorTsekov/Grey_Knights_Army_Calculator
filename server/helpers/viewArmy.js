const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

const deleteArmyById = (armyId) => {
  return knex('armies')
    .where({id: armyId})
    .update({is_deleted: 1})
}

const returnArmyById = (armyId) => {
  return knex('armies')
    .select({
      id: 'armies.id',
      armyName: 'armies.army_name',
      armyList: 'armies.army_list'
    })
    .where({id: armyId} && {is_deleted: 0})
    .then((result) => {
      return result.filter((el) => el.id == armyId)
    })
}

const returnArmiesByUserId = (userId) => {
  return knex('armies')
    .select({
      id: 'armies.id',
      armyName: 'armies.army_name',
      armyList: 'armies.army_list'
    })
    .where({user_id: userId} && {is_deleted: 0})
    .then((result) => {
      return result
    })
}

module.exports = {returnArmyById, returnArmiesByUserId, deleteArmyById}
