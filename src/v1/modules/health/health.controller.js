const http_response = require("../../helpers/http_response")

class HealthController {
  static async healthCheck(req, res, next) {
    try {
      return http_response(res, 200, 'OK')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = HealthController