const Internship = require("../models/Internship");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound, Duplicate} = require("../errors");

const getAllInternship = async (req, res) => {
  const internships = await Internship.find({});

  res.status(StatusCodes.OK).json({success: true, data: internships});
};

const getInternship = async (req, res) => {
  const {companyName} = req.body;

  const internship = await Internship.find({companyName});

  if (!internship) {
    throw new NotFound("Internship not found");
  }

  res.status(StatusCodes.OK).json({success: true, data: internship});
};

const createInternship = async (req, res) => {
  const {
    companyName,
    companyAddress,
    supervisor,
    supervisorContact,
    email,
    typeOfWork,
    logo,
    description,
  } = req.body;

  if (
    !companyName ||
    !companyAddress ||
    !supervisor ||
    !supervisorContact ||
    !supervisorContact ||
    !email ||
    !typeOfWork ||
    !logo ||
    !description
  ) {
    throw new BadRequest("Missing required fields");
  }

  const isDuplicate = await Internship.findOne({companyName});

  if (isDuplicate) {
    throw new Duplicate("Internship already exists");
  }

  const internship = await Internship.create({...req.body});
  Internship.createIndexes();

  const allInternships = await Internship.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      message: "Internship successfully added.",
      internship,
      allInternships,
    },
  });
};

const updateInternship = async (req, res) => {
  const {id} = req.params;
  const {companyName} = req.body;

  const isDuplicate = await Internship.findOne({companyName});

  if (isDuplicate && !isDuplicate._id.equals(id)) {
    throw new Duplicate("Internship already exists");
  }

  const internship = await Internship.findOneAndUpdate({_id: id}, req.body, {
    new: true,
    runValidators: true,
  });

  const allInternships = await Internship.find({});

  if (!internship) {
    throw new NotFound("Internship not found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      message: "Internship Updated successfully.",
      internship,
      allInternships,
    },
  });
};

const deleteInternship = async (req, res) => {
  const {id} = req.params;

  const internship = await Internship.findOneAndDelete({_id: id});

  if (!internship) {
    throw new NotFound("Internship not found");
  }

  const allInternships = await Internship.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    data: {message: "Document Deleted Successfully.", allInternships},
  });
};

module.exports = {
  getAllInternship,
  getInternship,
  updateInternship,
  deleteInternship,
  createInternship,
};
