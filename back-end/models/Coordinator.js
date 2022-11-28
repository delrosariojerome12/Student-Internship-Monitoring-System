const mongoose = require("mongoose");

const CoordinatorSchema = new mongoose.Schema({
  department: {
    type: String,
  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

module.exports = mongoose.model("Coordinator", CoordinatorSchema);
