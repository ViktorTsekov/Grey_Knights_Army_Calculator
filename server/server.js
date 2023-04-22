if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const LocalStrategy = require('passport-local').Strategy

const registerUserHelper = require('./helpers/registerUser')
const loginUserHelper = require('./helpers/loginUser.js')
const authUser = require('./passportAuth.js')
const User = require('./models/user.js')
const UserDetails = require('./models/userDetails.js')
const statusCodes = require('../client/src/static_files/statusCodes')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

passport.use(new LocalStrategy({ 
  usernameField: 'name',
  passwordField: 'password'
}, authUser))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
 
passport.deserializeUser((id, done) => {
  loginUserHelper.findUserById(id)
    .then((result) => {
      done(null, result[0])
    })
})

require('./usersRoutes')(app)

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.json({isAuthenticated: req.isAuthenticated()})
})

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { 
      console.error(err)
      return next(err) 
    }
  })

  req.session.destroy((err) => {
    if(err) {
      console.error(err)
    }

    res.clearCookie('connect.sid');
    res.send('Logged out');
  })
})

app.post('/register', async (req, res) => {
  try {
    const userNameIsAvailable = await registerUserHelper.userNameIsAvailable(req.body.name)
    let ipAddress = req.header('x-forwarded-for').toString()

    if(ipAddress.includes(",")) {
      ipAddress = ipAddress.split(",")[0]
    }

    if(!registerUserHelper.passwordIsSecure(req.body.password)) {
      return res.status(400).json({message: statusCodes.passwordUnsecure})
    }

    if(!userNameIsAvailable) {
      return res.status(400).json({message: statusCodes.usernameUnavailable})
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = User
    const userDetails = UserDetails

    user.name = req.body.name
    user.password = hashedPassword

    registerUserHelper
      .addNewUserToDb(user)
      .then((userId) => {
        userDetails.user_id = userId[0]
        userDetails.date_of_registration = registerUserHelper.getCurrentDate()
        userDetails.ip_address = ipAddress
        userDetails.geo_location = registerUserHelper.getGeoLocation(ipAddress)

        registerUserHelper
          .insertUserDetails(userDetails)
          .then(() => {
            return res.status(200).json({message: statusCodes.userRegistered})
          })        
      })
  } catch(e) {
    console.error(e)
  }
})

app.get('/retrieveCurrentUser', (req, res) => {
  res.json({user: req.user})
})

app.listen(process.env.PORT, () => console.log('App listening on port:', process.env.PORT))
