const CustomError = require("./customError");
const {StatusCodes} = require("http-status-codes");

class Unauthorize extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorize;
