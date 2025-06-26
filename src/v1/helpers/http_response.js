module.exports = (res, statusCode, message, result = null) => {
  const successCodes = [200, 201];
  const response = {
    code: successCodes.includes(statusCode) ? 1 : 0,
    message: message,
    data: result,
  };

  return res.status(statusCode).json(response);
};
