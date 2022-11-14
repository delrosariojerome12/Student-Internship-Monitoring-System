const mongoose = require("mongoose");

const schoolDetails = new mongoose.Schema({
  program: {
    type: String,
    required: [true, "Please provide program"],
    maxlength: 50,
    minlength: 3,
  },
  department: {
    type: String,
    required: [true, "Please provide department"],
    maxlength: 50,
    minlength: 3,
  },
});

module.exports = schoolDetails;
