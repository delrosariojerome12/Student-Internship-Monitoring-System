const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const internsDetails = new mongoose.Schema({
  companyname: {
    type: String,
    required: [true, "Please provide company name"],
    maxlength: 50,
    minlength: 2,
  },
  companyaddress: {
    type: String,
    required: [true, "Please provide company address"],
    maxlength: 70,
    minlength: 10,
  },
  contactnumber: {
    type: String,
    required: [true, "Please provide contact number"],
    maxlength: 11,
    minlength: 1,
  },
  requiredhours: {
    type: String,
    required: [
      true,
      "Please provide the exact number of hours to be rendered.",
    ],
    maxlength: 4,
    minlength: 1,
  },
  supervisor: {
    type: String,
    required: [true, "Please provide supervisor name"],
    maxlength: 50,
    minlength: 5,
  },
});

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide firstname"],
    maxlength: 20,
    minlength: 3,
  },
  lastname: {
    type: String,
    required: [true, "Please provide lastname"],
    maxlength: 20,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },

  internshipDetails: internsDetails,
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    { userId: this._id, name: this.firstname },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const match = await bcrypt.compare(canditatePassword, this.password);
  return match;
};

module.exports = mongoose.model("User", UserSchema);
