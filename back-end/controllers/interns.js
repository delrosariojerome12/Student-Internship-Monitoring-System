const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const getAllInterns = async (req, res) => {
  const { users } = req.body;
  const interns = await User.find({ users }).sort("createdAt");
  res.status(StatusCodes.OK).json({ interns, count: interns.length });
};

const getIntern = async (req, res) => {
  const { email } = req.params;
  const intern = await User.findOne({ email });

  if (!intern) {
    throw new NotFound(`No intern with email ${email}`);
  }
  res.status(StatusCodes.OK).json({ user: intern });
};

const updateIntern = async (req, res) => {
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

module.exports = { updateIntern, getIntern, getAllInterns };

//return password
