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
  const {} = req.body;

  const internship = await Internship.create({...req.body});

  res.status(StatusCodes.OK).json({success: true, data: {test: "Test"}});
};

const updateInternship = async (req, res) => {
  const {id} = req.params;
  res.status(StatusCodes.OK).json({success: true, data: {id}});
};

const deleteInternship = async (req, res) => {
  const {id} = req.params;

  res.status(StatusCodes.OK).json({success: true, data: {id}});
};

module.exports = {
  getAllInternship,
  getInternship,
  updateInternship,
  deleteInternship,
  createInternship,
};
