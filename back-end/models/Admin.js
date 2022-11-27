const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {type: mongoose.Schema.Types.ObjectId, ref: "Name"},
});

module.exports = mongoose.model("Admin", AdminSchema);
