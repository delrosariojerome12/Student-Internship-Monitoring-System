const express = require("express");
const router = express.Router();

const {
  updateInfos,
  getSingleInfos,
  getAllInfos,
} = require("../controllers/interns");

router.route("/getallintern").get(getAllInfos);
router.route("/getintern").get(getSingleInfos);
router.route("/updateintern").patch(updateInfos);

module.exports = router;
