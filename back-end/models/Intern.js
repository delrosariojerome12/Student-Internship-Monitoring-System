const mongoose = require("mongoose");

const InternSchema = new mongoose.Schema({
  name: {type: mongoose.Schema.Types.ObjectId, ref: "Name"},
});

module.exports = mongoose.model("Intern", InternSchema);
