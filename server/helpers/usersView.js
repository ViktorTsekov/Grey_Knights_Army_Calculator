const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

const retrieveAllUsers = () => {
  return knex('users')
    .join('users_details', 'users.id', 'users_details.user_id')
    .select({
      id: 'users.id',
      name: 'users.name',
      role: 'users.role',
      isDeleted: 'users.is_deleted',
      geoLocation: 'users_details.geo_location'
    })
    .then((result) => {
      return result.filter(user => user.isDeleted === 0)
    })
}

const updateUsersRoleById = (id, role) => {
  return knex('users')
    .where({ id: id })
    .update({ role: role })
}

const deleteUserById = (id) => {
  return knex('users')
    .where({ id: id })
    .update({ is_deleted: 1 })
}

module.exports = {retrieveAllUsers, updateUsersRoleById, deleteUserById}
