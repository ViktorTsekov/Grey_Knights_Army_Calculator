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

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.json({isAuthenticated: req.isAuthenticated()})
})

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
  })
})

app.post('/register', async (req, res) => {
  try {
    const userNameIsAvailable = await registerUserHelper.userNameIsAvailable(req.body.name)

    if(!registerUserHelper.passwordIsSecure(req.body.password)) {
      return res.status(400).json({message: 'Password is not secure enough, password should be at least 8 characters long and include a capital letter, a lowercase letter, a number and a special character'})
    }

    if(!userNameIsAvailable) {
      return res.status(400).json({message: 'Username unavailable'})
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = User

    user.name = req.body.name
    user.password = hashedPassword
    user.role = 'user'

    registerUserHelper
      .addNewUserToDb(user)
      .then(() => {
        return res.status(200).json({message: 'User registered successfully'})
      })
  } catch(e) {
    console.error(e)
  }
})

app.get('/retrieveCurrentUser', (req, res) => {
  res.json({user: req.user})
})

// function checkAuthenticated(req, res, next) {
//   if(req.isAuthenticated()) {
//     return next()
//   }

//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   console.log("auth:", req.isAuthenticated())

//   if(req.isAuthenticated()) {
//     return res.redirect('/')
//   }

//   next()
// }

app.listen(process.env.PORT, () => console.log('App listening on port:', process.env.PORT))
