const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

const retrieveAllUsers = () => {
  return knex('users')
    .select({
      id: 'users.id',
      name: 'users.name',
      role: 'users.role',
      isDeleted: 'users.is_deleted',
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
