const express = require("express");

const router = express.Router();

const upload = require('../utils/multerConfig');

const { analyzeResumes } = require("../controllers/analysisController");

router.post("/", upload.array("resumes", 20),
analyzeResumes
);
module.exports = router;