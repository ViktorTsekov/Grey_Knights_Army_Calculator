const knexConfig = require('../db/knexfile.js')
let knex = require('knex')(knexConfig.development)

if(process.env.NODE_ENV === 'production') {
  knex = require('knex')(knexConfig.production)
} 

const userNameIsAvailable = (username) => {
  return knex('users')
    .select('*')
    .where({name: username})
    .then((result) => {
      if(result.length === 0) {
        return true
      } else {
        let isAvailable = true

        result.forEach((user) => {
          if(user.is_deleted === 0) {
            isAvailable = false
          }
        })

        return isAvailable
      }
    })
}

const addNewUserToDb = (user) => {
  return knex('users').insert(user)
}

const insertUserDetails = (user_details) => {
  return knex('users_details').insert(user_details)
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

const getCurrentDate = () => {
  const ts = Date.now()

  const dateObject = new Date(ts)
  const date = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()

  return date + "/" + month + "/" + year
}

const getGeoLocation = (ipAddress) => {
  const geoip = require('geoip-lite')
  const geo = geoip.lookup(ipAddress)

  if(geo !== null && geo !== undefined) {
    delete geo['range']
    delete geo['eu']
    delete geo['metro']
    delete geo['area']
  }

  return JSON.stringify(geo)
}

module.exports = {userNameIsAvailable, passwordIsSecure, addNewUserToDb, insertUserDetails, getCurrentDate, getGeoLocation}
