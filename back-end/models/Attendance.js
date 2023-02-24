const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  //intern: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  //img: {},

  dateStarted: {
    type: String,
    required: [true, "Please enter the date started."],
    maxlength: 8,
  },
  dateEnded: {
    type: String,
    required: [true, "Please enter dated ended."],
  },
  estimatedCompletion: {
    type: String,
    required: [true, "Please enter estimated completion."],
  },
  dateOfDuty: {
    type: String,
    required: [true, "Please enter the date."],
    maxlength: 8,
  },
  day: {
    type: String,
    required: [true, "Please enter the day"],
    maxlength: 10,
  },
  timeIn: {
    type: String,
    required: [true, "Please enter timeIn."],
    maxlength: 10,
  },
  timeOut: {
    type: String,
    required: [true, "Please enter timeOut."],
  },
  accomplishments: {
    type: String,
    required: [true, "Please enter accomplishments"],
  },
  regularHours: {
    type: String,
  },
  OTHours: {
    type: String,
  },
  remarks: {
    type: String,
    required: [true, "Please enter accomplishments"],
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
