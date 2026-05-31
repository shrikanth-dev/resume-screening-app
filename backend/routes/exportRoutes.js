const express = require("express");

const router = express.Router();

const { exportResults } = require("../controllers/exportController");

router.post("/", exportResults);

module.exports = router;