const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthorize, NotFound } = require("../errors");

//register
const signup = async (req, res) => {
  const { firstname, lastname, email, password, internshipDetails } = req.body;

  if (!firstname || !lastname || !email || !password || !internshipDetails) {
    throw new BadRequest("Credentials must be provided");
  }
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: `${user.firstname} ${user.lastname}`,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userID: user._id,
      infos: user.internshipDetails,
    },
    token,
  });
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });

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
    user: {
      name: `${user.firstname} ${user.lastname}`,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userID: user._id,
    },
    token,
  });
};

module.exports = {
  signup,
  login,
};
