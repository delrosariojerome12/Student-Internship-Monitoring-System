const express = require("express");
const router = express.Router();

const {
  getAllInternship,
  getInternship,
  deleteInternship,
  updateInternship,
  createInternship,
} = require("../controllers/internship");

router.route("/getAllInternship").get(getAllInternship);

router.route("/getInternship").get(getInternship);

router.route("/createInternship").post(createInternship);
router.route("/updateInternship/:id").patch(updateInternship);
router.route("/deleteInternship/:id").delete(deleteInternship);

module.exports = router;
