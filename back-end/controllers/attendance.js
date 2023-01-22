const Attendance = require("../models/Attendance");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound, Duplicate } = require("../errors");

const createAttendance = async (req, res) => {
  const { user } = req.body;

  const isDuplicate = await Attendance.findOne({ user });

  if (isDuplicate) {
    throw new Duplicate("User already exists.");
  }
  const attendance = await Attendance.create({ ...req.body });
  res.status(StatusCodes.OK).json({ attendance });
};

const getAllAttendance = async (req, res) => {
  const { users } = req.body;
  const attendance = await Attendance.find({ users }, { _id: 0 }).populate({
    path: "user",
    model: "Attendance",
  });

  res.status(StatusCodes.OK).json({ attendance });
};

const getAttendance = async (req, res) => {
  const { id } = req.params;
  const attendance = await Attendance.findOne({ id }).populate({
    path: "user",
    model: "Attendance",
  });
};

const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const attendance = await Document.findOneAndDelete({ _id: id });

  if (!attendance) {
    throw new NotFound("intern not found");
  }
};

module.exports = {
  getAllAttendance,
  getAttendance,
  createAttendance,
  //updateAttendance,
  deleteAttendance,
};
