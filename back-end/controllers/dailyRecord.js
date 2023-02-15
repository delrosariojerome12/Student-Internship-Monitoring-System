const DailyRecord = require("../models/DailyRecord");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound, Duplicate } = require("../errors");

const createDailyRecord = async (req, res) => {
  /*const { intern } = req.body;

  const isDuplicate = await Attendance.findOne({ intern });

  if (isDuplicate) {
    throw new Duplicate("User already exists.");
  }*/
  const DailyRecord = req.body;

  if (!user || !Array.isArray(attendance) || !attendance.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isDuplicate = await DailyRecord.findOne({ user });

  if (isDuplicate) {
    throw new Duplicate("Record already exists.");
  }
  const dailyRecord = await DailyRecord.create(req.body);
  res.status(StatusCodes.OK).json({ dailyRecord });
};

const getAllDailyRecord = async (req, res) => {
  const { users } = req.body;
  /*const dailyRecord = await DailyRecord.find({});

  res.status(StatusCodes.OK).json({ dailyRecord });*/

  const dailyRecord = await DailyRecord.find({ users });

  res.status(StatusCodes.OK).json({ dailyRecord, count: dailyRecord.length });
};

const getDailyRecord = async (req, res) => {
  const { email } = req.params;
  const dailyRecordExists = await DailyRecord.findOne({ email });

  if (!dailyRecordExists) {
    throw new NotFound(`No intern with Daily Record ${email}`);
  }
  return res.status(StatusCodes.OK).json({ dailyRecordExists });
};

/*const deleteAttendance = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const attendance = await Document.findOneAndDelete({ _id: id });

  if (!attendance) {
    throw new NotFound("intern not found");
  }
};*/

module.exports = {
  getAllDailyRecord,
  getDailyRecord,
  createDailyRecord,
  //updateAttendance,
  //deleteAttendance,
};
