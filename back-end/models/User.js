const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide firstname"],
    maxlength: 20,
    minlength: 3,
  },
  lastName: {
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
    match: [
      /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
      "Password must have: Atleast 1 uppercase, 1 lowercase, 1 number, 1 special characters and minimum of 8 characters",
    ],
    minlength: 8,
  },
  role: {
    type: String,
    default: "intern",
  },
  // role: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Admin",
  //   },
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Intern",
  //     default: "Intern",
  //   },
  // ],
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const token = jwt.sign(
    {userId: this._id, name: this.firstname, email: this.email},
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
