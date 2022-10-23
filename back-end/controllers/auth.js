const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorize } = require("../errors");

const signin = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.firstName }, token });
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new BadRequest("Please proviide email and password");
  }

  const user = await User.findOne({ userName });
  if (!user) {
    throw new Unauthorize("Invalid Credentials");
  }

  const correctPassword = await user.comparePassword(password);
  if (!correctPassword) {
    throw new Unauthorize("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.firstName }, token });
};

module.exports = {
  signin,
  login,
};
