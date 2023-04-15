const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema({
  email: {type: String, required: true},
  code: {type: String, required: true},
  expiry: {type: Date, required: true},
});

const UserVerification = mongoose.model(
  "UserVerification",
  UserVerificationSchema
);

module.exports = UserVerification;
