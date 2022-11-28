const User = require("../models/User");
const Intern = require("../models/Intern");
const Admin = require("../models/Admin");
const Coordinator = require("../models/Coordinator");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, Unauthorize, NotFound} = require("../errors");

//register
const signup = async (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new BadRequest("Credentials must be provided");
  }
  const user = await User.create({...req.body});

  if (user.role === "intern") {
    const intern = await (
      await Intern.create({user: user._id})
    ).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      intern,
      token,
    });
  }
  if (user.role === "admin") {
    const admin = await (
      await Admin.create({user: user._id})
    ).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      admin,
      token,
    });
  }
  if (user.role === "coordinator") {
    const coordinator = await (
      await Coordinator.create({user: user._id})
    ).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      coordinator,
      token,
    });
  }
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

  // compare pass
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Unauthorize("Incorrect email or password");
  }

  if (user.role === "intern") {
    const intern = await Intern.findOne({user}).populate({
      path: "user",
      model: "User",
    });
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      intern,
      token,
    });
  }

  if (user.role === "admin") {
    const admin = await Admin.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      admin,
      token,
    });
  }

  if (user.role === "coordinator") {
    const coordinator = await Coordinator.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      coordinator,
      token,
    });
  }
};

module.exports = {
  signup,
  login,
};
