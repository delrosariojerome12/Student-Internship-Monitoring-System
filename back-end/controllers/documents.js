const Document = require("../models/Document");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const createDocument = async (req, res) => {
  const document = await Document.create(req.body);
  res.status(StatusCodes.OK).json({ document });
};

module.exports = {
  createDocument,
};
