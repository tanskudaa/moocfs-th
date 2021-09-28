const bcrypt = require('bcrypt')
require('express-async-errors')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })

  res.json(users.map(a => a.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body
  if (body.password === undefined || body.password.length < 3) {
    return res.status(400).json({ error: 'password too weak' })
  }
  if (body.username === undefined) {
    return res.status(400).json({ error: 'must supply a username' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const result = await user.save()
  res.status(201).json(result)
})

module.exports = usersRouter