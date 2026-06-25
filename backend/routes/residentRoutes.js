const express = require("express");
const protect = require("../middleware/authMiddleware");

const { models } = require("../config/db");
const { resident } = models;

const {
  addResident,
  getOneResident,
  getAllResident,
  updateResident,
  removeResident,
  getResidentByRecordNo,
} = require("../controllers/residentController");

const router = express.Router();

router.post("/new", addResident);
router.get("/:id", getOneResident);
router.get("/byrec/:recordNo", getResidentByRecordNo);
router.get("/", getAllResident);
router.patch("/:id", updateResident);
router.delete("/:id", removeResident);

module.exports = router;
