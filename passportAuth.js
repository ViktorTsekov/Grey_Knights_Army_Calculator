const bcrypt = require('bcrypt')
const loginUserHelper = require('./helpers/loginUser.js')

const authUser = (username, password, done) => {
  loginUserHelper.findUserByName(username)
    .then(async (result) => {
      const user = result[0]

      if(user == null) {
        return done(null, false)
      } 

      try {
        if(await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch(e) {
        return done(e)
      }
    })
}

module.exports = authUser
