const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
  companyName: {
    type: String,
    maxlength: 50,
    minlength: 2,
    required: [true, "Please provide company name"],
  },
  companyAddress: {
    type: String,
    maxlength: 70,
    minlength: 5,
    required: [true, "Please provide company address"],
  },
  supervisor: {
    type: String,
    maxlength: 20,
    minlength: 2,
    required: [true, "Please provide supervisor name"],
  },
  supervisorContact: {
    type: String,
    match: [/^(09|\+639)\d{9}$/, "Please provide a valid number"],
    required: [true, "Please provide a valid number"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  typeOfWork: {
    type: String,
    maxlength: 20,
    minlength: 2,
    required: [true, "Please provide type of work"],
  },
  logo: {
    required: [true, "Please provide logo"],
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
    required: [true, "Please provide description"],
  },
  students: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("Internship", InternshipSchema);
