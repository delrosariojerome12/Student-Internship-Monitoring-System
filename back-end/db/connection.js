const mongoose = require("mongoose");

const connectDB = async (uri) => {
  await mongoose.connect(uri);
  console.log("Connected To DB");
};

module.exports = connectDB;
