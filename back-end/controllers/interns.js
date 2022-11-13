const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const getAllInterns = async (req, res) => {
  res.send("Get All");
  // const interns = await User.find({ email: req.user.userId }).sort("createdAt");
  // res.status(StatusCodes.OK).json({ interns, count: interns.length });
};

const getInfos = async (req, res) => {
  res.send("get");
  const { userId } = req.body;

  const intern = await User.findOne({ userId });
  console.log(intern);

  // if (!intern) {
  //   throw new NotFound(`No intern with id ${email}`);
  // }
  // res.status(StatusCodes.OK).json({ intern });
};

const updateInfos = async (req, res) => {
  const { email, internshipDetails } = req.body;

  // if (
  //   !companyname ||
  //   !companyaddress ||
  //   !contactnumber ||
  //   !requiredhours ||
  //   !supervisor
  // ) {
  //   throw new BadRequest("fields cannot be empty");
  // }
  const intern = await User.findOneAndUpdate({ email }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!intern) {
    throw new NotFound(`No intern with id ${email}`);
  }
  res.status(StatusCodes.OK).json({ intern });
};

module.exports = { updateInfos, getInfos, getAllInterns };
