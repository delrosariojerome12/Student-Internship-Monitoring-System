const CustomApiError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  // console.log(err);
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, msg: err.message });
  }
  if (err.code === 11000) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      msg: "Account Already Exists",
      error: err.message,
    });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, msg: err.message });
};

module.exports = errorHandler;
