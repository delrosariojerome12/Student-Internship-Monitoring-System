const {BadRequest, NotFound, Duplicate} = require("../errors");
const {StatusCodes} = require("http-status-codes");
const Attendance = require("../models/Attendance");
const Intern = require("../models/Intern");
const {create} = require("../models/Attendance");
const mongoose = require("mongoose");

const getAllAttendance = async (req, res) => {
  const {email} = req.params;

  const userExists = await Intern.findOne({email});

  if (!userExists) {
    throw new NotFound("User not found");
  }

  const attendance = await Attendance.find({email});

  res.status(StatusCodes.OK).json({success: true, data: attendance});
};

const getAttendance = async (req, res) => {
  const {id} = req.params;

  const attendance = await Attendance.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  if (!attendance) {
    throw new NotFound("Attendance not found");
  }
  res.status(StatusCodes.OK).json({success: true, data: attendance});
};

const createAttendance = async (req, res) => {
  const {email} = req.params;

  if (!email) {
    throw new NotFound("Email not found");
  }
  const attendance = await Attendance.create({email, ...req.body});
  Attendance.createIndexes();
  res.status(StatusCodes.OK).json({success: true, data: attendance});
};

module.exports = {
  getAllAttendance,
  getAttendance,
  createAttendance,
};
