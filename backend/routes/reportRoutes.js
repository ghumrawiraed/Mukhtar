const express = require("express");
const router = express.Router();
const { generateReport, exportFilteredList } = require("../controllers/reportController");

router.post("/generate", generateReport);
router.post("/export-filtered-list", exportFilteredList);

module.exports = router;