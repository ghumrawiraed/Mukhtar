const express = require("express");
const protect = require("../middleware/authMiddleware");

const { models } = require("../config/db");
const { list } = models;

const {
  addList,
  getOneList,
  getAllList,
  updateList,
  removeList,
  getListByRecordNo,
} = require("../controllers/listController");

const router = express.Router();

router.post("/new", addList);
router.get("/:id", getOneList);
router.get("/byrec/:recordNo", getListByRecordNo);
router.get("/", getAllList);
router.patch("/:id", updateList);
router.delete("/:id", removeList);

module.exports = router;
