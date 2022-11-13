const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const updateInfos = async (req, res) => {
  const { email, internshipDetails } = req.body;

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
    throw new NotFound(`No intern with id ${email}`);
  }
  res.status(StatusCodes.OK).json({ intern });
};

module.exports = { updateInfos };
