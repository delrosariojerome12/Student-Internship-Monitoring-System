const mongoose = require("mongoose");

const DailyRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  attendance: {
    type: mongoose.Schema.Types.Array,
    required: true,
    ref: "Attendance",
  },
});

module.exports = mongoose.model("DailyRecord", DailyRecordSchema);
