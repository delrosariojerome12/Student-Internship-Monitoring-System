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
module.exports = {getAllInternship, getInternship};
