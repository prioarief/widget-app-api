const express = require('express')
const healthRouter = require('./health/health.route')
const postRouter = require('./post/post.route')

const v1Router = express.Router()

v1Router.use('/health', healthRouter)
// v1Router.use('/posts', postRouter)
v1Router.use('/', postRouter)

module.exports = v1Router
