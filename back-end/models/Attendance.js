const mongoose = require("mongoose");
const moment = require("moment-timezone");
const today = moment.tz("Asia/Manila").format("MM-DD-YYYY");

// const today = `${month < 10 ? "0" : ""}${month}-${
//   date < 10 ? "0" : ""
// }${date}-${year}`;

const AttendanceSchema = new mongoose.Schema({
  intern: {type: mongoose.Schema.Types.ObjectId, ref: "Intern"},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  date: {
    type: String,
    default: today,
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
  locationTimeIn: {
    type: String,
  },
  locationTimeOut: {
    type: String,
  },
  proof: {
    type: Object,
    timeInLink: {
      type: String,
    },
    timeOutLink: {
      type: String,
      default: "",
    },
    // required: [true, "Please provide a img"],
  },
  timeIn: {
    type: String,
    // required: [true, "Please provide a timein"],
  },
  timeOut: {
    type: String,
    default: null,
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
  missingTimeOut: {
    type: Boolean,
  },
  OT: {
    type: String,
    default: "0",
  },
  narrative: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Narrative",
    content: {
      type: String,
      default: "",
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
