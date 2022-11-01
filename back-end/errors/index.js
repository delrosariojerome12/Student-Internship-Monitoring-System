const BadRequest = require("./badRequest");
const NotFound = require("./notFound");
const Unauthorize = require("./unauthorize");
const CustomError = require("./customError");
const AlreadyExists = require("./accountAlreadyExists");

module.exports = {
  BadRequest,
  NotFound,
  Unauthorize,
  CustomError,
  AlreadyExists,
};
