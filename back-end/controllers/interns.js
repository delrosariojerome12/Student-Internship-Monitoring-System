const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound} = require("../errors");

const getAllInterns = async (req, res) => {
  const {users} = req.body;
  const interns = await User.find({users}).sort("createdAt");
  res.status(StatusCodes.OK).json({interns, count: interns.length});
};

const getIntern = async (req, res) => {
  const {email} = req.params;
  const user = await User.findOne({email});

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }
  res.status(StatusCodes.OK).json({user});
};

const updateIntern = async (req, res) => {
  const {
    email,
    internshipDetails: {
      companyName,
      companyAddress,
      contactNumber,
      requiredHours,
      renderedHours,
      supervisor,
    },
  } = req.body;

  if (
    !companyName ||
    !companyAddress ||
    !contactNumber ||
    !requiredHours ||
    !supervisor ||
    !renderedHours
  ) {
    throw new BadRequest("fields cannot be empty");
  }
  const user = await User.findOneAndUpdate({email}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }
  res.status(StatusCodes.OK).json({user});
};

module.exports = {updateIntern, getIntern, getAllInterns};

//password and id remove
