const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const getAllInfos = async (req, res) => {
  // res.send("Get All");
  const interns = await User.find({ _id: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ interns, count: interns.length });
};

const getSingleInfos = async (req, res) => {
  const { email } = req.body;
  const intern = await User.findOne({ email });

  if (!intern) {
    throw new NotFound(`No intern with email ${email}`);
  }
  res.status(StatusCodes.OK).json({ intern });
};

const updateInfos = async (req, res) => {
  const {
    email,
    internshipDetails: {
      companyname,
      companyaddress,
      contactnumber,
      requiredhours,
      supervisor,
    },
  } = req.body;

  if (
    !companyname ||
    !companyaddress ||
    !contactnumber ||
    !requiredhours ||
    !supervisor
  ) {
    throw new BadRequest("fields cannot be empty");
  }
  const intern = await User.findOneAndUpdate({ email }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!intern) {
    throw new NotFound(`No intern with email ${email}`);
  }
  res.status(StatusCodes.OK).json({ intern });
};

module.exports = { updateInfos, getSingleInfos, getAllInfos };
