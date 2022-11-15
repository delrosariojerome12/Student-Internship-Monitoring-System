const mongoose = require("mongoose");

const internsDetails = new mongoose.Schema({
  companyname: {
    type: String,
    required: [true, "Please provide company name"],
    maxlength: 50,
    minlength: 2,
  },
  companyaddress: {
    type: String,
    required: [true, "Please provide company address"],
    maxlength: 70,
    minlength: 10,
  },
  contactnumber: {
    type: String,
    required: [true, "Please provide contact number"],
    maxlength: 11,
    minlength: 1,
  },
  requiredhours: {
    type: String,
    required: [
      true,
      "Please provide the exact number of hours to be rendered.",
    ],
    maxlength: 4,
    minlength: 1,
  },
  supervisor: {
    type: String,
    required: [true, "Please provide supervisor name"],
    maxlength: 50,
    minlength: 5,
  },
});

const internsAssets = new mongoose.Schema({
  // profile img- bg image- notif - chat - feedback
  profileImage: {
    type: String,
  },
  backgroundImage: {
    type: String,
  },
  notification: {
    // type: mongoose.Schema.Types.ObjectId,
    notif: [],
  },
  chat: {
    // type: mongoose.Schema.Types.ObjectId,
    // required: [true, "Message is required!!!!"],
    // red: "users",
    messages: [],

    //sender, receiver and message
  },
  feedback: {
    feedBack: [],
  },
});

module.exports = { internsDetails, internsAssets };
