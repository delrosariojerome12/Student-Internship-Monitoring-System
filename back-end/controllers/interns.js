const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const updateUser = async (req, res) => {
  const {
    body: { internshipDetails },
    params: { email },
  } = req;
  const user = await User.findByIdAndUpdate({ email }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFound(`No user with email ${email}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = { updateUser };
