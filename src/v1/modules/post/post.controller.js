const http_response = require('../../helpers/http_response');
const load_data = require('../../helpers/load_data');
const PostValidation = require('./post.validation');

class PostController {
  static async get(req, res, next) {
    try {
      PostValidation.get(req.params);

      const { communityId } = req.params;
      const posts = await load_data(+communityId);

      return http_response(res, 200, 'Success get posts', posts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
