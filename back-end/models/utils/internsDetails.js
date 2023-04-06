const mongoose = require("mongoose");

const internshipDetails = {
  companyName: {
    type: String,
    maxlength: 75,
    minlength: 2,
  },
  companyAddress: {
    type: String,
    maxlength: 100,
    minlength: 5,
  },
  supervisor: {
    type: String,
    maxlength: 50,
    minlength: 2,
  },
  supervisorContact: {
    type: String,
    match: [/^(09|\+639)\d{9}$/, "Please provide a valid number"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  description: {
    type: String,
    maxlength: 100,
    minlength: 20,
  },
  typeOfWork: {
    type: String,
    maxlength: 20,
    minlength: 2,
  },
  logo: {
    type: Object,
    name: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  renderedHours: {
    type: String,
    default: "0",
    maxlength: 5,
    minlenght: 1,
  },
  startingDate: {type: String},
};

const internsAssets = {
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
};

const verification = {
  isVerified: {
    type: Boolean,
    default: false,
  },
  hasSentVerification: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  remarks: {
    type: String,
  },
  requests: {
    requestedForMOA: Boolean,
    requestedForEndoresement: Boolean,
  },
};

const documentDetails = [
  new mongoose.Schema({
    document: {
      name: String,
      format: String,
      sample: String,
      description: String,
    },
    completion: {
      hasSent: Boolean,
      isRejected: Boolean,
      isApproved: Boolean,
      sentDocument: String,
      filePath: String,
      fileName: String,
    },
  }),
];

module.exports = {
  internshipDetails,
  internsAssets,
  verification,
  documentDetails,
};
