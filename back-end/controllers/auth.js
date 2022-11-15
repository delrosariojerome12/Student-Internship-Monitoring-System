const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, Unauthorize, NotFound} = require("../errors");

//register
const signup = async (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new BadRequest("Credentials must be provided");
  }
  const user = await User.create({...req.body});

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userID: user._id,
      isValidated: user.isValidated,
    },
    token,
  });
};

//login
const login = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({email});

  if (!user) {
    throw new NotFound("User not found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Unauthorize("Incorrect email or password");
  }

  // compare pass
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

module.exports = {
  signup,
  login,
};
