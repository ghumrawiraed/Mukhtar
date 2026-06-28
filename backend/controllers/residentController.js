const { sequelize, models } = require("../config/db");
const { resident } = models;
const asyncHandler = require("express-async-handler");

const addResident = asyncHandler(async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const residentData = req.body;

    // Create Resident
    const newResident = await resident.create(residentData);

    res.status(201).json({
      success: true,
      message: "Resident saved successfully.",
      data: newResident,
    });
  } catch (error) {
    console.error("Error adding resident:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to save resident.",
    });
  }
});
const { Op } = require("sequelize");
//--------------------------------------
// GET ALL RESIDENTS (Pagination + Search)
//--------------------------------------
const getAllResident = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const offset = (page - 1) * limit;

    // Search
    const search = req.query.search?.trim() || "";

    let where = {};

    if (search) {
      where = {
        [Op.or]: [
          {
            first_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            father_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            family_name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            record_no: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    const { count, rows } = await resident.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      data: rows,
      currentPage: page,
      pageSize: limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

const getOneResident = asyncHandler(async (req, res) => {
  console.log("getOneResident controller running");
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
  const ResidentData = req.body;
  const residentId = req.params.id;
  console.log(residentId);

  const item = await resident.findByPk(residentId);

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
