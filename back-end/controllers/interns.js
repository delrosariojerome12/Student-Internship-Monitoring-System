const Intern = require("../models/Intern");
const Document = require("../models/Document");
const Internship = require("../models/Internship");

const {StatusCodes} = require("http-status-codes");
const {BadRequest, NotFound, Duplicate} = require("../errors");
const moment = require("moment-timezone");
const axios = require("axios");
const cron = require("node-cron");
const getAllInterns = async (req, res) => {
  const {users} = req.body;
  const interns = await Intern.find({users}, {_id: 0}).populate({
    path: "user",
    model: "User",
  });
  res.status(StatusCodes.OK).json({interns, count: interns.length});
};

const getIntern = async (req, res) => {
  const {email} = req.params;
  const user = await Intern.findOne({email}).populate({
    path: "user",
    model: "User",
  });

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }
  return res.status(StatusCodes.OK).json({user});
};

const requestVerification = async (req, res) => {
  const {email} = req.body;

  const user = await Intern.findOneAndUpdate({email}, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: "user",
    model: "User",
  });

  if (!user) {
    throw new NotFound(`No intern with email ${email}`);
  }

  res.status(StatusCodes.OK).json({user});
};

const updateIntern = async (req, res) => {
  try {
    const {email, internshipDetails, verification} = req.body;

    const {isVerified, isRejected} = verification;

    const user = await Intern.findOne({email}).populate({
      path: "user",
      model: "User",
    });

    if (!user) {
      throw new NotFound(`Email not found`);
    }

    if (internshipDetails) {
      const {renderedHours, ...details} = internshipDetails;

      const doesExist = await Internship.findOne({
        companyName: details.companyName,
      });

      console.log(details);

      if (!doesExist) {
        var internship = await Internship.updateOne(
          {companyName: details.companyName},
          {$set: details},
          {upsert: true, new: true}
        );
      }

      const updateInternship = await Internship.findOneAndUpdate(
        {companyName: details.companyName},
        {$inc: {students: 1}},
        {new: true}
      );

      console.log(updateInternship);

      const interns = await Intern.find({}).populate({
        path: "user",
        model: "User",
      });

      const updateIntern = await Intern.findOneAndUpdate(
        {email},
        {verification},
        {new: true}
      );

      const allInternships = await Internship.find({});

      return res
        .status(StatusCodes.OK)
        .json({user, interns, internship, doesExist, allInternships});
    } else {
      const updateIntern = await Intern.findOneAndUpdate(
        {email},
        {verification},
        {new: true}
      );
    }

    // const updateIntern = await Intern.findOneAndUpdate(
    //   {email},
    //   {verification},
    //   {new: true}
    // );

    const interns = await Intern.find({}).populate({
      path: "user",
      model: "User",
    });

    return res.status(StatusCodes.OK).json({user, interns});
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: error.message});
  }
};

const updateDocuments = async (req, res) => {
  const {email} = req.params;
  const documents = await Document.find({});

  const modifiedDocuments = documents
    .map((item) => {
      const {_id, name, format, sample, description} = item;
      return {
        document: {_id, name, format, sample, description},
        completion: {
          hasSent: false,
          isRejected: false,
          isApproved: false,
          sentDocument: null,
          filePath: "",
          fileName: "",
        },
      };
    })
    .sort((a, b) => {
      let fa = a.document.name.toLowerCase(),
        fb = b.document.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails: modifiedDocuments},
    {
      new: true,
      runValidators: true,
    }
  ).populate({
    path: "user",
    model: "User",
  });
  res.status(StatusCodes.OK).json({intern});
};

const enrollInternship = async (req, res) => {
  const {email} = req.params;

  const {
    params: {companyName},
  } = req.body;

  const internExists = await Intern.find({email}).populate({
    path: "user",
    model: "User",
  });

  if (!internExists) {
    throw new NotFound(`No intern with email ${email}`);
  }

  // if (!internshipExists) {
  //   throw new NotFound(`No internship with name of ${companyName}`);
  // }

  // const internship = await Internship.findOneAndUpdate(
  //   {companyName},
  //   {$inc: {students: 1}},
  //   {new: true}
  // );

  const internship = await Internship.findOne({companyName});

  const enrolledIntern = await Intern.findOneAndUpdate(
    {email},
    {internshipDetails: {...internship}},
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });

  const allInternships = await Internship.find({});

  res
    .status(StatusCodes.OK)
    .json({success: true, data: {enrolledIntern, allInternships}});
};

const unEnrolledInternship = async (req, res) => {
  const {email} = req.params;

  const {
    params: {companyName},
  } = req.body;

  const internExists = await Intern.find({email}).populate({
    path: "user",
    model: "User",
  });
  // const internshipExists = await Internship.find({companyName});

  if (!internExists) {
    throw new NotFound(`No intern with email ${email}`);
  }

  // if (!internshipExists) {
  //   throw new NotFound(`No internship with name of ${companyName}`);
  // }

  // const internship = await Internship.findOneAndUpdate(
  //   {companyName},
  //   {$inc: {students: -1}},
  //   {new: true}
  // );

  const emptyObject = {
    companyName: "",
    companyAddress: "",
    logo: "",
    supervisor: "",
    supervisorContact: "",
    typeOfWork: "",
    description: "",
    email: "",
  };

  const enrolledIntern = await Intern.findOneAndUpdate(
    {email},
    {internshipDetails: {...emptyObject}},
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });

  const allInternships = await Internship.find({});
  res
    .status(StatusCodes.OK)
    .json({success: true, data: {enrolledIntern, allInternships}});
};

const sendDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {
      documentDetails,
    },
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });

  res.status(StatusCodes.OK).json(intern);
};

const removeDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails},
    {new: true}
  ).populate({path: "user", model: "User"});

  res.status(StatusCodes.OK).json(intern);
};

const getAllVerifiedInterns = async (req, res) => {
  const interns = await Intern.find({
    // verification: {isVerified: true},
  }).populate({
    path: "user",
    model: "User",
  });

  const documents = await Document.find({});

  res.status(StatusCodes.OK).json({interns, totalDocuments: documents.length});
};

const approveDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails},
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });
  if (!intern) {
    throw new NotFound("Intern not found");
  }

  res.status(StatusCodes.OK).json(intern);
};

const rejectDocument = async (req, res) => {
  const {email} = req.params;
  const {documentDetails} = req.body;

  const intern = await Intern.findOneAndUpdate(
    {email},
    {documentDetails},
    {new: true}
  ).populate({
    path: "user",
    model: "User",
  });

  if (!intern) {
    throw new NotFound("Intern not found");
  }

  res.status(StatusCodes.OK).json(intern);
};

const runCheckAbsents = async () => {
  try {
    // const response = await axios.post(
    //   "http://localhost:5000/attendance/checkAbsents"
    // );
    const response = await axios.post(
      "https://sims-twqb.onrender.com/attendance/checkAbsents"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

cron.schedule(
  "0 19 * * 1-5",
  () => {
    const currentTime = moment().tz("Asia/Manila");
    if (currentTime.hour() === 19 && currentTime.minute() === 0) {
      console.log("running");
      runCheckAbsents();
    }
  },
  {
    timezone: "Asia/Manila",
  }
);

module.exports = {
  updateIntern,
  getIntern,
  getAllInterns,
  requestVerification,
  updateDocuments,
  sendDocument,
  removeDocument,
  getAllVerifiedInterns,
  approveDocument,
  rejectDocument,
  enrollInternship,
  unEnrolledInternship,
};
