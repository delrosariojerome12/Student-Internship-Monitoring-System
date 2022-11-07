const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllUsers = async (req, res) => {
  const user = await User.find({lastname});
  res.status(StatusCodes.OK).json({user});

  try {
    const users = await User.find({});
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({msg: error});
  }
};

const getUser = async (req, res) => {
  console.log("Test");
  res.json({msg: "test"});
  //   try {
  //     const {name} = req.params;
  //     const user = await User.findOne(...req.body);

  //     if (!user) {
  //       return res.status(404).json({msg: `No user with name : ${name}`});
  //     }

  //     res.status(200).json({user});
  //   } catch (error) {
  //     res.status(500).json({msg: error});
  //   }
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({user});
  try {
    const user = await User.create(req.body);
    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({msg: error});
  }
};
const updateUser = async (req, res) => {
  const {id} = req.params;
  res.json({id});

  /*if(firstname === '' || lastname === '' || email === '' || contactNumber === '' ||
            requiredHours === '' || companyName === '' || companyAddress === '' ||
            supervisorName === '')
        {

        }*/
};
const deleteUser = async (req, res) => {
  res.send("delete user");
};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUser,
};
