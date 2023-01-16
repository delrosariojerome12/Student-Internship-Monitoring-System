const Document = require("../models/Document");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound, Duplicate} = require("../errors");

const getAllDocuments = async (req, res) => {
  const documents = await Document.find({});

  res.status(StatusCodes.OK).json({documents});
};

const createDocument = async (req, res) => {
  const {name, description, type} = req.body;
  if (!name || !description || !type) {
    throw new BadRequest("Document details must be provided.");
  }

  const isDuplicate = await Document.findOne({name});

  if (isDuplicate) {
    throw new Duplicate("Document already exist.");
  }

  const document = await Document.create({...req.body});

  Document.createIndexes();

  res.status(StatusCodes.OK).json({document});
};

const updateDocument = async (req, res) => {
  const {name, description, type, id} = req.body;

  if (!name || !description || !type || !id) {
    throw new BadRequest("Document details must be provided.");
  }

  const documentExist = await Document.findOne({_id: id});

  if (!documentExist) {
    throw new NotFound("Document not found.");
  }
  const document = await Document.findOneAndUpdate({_id: id}, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    document,
  });
};

const deleteDocument = async (req, res) => {
  const {id} = req.body;
  const document = await Document.findOneAndDelete({_id: id});

  res.status(StatusCodes.OK).json({
    document,
  });
};

module.exports = {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
};
