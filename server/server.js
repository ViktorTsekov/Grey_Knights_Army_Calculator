if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
//const https = require('https')
//const fs = require('fs')
//const cors = require('cors');
const registerUserHelper = require('./helpers/registerUser')
const loginUserHelper = require('./helpers/loginUser.js')
const authUser = require('./passportAuth.js')
const statusCodes = require('../client/src/static_files/statusCodes')
const User = require('./models/user.js')
const UserDetails = require('./models/userDetails.js')
//const { development } = require('./db/knexfile.js')
const MemoryStore = require('memorystore')(session)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

//app.use(cors({
//  origin: 'https://grey-knights-army-manager.online',
//  credentials: true,
//}));

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
require('./armyValuesRoutes')(app)
require('./wargearValuesRoutes')(app)
require('./createNewArmyRoutes')(app)
require('./viewArmyRoutes.js')(app)

app.post(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/login`,
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.json({isAuthenticated: req.isAuthenticated()})
})

app.get(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/logout`, (req, res, next) => {
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

app.post(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/register`, async (req, res) => {
  try {
    const userNameIsAvailable = await registerUserHelper.userNameIsAvailable(req.body.name)

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
        userDetails.ip_address = "N/A"
        userDetails.geo_location = {}

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

app.get(`${process.env.NODE_ENV === 'development' ? '/api' : ''}/retrieveCurrentUser`, (req, res) => {
  res.json({user: req.user})
})

//const sslServer = https.createServer({
//  key: fs.readFileSync("../ssl/ca.key"),
//  cert: fs.readFileSync("../ssl/ca.crt"),
//}, app)

//sslServer.listen(process.env.PORT, () => console.log('App listening on port:', process.env.PORT))

app.listen(process.env.PORT, '127.0.0.1', () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
