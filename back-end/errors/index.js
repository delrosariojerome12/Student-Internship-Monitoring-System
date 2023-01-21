const BadRequest = require("./badRequest");
const NotFound = require("./notFound");
const Unauthorize = require("./unauthorize");
const CustomError = require("./customError");
const AlreadyExists = require("./accountAlreadyExists");
const Duplicate = require("./duplicate");

module.exports = {
  BadRequest,
  NotFound,
  Unauthorize,
  CustomError,
  AlreadyExists,
  Duplicate,
};
