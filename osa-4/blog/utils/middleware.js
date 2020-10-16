const logger = require('./logger')
const rfs = require('rotating-file-stream')

const logFileStream = rfs.createStream('access.log', {
  interval: '1d', // Rotate daily
  path: `${__dirname}/../log`
})

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

const unknownEndpoint = (req, res) => {
  res.status(404).end()
}

const errorHandler = (error, req, res, next) => {
  return res.status(400).send(error.message)
  // TODO specify
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}