module.exports = (statusCode, message) => {
  const customError = new Error()
  customError.status = statusCode
  customError.message = message

  return customError
}
