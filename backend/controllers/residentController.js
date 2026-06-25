const { sequelize, models } = require("../config/db");
const { resident } = models;
const asyncHandler = require("express-async-handler");

const addResident = asyncHandler(async (req, res) => {
  console.log(req.body);
  const residentData = req.body;

  // Create Resident
  const newResident = await resident.create(residentData);

  res.status(201).json({
    message: "Resident saved",
    data: newResident,
  });
});

//--------------------------------------
// GET ALL (with pagination & relations)
//--------------------------------------
const getAllResident = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5000;
    const offset = (page - 1) * limit;

    const where = req.query.filter ? JSON.parse(req.query.filter) : {};

    const order = req.query.sort
      ? JSON.parse(req.query.sort)
      : [["id", "DESC"]];

    const include = resident.associations
      ? Object.values(resident.associations).map((assoc) => ({
          association: assoc,
        }))
      : [];

    const { count, rows } = await resident.findAndCountAll({
      where,
      include,
      limit,
      offset,
      order,
    });

    res.json({
      total: count,
      page,
      pages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneResident = asyncHandler(async (req, res) => {
  const item = await resident.findByPk(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json(item);
});

const getResidentByRecordNo = asyncHandler(async (req, res) => {
  const item = await resident.findAndCountAll({
    where: {
      record_no: req.params.recordNo,
    },
  });

  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json(item);
});

const removeResident = asyncHandler(async (req, res) => {
  const item = await resident.findByPk(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }

  await item.destroy();

  res.json({ message: "Deleted successfully" });
});

const updateResident = asyncHandler(async (req, res) => {
  const { ResidentData } = req.body;
  const residentId = req.params.id;

  const item = await Resident.findByPk(residentId);

  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }

  await item.update(ResidentData);

  res.json({ message: "Resident updated successfully" });
});

module.exports = {
  addResident,
  getOneResident,
  getAllResident,
  updateResident,
  removeResident,
  getResidentByRecordNo,
};
