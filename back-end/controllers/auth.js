const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorize } = require("../errors");

//register
const signin = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.firstname }, token });
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorize("Invalid Credentials");
  }
  const correctPassword = await user.comparePassword(password);
  if (!correctPassword) {
    throw new Unauthorize("Invalid Credentials");
  }

  // compare pass
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.firstname }, token });
};

module.exports = {
  signin,
  login,
};
