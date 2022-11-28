const mongoose = require("mongoose");
const {
  internshipDetails,
  internsAssets,
  verification,
} = require("./utils/internsDetails");

const schoolDetails = require("./utils/schoolDetails");

const InternSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  verification,
  internshipDetails,
  internsAssets,
  schoolDetails,
});

module.exports = mongoose.model("Intern", InternSchema);
