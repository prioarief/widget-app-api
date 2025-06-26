const express = require('express')
const HealthController = require('./health.controller')

const healthRouter = express.Router()

healthRouter.get('/check', HealthController.healthCheck)

module.exports = healthRouter
