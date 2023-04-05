if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const knexConfig = require('./db/knexfile.js')
const knex = require('knex')(knexConfig.development)
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const LocalStrategy = require('passport-local').Strategy

const registerUserHelper = require('./helpers/registerUser')
const loginUserHelper = require('./helpers/loginUser.js')
const authUser = require('./passportAuth.js')

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

app.get('/api', (req, res) => {
  res.json({message: "Hello World 123"})
})

app.get('/', checkAuthenticated, (req, res) => {
  console.log('User authenticated with username:', req.user.name)
  res.render('index.ejs')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/"
}))

app.delete('/logout', checkAuthenticated, (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    
    res.redirect('/login')
  })
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const userNameIsAvailable = await registerUserHelper.userNameIsAvailable(req.body.name)

    if(!registerUserHelper.passwordIsSecure(req.body.password)) {
      throw 'Password not secure'
    }

    if(!userNameIsAvailable) {
      throw 'Username not available'
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    knex('users')
      .insert({
        username: req.body.name,
        password: hashedPassword,
        role: 'user'
      })
      .then(() => {
        res.status(200).redirect('/login')
      })
  } catch(e) {
    console.error(e)
    res.status(400).redirect('/register')
  }
})

function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }

  next()
}

app.listen(process.env.PORT, () => console.log('App listening on port:', process.env.PORT))
