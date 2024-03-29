const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

const errorMsgInvalidLogin = 'invalid username or password'

loginRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password === undefined || body.username === undefined) {
    return res.status(401).json({ error: errorMsgInvalidLogin })
  }

  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: errorMsgInvalidLogin })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    // { expiresIn: 1800 } // 30 minutes
  )

  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      id: user.id
    })
})

module.exports = loginRouter