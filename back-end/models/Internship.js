const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
  companyName: {
    type: String,
    maxlength: 30,
    minlength: 2,
  },
  companyAddress: {
    type: String,
    maxlength: 70,
    minlength: 5,
  },
  supervisor: {
    type: String,
    maxlength: 20,
    minlength: 2,
  },
  supervisorContact: {
    type: String,
    match: [/^(09|\+639)\d{9}$/, "Please provide a valid number"],
  },
  typeOfWork: {
    type: String,
    maxlength: 20,
    minlength: 2,
  },
  logo: {
    type: Object,
    name: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  description: {
    type: String,
    maxlength: 100,
    minlength: 20,
  },
});

module.exports = mongoose.model("Internship", InternshipSchema);
