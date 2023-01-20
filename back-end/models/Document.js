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
    maxlength: 100,
    minlength: 10,
  },
  format: {
    type: String,
    enum: {
      values: ["pdf", "docx", "image"],
      message: `{VALUE} is not supported.`,
    },
    required: [true, "Document needs a type."],
  },
  sample: {
    type: Object,
    name: {
      type: String,
    },
    link: {
      type: String,
      default:
        "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/pavelstasevich181101028.jpg?ver=6",
    },
  },
  // purpose: {
  //   type: String,
  //   enum: {
  //     values: [""],
  //     message: `{VALUE} is not supported.`,
  //   },
  //   required: [true, "Document needs a purpose."],
  // },
});

module.exports = mongoose.model("Document", DocumentSchema);
