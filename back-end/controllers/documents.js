const Document = require("../models/Document");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const createDocument = async (req, res) => {
  try {
    const document = await Document.create(req.body);
    res.status(201).json({ document });
  } catch (error) {
    res.status(201).json({ msg: error });
  }
};

module.exports = {
  createDocument,
};
