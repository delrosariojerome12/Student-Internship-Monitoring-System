const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  //document: {
  //type: Object,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please provide name of the document."],
  },
  link: {
    type: String,
  },
  path: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
