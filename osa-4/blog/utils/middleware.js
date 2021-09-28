const logger = require('./logger')
const rfs = require('rotating-file-stream')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const logFileStream = rfs.createStream('access.log', {
  interval: '1d', // Rotate daily
  path: `${__dirname}/../log`
})

const censorLoginInfo = (req) => {
  const censorString = '***'
  const censoredBody = { ...req.body }
  if (censoredBody.username) censoredBody.username = censorString
  if (censoredBody.password) censoredBody.password = censorString

  return {
    ...req,
    body: censoredBody
  }
}

const requestLogger = (req, res, next) => {
  const censoredReq = censorLoginInfo(req)
  const d = new Date()
  const currentTime = (
    d.getDay() + '.' + d.getMonth() + '.' + d.getFullYear() + ' ' +
    d.getHours() + ':' + d.getMinutes() + '.' + d.getSeconds()
  )

  const message = (
    'Request from ' + censoredReq.ip + ' at ' + currentTime + '\n' +
    'Method: ' + censoredReq.method + '\n' +
    'Path: ' + censoredReq.path + '\n' +
    'Body: ' + JSON.stringify(censoredReq.body) + '\n' +
    '---'
  )

  logger.info(message)
  logFileStream.write(message + '\n')
  next()
}

const tokenExtractor = (req, res, next) => {
  req.body.token = ''

  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (req, res, next) => {
  if (req.body.token) {
    const decodedToken = jwt.verify(req.body.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    req.user = user
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  // logger.error(error)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'cast error' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  else if (error.name === 'TypeError') {
    return res.status(400).json({ error: 'type error' })
  }
  else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }
  else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  logger.error(error)
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).end()
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  errorHandler,
  unknownEndpoint
}