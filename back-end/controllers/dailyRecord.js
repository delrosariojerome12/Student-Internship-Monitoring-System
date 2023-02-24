const DailyRecord = require("../models/DailyRecord");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound, Duplicate } = require("../errors");
const Internship = require("../models/Internship");

const createDailyRecord = async (req, res) => {
  /*const { intern } = req.body;

  const isDuplicate = await Attendance.findOne({ intern });

  if (isDuplicate) {
    throw new Duplicate("User already exists.");
  }*/
  const Attendance = req.body;

  if (!user || !Array.isArray(attendance) || !attendance.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isDuplicate = await DailyRecord.findOne({ user });

  if (isDuplicate) {
    throw new Duplicate("Record already exists.");
  }
  const dailyRecord = await DailyRecord.create(req.body);
  DailyRecord.createIndexes();

  const allDailyRecords = await DailyRecord.find({});
  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      message: "Daily Record successfully added.",
      dailyRecord,
      allDailyRecords,
    },
  });
};

const getAllDailyRecord = async (req, res) => {
  /*const dailyRecord = await DailyRecord.find({});

  res.status(StatusCodes.OK).json({ dailyRecord });*/

  const dailyRecords = await DailyRecord.find({});

  res.status(StatusCodes.OK).json({ success: true, data: dailyRecords });
};

const getDailyRecord = async (req, res) => {
  const { email } = req.body;
  const dailyRecord = await DailyRecord.findOne({ email });

  if (!dailyRecord) {
    throw new NotFound(`No intern with such Daily Record ${email}`);
  }
  return res.status(StatusCodes.OK).json({ success: true, data: dailyRecord });
};

const updateDailyRecord = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  const isDuplicate = await DailyRecord.findOne({ email });

  if (!isDuplicate._id_equals(id)) {
    throw new Duplicate("Daily Record already exists");
  }

  const dailyRecord = await DailyRecord.findByIdAndUpdate(
    { _id: id, updateData },

    {
      new: true,
      runValidators: true,
    }
  );

  const allDailyRecords = await DailyRecord.find({});

  if (!dailyRecord) {
    throw new NotFound("Daily Record Not Found");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      message: "Daily Record Updated Successfully.",
      dailyRecord,
      allDailyRecords,
    },
  });
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
