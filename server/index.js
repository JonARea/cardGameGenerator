const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const passport = require('passport')
const session = require('express-session')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(volleyball)

//api routes
app.use('/api', require('./apiRoutes'))

//static route
app.use(express.static(path.join(__dirname, '../browser/public')))


//error handling
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Whoops')
})

const port = 3000

app.listen(port, () => console.log('Listening on port ' + port))

