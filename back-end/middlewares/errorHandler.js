const CustomApiError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, msg: err.message });
};

module.exports = errorHandler;
