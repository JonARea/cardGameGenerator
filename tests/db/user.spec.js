const bcrypt = require('bcryptjs')
const should = require('chai').should()

const user1 = {
  id: 1,
  email: 'test@test.test',
  password: '123'
}

const setSaltandHashPassword = (userInstance, optionsObject) => {
  return bcrypt.genSalt()
    .then(salt => bcrypt.hash(userInstance.password, salt))
    .then(hash => {
      userInstance.password = hash
      return userInstance
    })
    .catch(console.error)
}

describe('setSaltandHashPassword', function () {
  it('takes a userInstance and salts and hashes the password', function () {
    setSaltandHashPassword(user1)
      .then(user => {
        user.email.should.equal(user1.email)
        user.password.should.not.equal('123')
      })
  })
})
