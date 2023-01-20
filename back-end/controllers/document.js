const Document = require("../models/Document");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound, Duplicate} = require("../errors");

const getAllDocuments = async (req, res) => {
  const documents = await Document.find({});

  res.status(StatusCodes.OK).json({documents});
};

const createDocument = async (req, res) => {
  const {name, description, format} = req.body;

  if (!name || !description || !format) {
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
  const {name, description, type} = req.body;
  const {id} = req.params;

  // if (!name || !description || !type || !id) {
  // throw new BadRequest("Document details must be provided.");
  // }

  const documentExist = await Document.findOne({_id: id});

  if (!documentExist) {
    throw new NotFound("Document not found.");
  }
  const document = await Document.findOneAndUpdate({_id: id}, req.body, {
    new: true,
    runValidators: true,
  });

  const allDocuments = await Document.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Document Updated Successfully",
    data: {document, allDocuments},
  });
};

const deleteDocument = async (req, res) => {
  const {id} = req.params;
  console.log(id);
  const document = await Document.findOneAndDelete({_id: id});

  if (!document) {
    throw new NotFound("Document not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Document Deleted Successfully",
    data: document,
  });
};

module.exports = {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
};
