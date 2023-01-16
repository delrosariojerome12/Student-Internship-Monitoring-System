const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Document needs a name."],
    maxlength: 20,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Document needs a description."],
    maxlength: 50,
    minlength: 10,
  },
  type: {
    type: String,
    enum: {
      values: ["pdf", "docx", "image"],
      message: `{VALUE} is not supported`,
    },
    required: [true, "Document needs a type."],
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
