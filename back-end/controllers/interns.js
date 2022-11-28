const User = require("../models/User");
const Intern = require("../models/Intern");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound} = require("../errors");

const getAllInterns = async (req, res) => {
  const {users} = req.body;
  const interns = await Intern.find({users}, {_id: 0})
    .populate({path: "user", model: "User"})
    // .sort("firstName")
    .select("email -password");
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
  const user = await Intern.findOneAndUpdate({email}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFound(`Email not found`);
  }
  return res.status(StatusCodes.OK).json({user});
};

const requestVerification = async (req, res) => {
  const {email} = req.body;
  const user = await User.findOneAndUpdate({email}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }

  res.status(StatusCodes.OK).json({user});
};

module.exports = {
  updateIntern,
  getIntern,
  getAllInterns,
  requestVerification,
};

//password and id remove
