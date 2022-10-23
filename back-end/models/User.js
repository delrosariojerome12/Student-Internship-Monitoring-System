const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 20,
    minlength: 3,
    required: [true, " Please provide firstname"],
  },
  lastName: {
    type: String,
    maxlength: 20,
    minlength: 3,
    required: [true, " Please provide lastname"],
  },
  userName: {
    type: String,
    unique: true,
    required: [true, " Please provide username"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid username",
    ],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please provide password"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const match = await bcrypt.compare(canditatePassword, this.password);
  return match;
};

module.exports = mongoose.model("User", UserSchema);
