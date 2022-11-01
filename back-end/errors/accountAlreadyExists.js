const CustomAPIError = require("./customError");
const {StatusCodes} = require("http-status-codes");

class AlreadyExists extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

module.exports = AlreadyExists;
