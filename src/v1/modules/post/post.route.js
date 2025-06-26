const express = require('express')
const PostController = require('./post.controller')

const postRouter = express.Router()

postRouter.get('/:communityId/posts', PostController.get)

module.exports = postRouter
