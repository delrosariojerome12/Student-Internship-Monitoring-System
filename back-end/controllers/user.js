const User = require("../models/User");
const Intern = require("../models/Intern");
const Admin = require("../models/Admin");
const Coordinator = require("../models/Coordinator");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound} = require("../errors");

const getUser = async (req, res) => {
  const {email} = req.params;

  const user = await User.findOne({email});

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }

  if (user.role === "intern") {
    const intern = await Intern.findOne({user}).populate({
      path: "user",
      model: "User",
    });
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: intern,
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
      user: admin,
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
      user: coordinator,
      token,
    });
  }
};

module.exports = {
  getUser,
};
