const express = require("express");

const router = express.Router();

const upload = require(
  "../utils/multerConfig"
);

const {
  uploadResumes
} = require(
  "../controllers/uploadController"
);

router.post(
  "/",
  upload.array("resumes", 20),
  uploadResumes
);

module.exports = router;