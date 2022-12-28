const mongoose = require("mongoose");
const {
  internshipDetails,
  internsAssets,
  verification,
} = require("./utils/internsDetails");

const schoolDetails = require("./utils/schoolDetails");
const scheduleDetails = require("./utils/scheduleDetails");

const InternSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  verification,
  internshipDetails,
  internsAssets,
  schoolDetails,
  scheduleDetails,
});

module.exports = mongoose.model("Intern", InternSchema);
