const { sequelize, models } = require("../config/db");
const { list } = models;
const asyncHandler = require("express-async-handler");

const addList = asyncHandler(async (req, res) => {
  console.log(req.body);
  const listData = req.body;

  // Create List
  const newList = await list.create(listData);

  res.status(201).json({
    message: "List saved",
    data: newList,
  });
});

//--------------------------------------
// GET ALL (with pagination & relations)
//--------------------------------------
const getAllList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5000;
    const offset = (page - 1) * limit;

    const where = req.query.filter ? JSON.parse(req.query.filter) : {};

    const order = req.query.sort
      ? JSON.parse(req.query.sort)
      : [["id", "DESC"]];

    const include = list.associations
      ? Object.values(list.associations).map((assoc) => ({
          association: assoc,
        }))
      : [];

    const { count, rows } = await list.findAndCountAll({
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

const getOneList = asyncHandler(async (req, res) => {
  const item = await list.findByPk(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }

  res.json(item);
});

const getListByRecordNo = asyncHandler(async (req, res) => {
  const item = await list.findAndCountAll({
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

const removeList = asyncHandler(async (req, res) => {
  const item = await list.findByPk(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }

  await item.destroy();

  res.json({ message: "Deleted successfully" });
});

const updateList = asyncHandler(async (req, res) => {
  const { ListData } = req.body;
  const listId = req.params.id;

  const item = await List.findByPk(listId);

  if (!item) {
    res.status(404);
    throw new Error("Not found");
  }

  await item.update(ListData);

  res.json({ message: "List updated successfully" });
});

module.exports = {
  addList,
  getOneList,
  getAllList,
  updateList,
  removeList,
  getListByRecordNo,
};
