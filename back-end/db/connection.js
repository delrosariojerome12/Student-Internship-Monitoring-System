const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log("Connected To DB");
};

module.exports = connectDB;
