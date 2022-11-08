const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const updateUser = async (req, res) => {
  const {
    body: {
      firstname,
      lastname,
      email,
      contactnumber,
      requiredhours,
      companyname,
      companyaddress,
      supervisorname,
    },
    params: { id: userId },
  } = req;
  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFound(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = { updateUser };
