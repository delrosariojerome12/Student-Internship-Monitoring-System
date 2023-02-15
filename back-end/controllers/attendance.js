const Attendance = require("../models/Attendance");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound, Duplicate } = require("../errors");

const createAttendance = async (req, res) => {
  /*const { intern } = req.body;

  const isDuplicate = await Attendance.findOne({ intern });

  if (isDuplicate) {
    throw new Duplicate("User already exists.");
  }*/
  /*const {
    dateStarted,
    dateEnded,
    estimatedCompletion,
    dateOfDuty,
    day,
    timeIn,
    timeOut,
    accomplishments,
    regularHours,
    OTHours,
    remarks,
  } = req.body;*/

  req.body.user = req.user.userId;

  if (
    !dateStarted ||
    !dateEnded ||
    !estimatedCompletion ||
    !dateOfDuty ||
    !day ||
    !timeIn ||
    !timeOut ||
    !accomplishments ||
    !regularHours ||
    !OTHours ||
    !remarks
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const attendance = await Attendance.create(req.body);
  res.status(StatusCodes.OK).json({ attendance });
};

const getAllAttendance = async (req, res) => {
  /*const attendance = await Attendance.find({});

  res.status(StatusCodes.OK).json({ attendance });
};*/
  const { users } = req.body;
  const attendance = await Attendance.find({ users }, { _id: 0 }).populate({
    path: "intern",
    model: "User",
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
