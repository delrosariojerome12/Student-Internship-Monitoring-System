const express = require("express");
const router = express.Router();

const {
  getAllDocuments,
  createDocument,
  deleteDocument,
  updateDocument,
} = require("../controllers/document");

router.route("/getAllDocuments").get(getAllDocuments);
router.route("/createDocument").post(createDocument);
router.route("/updateDocument/:id").patch(updateDocument);
router.route("/deleteDocument/:id").delete(deleteDocument);

module.exports = router;
