const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");

const createInfos = async (req, res) => {
  const {
    companyname,
    companyaddress,
    contactnumber,
    requiredhours,
    supervisor,
  } = req.body;

  const userMoreDetails = await User.create({
    companyname,
    companyaddress,
    contactnumber,
    requiredhours,
    supervisor,
  });

  if (userMoreDetails) {
    req.send(userMoreDetails);
  } else {
    res.status(500).send("unsuccesful");
  }

  // req.body.createdBy = req.user.userId;
  // const job = await Job.create(req.body);
  // res.status(StatusCodes.CREATED).json({ job });
};
// const updateUser = async (req, res) => {
//   const {
//     body: { internshipDetails },
//     params: { email },
//   } = req;
//   const user = await User.findByIdAndUpdate({ email }, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!user) {
//     throw new NotFound(`No user with email ${email}`);
//   }
//   res.status(StatusCodes.OK).json({ user });
// };

module.exports = { createInfos };
