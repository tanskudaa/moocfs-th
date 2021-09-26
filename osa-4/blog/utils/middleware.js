const logger = require('./logger')
const rfs = require('rotating-file-stream')

const logFileStream = rfs.createStream('access.log', {
  interval: '1d', // Rotate daily
  path: `${__dirname}/../log`
})

// TODO URGENT! All login attempts are logged which poses a HUGE security risk since they're both printed to console AND
// SAVED AS PLAIN TEXT!
const requestLogger = (req, res, next) => {
  const d = new Date()
  const currentTime = (
    d.getDay() + '.' + d.getMonth() + '.' + d.getFullYear() + ' ' +
    d.getHours() + ':' + d.getMinutes() + '.' + d.getSeconds()
  )

  const message = (
    'Request from ' + req.ip + ' at ' + currentTime + '\n' +
    'Method: ' + req.method + '\n' +
    'Path: ' + req.path + '\n' +
    'Body: ' + JSON.stringify(req.body) + '\n' +
    '---'
  )

  logger.info(message)
  logFileStream.write(message + '\n')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.body.token = authorization.substring(7)
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'cast error' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: 'invalid token' })
  }

  logger.error(error.message)
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).end()
}

module.exports = {
  requestLogger,
  tokenExtractor,
  errorHandler,
  unknownEndpoint
}