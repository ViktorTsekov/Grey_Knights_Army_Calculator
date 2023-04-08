const knexConfig = require('../db/knexfile.js')
const knex = require('knex')(knexConfig.development)

const userNameIsAvailable = (username) => {
  return knex('users')
    .select('*')
    .where({name: username})
    .then((result) => {
      if(result[0] === undefined) {
        return true
      } else {
        return false
      }
    })
}

const addNewUserToDb = (user) => {
  return knex('users').insert(user)
}

const passwordIsSecure = (password) => {
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const specialCharacters = '"():!{}*,.;%@/\\&=+-#<>?$'

  let containsUppercase = false
  let containsLowercase = false
  let containsSpecialCharacter = false
  let is8CharactersLong = password.length >= 8

  password.split("").forEach((el) => {
    if(uppercaseLetters.includes(el)) containsUppercase = true
    if(lowercaseLetters.includes(el)) containsLowercase = true
    if(specialCharacters.includes(el)) containsSpecialCharacter = true
  })

  return containsUppercase && containsLowercase && containsSpecialCharacter && is8CharactersLong
}

module.exports = {userNameIsAvailable, passwordIsSecure, addNewUserToDb}
