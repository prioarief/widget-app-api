const express = require('express')
const healthRouter = require('./health/health.route')

const v1Router = express.Router()

v1Router.use('/health', healthRouter)

module.exports = v1Router
