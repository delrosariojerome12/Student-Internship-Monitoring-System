const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  document: {
    type: Object,
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
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Document", DocumentSchema);
