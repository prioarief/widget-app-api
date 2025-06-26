const custom_error = require("./custom_error")

module.exports = (schema, req) => {
  const { error } = schema.validate(req, {
    abortEarly: false,
    allowUnknown: true,
  })

  if (error) {
    const errorResponse = []
    error.details.forEach((e) => {
      errorResponse.push(e.message)
    })

    const messages =
      errorResponse.length > 1
        ? errorResponse.slice(0, -1).join(', ') + ' and ' + errorResponse.slice(-1)
        : errorResponse.join(',')

    throw custom_error(400, messages)
  }
}
