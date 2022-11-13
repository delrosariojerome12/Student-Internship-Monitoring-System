const express = require("express");
const router = express.Router();

const {
  updateInfos,
  getInfos,
  getAllInterns,
} = require("../controllers/interns");

router.route("/").patch(updateInfos).get(getAllInterns);
router.route("/:id").get(getInfos);

module.exports = router;
