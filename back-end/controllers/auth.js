require("dotenv").config();
const User = require("../models/User");
const Intern = require("../models/Intern");
const Admin = require("../models/Admin");
const Coordinator = require("../models/Coordinator");
const {StatusCodes} = require("http-status-codes");
const {BadRequest, Unauthorize, NotFound} = require("../errors");
const nodemailer = require("nodemailer");
const UserVerification = require("../models/UserVerification");
const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const generateCode = (length) => {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
const cleanUp = async () => {
  await UserVerification.deleteMany({expiry: {$lt: Date.now()}});
};

const signup = async (req, res) => {
  const {firstName, lastName, email, password, profileImage} = req.body;

  if (!firstName || !lastName || !email || !password || !profileImage) {
    throw new BadRequest("Credentials must be provided");
  }
  const user = await User.create({...req.body});

  User.createIndexes();

  const verificationCode = generateCode(4);
  const expiry = moment.tz("Asia/Manila").add(24, "hours").valueOf();
  const verification = new UserVerification({
    email,
    code: verificationCode,
    expiry,
  });
  await verification.save();

  await transporter.sendMail({
    from: '"Jerome Ramos - SIMS Lead Developer" <sims@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "SIMS - Signup Verification Code", // Subject line
    text: `Your verification code is: ${verificationCode}`, // plain text body
    html: `<div style="background-color: #457b9d; color: #f1faee;">
      <p style="font-size: 20px;">Your verification code is: <span style="color: #e63946;">${verificationCode}</span></p>
      <p style="font-size: 16px;">Thank you for using our service.</p>
       </div>`, // html body
  });

  //register

  if (user.role === "intern") {
    const intern = await (
      await Intern.create({user: user._id, email})
    ).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: intern,
      token,
    });
  }
  if (user.role === "admin") {
    const admin = await (
      await Admin.create({user: user._id})
    ).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: admin,
      token,
    });
  }
  if (user.role === "coordinator") {
    const {department} = req.body;
    const coordinator = await (
      await Coordinator.create({user: user._id, email, department})
    ).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: coordinator,
      token,
    });
  }
};

const verifyCode = async (req, res) => {
  const {email, code} = req.body;
  moment.tz.setDefault("Asia/Manila");
  // res.status(StatusCodes.OK).json({email, code});

  const verification = await UserVerification.findOne({email, code});

  console.log(verification);
  if (!verification || moment() > moment(verification.expiry)) {
    return res
      .status(400)
      .json({message: "Invalid verification code", success: false});
  }
  await User.updateOne({email}, {isVerified: true});

  const user = await User.findOne({email});

  if (user.role === "intern") {
    const intern = await Intern.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: intern,
      token,
      success: true,
    });
  }

  if (user.role === "admin") {
    const admin = await Admin.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: admin,
      token,
      success: true,
    });
  }

  if (user.role === "coordinator") {
    const coordinator = await Coordinator.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: coordinator,
      token,
      success: true,
    });
  }
};

//login
const login = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({email});

  if (!user) {
    throw new NotFound("User not found");
  }

  // compare pass
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Unauthorize("Incorrect email or password");
  }

  if (user.role === "intern") {
    const intern = await Intern.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: intern,
      token,
    });
  }

  if (user.role === "admin") {
    const admin = await Admin.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: admin,
      token,
    });
  }

  if (user.role === "coordinator") {
    const coordinator = await Coordinator.findOne({user}).populate({
      path: "user",
      model: "User",
    });

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: coordinator,
      token,
    });
  }
};

const forgotPassword = async (req, res) => {
  const {email} = req.body;

  if (!email) {
    throw new BadRequest("Please provide email");
  }

  const user = await User.findOne({email});

  if (!user) {
    throw new NotFound("User not found");
  }

  const verificationCode = generateCode(4);
  const expiry = moment.tz("Asia/Manila").add(24, "hours").valueOf();
  const verification = new UserVerification({
    email,
    code: verificationCode,
    expiry,
  });
  await verification.save();

  await transporter.sendMail({
    from: '"Jerome Ramos - SIMS Lead Developer" <sims@gmail.com>', // sender address
    to: `${email}`,
    subject: "SIMS - Password Reset Code", // Subject line
    text: `Your Reset code is: ${verificationCode}`, // plain text body
    html: `<div style="background-color: #457b9d; color: #f1faee;">
      <p style="font-size: 20px;">Your verification code is: <span style="color: #e63946;">${verificationCode}</span></p>
      <p style="font-size: 16px;">Thank you for using our service.</p>
       </div>`,
  });

  res
    .status(StatusCodes.OK)
    .json({msg: `Reset Code was send successfully to : ${email}`});
};

const resetPassword = async (req, res) => {
  const {email, password} = req.body;

  console.log(email, password);

  const user = await User.findOne({email});

  console.log(user);

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;

  await User.updateOne(
    {email},
    {
      $set: {
        password: hashedPassword,
      },
    },
    {new: true}
  );

  res.status(StatusCodes.OK).json({message: "Password reset successfully"});
};

module.exports = {
  signup,
  login,
  verifyCode,
  forgotPassword,
  resetPassword,
};
