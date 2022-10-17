const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  res.status(200).json({msg: "register"});
};
const login = async (req, res) => {
  res.status(200).json({msg: "login"});
};

module.exports = {
  register,
  login,
};
