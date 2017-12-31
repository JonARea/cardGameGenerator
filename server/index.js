if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
const {db, User} = require('./db/models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(volleyball)

//api routes
app.use('/api', require('./apiRoutes'))

//static routes
app.use(express.static(path.join(__dirname, '../browser/public')))

//authentication and session logging
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (err) {
    done(err)
  }
})

passport.deserializeUser((id, done) => {
  User.findById(id)
   .then(user => done(null, user))
   .catch(done)
})

//error handling
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Whoops')
})

const port = 3000

db.sync()
  .then(() => app.listen(port, () => console.log('Listening on port ' + port)))
  .catch(console.error)

