const mongoose = require("mongoose");

const DocumentsSchema = new mongoose.Schema({
  documents: {
    name: {
      type: String,
      required: [true, "Please provide name of the document."],
      maxlength: 20,
      minlength: 2,
    },
    link: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
