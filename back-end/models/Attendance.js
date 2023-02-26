const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Please provide a valid date"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  isPresent: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: [true, "Please provide a valid location"],
  },
  proof: {
    type: Object,
    name: {
      type: String,
    },
    link: {
      type: String,
    },
    required: [true, "Please provide a img"],
  },
  timeIn: {
    type: String,
    required: [true, "Please provide a timein"],
  },
  timeOut: {
    type: String,
    default: "pending",
    // required: [true, "Please provide a timout"],
  },
  totalRendered: {
    type: String,
    default: "0",
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  isLate: {
    type: Boolean,
    default: false,
  },

  OT: {
    type: String,
    default: "0",
  },
  narrative: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Narrative",
    content: String,
    // remarks: {
    //   type: String,
    // },
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
