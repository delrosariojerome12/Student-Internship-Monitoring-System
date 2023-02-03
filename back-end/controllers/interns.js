const Intern = require("../models/Intern");
const Document = require("../models/Document");

const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound} = require("../errors");

const getAllInterns = async (req, res) => {
  const {users} = req.body;
  const interns = await Intern.find({users}, {_id: 0}).populate({
    path: "user",
    model: "User",
  });
  res.status(StatusCodes.OK).json({interns, count: interns.length});
};

const getIntern = async (req, res) => {
  const {email} = req.params;
  const user = await Intern.findOne({email}).populate({
    path: "user",
    model: "User",
  });

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }
  return res.status(StatusCodes.OK).json({user});
};

const requestVerification = async (req, res) => {
  const {email} = req.body;
  const user = await Intern.findOneAndUpdate({email}, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: "user",
    model: "User",
  });

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }

  res.status(StatusCodes.OK).json({user});
};

const updateIntern = async (req, res) => {
  const {email} = req.body;
  const user = await Intern.findOneAndUpdate({email}, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: "user",
    model: "User",
  });

  if (!user) {
    throw new NotFound(`Email not found`);
  }
  return res.status(StatusCodes.OK).json({user});
};

const updateDocuments = async (req, res) => {
  const {email} = req.params;
  const documents = await Document.find({});

  const modifiedDocuments = documents.map((item) => {
    const {_id, name, format, sample, description} = item;
    return {
      document: {_id, name, format, sample, description},
      completion: {
        hasSent: false,
        isRejected: false,
        isApproved: false,
        sentDocument: null,
        filePath: "",
        fileName: "",
      },
    };
  });

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails: modifiedDocuments},
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "user",
    model: "User",
  });
  res.status(StatusCodes.OK).json({intern});
};

const sendDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {
      documentDetails,
    },
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });

  res.status(StatusCodes.OK).json(intern);
};

const removeDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails},
    {new: true}
  ).populate({path: "user", model: "User"});

  res.status(StatusCodes.OK).json(intern);
};

const getAllVerifiedInterns = async (req, res) => {
  const interns = await Intern.find({
    // verification: {isVerified: true},
  }).populate({
    path: "user",
    model: "User",
  });

  const documents = await Document.find({});

  res.status(StatusCodes.OK).json({interns, totalDocuments: documents.length});
};

const approveDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails},
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });

  res.status(StatusCodes.OK).json(intern);
};

const rejectDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails},
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });

  res.status(StatusCodes.OK).json(intern);
};

module.exports = {
  updateIntern,
  getIntern,
  getAllInterns,
  requestVerification,
  updateDocuments,
  sendDocument,
  removeDocument,
  getAllVerifiedInterns,
  approveDocument,
  rejectDocument,
};
