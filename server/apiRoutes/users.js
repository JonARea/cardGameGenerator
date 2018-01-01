const router = require('express').Router()
const {User} = require('../db/models')

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user.sanitize()))
    .catch(next)
})

module.exports = router
