module.exports = (Model) => ({
  //--------------------------------------
  // GET ALL (with pagination & relations)
  //--------------------------------------
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5000;
      const offset = (page - 1) * limit;

      const where = req.query.filter ? JSON.parse(req.query.filter) : {};

      const order = req.query.sort
        ? JSON.parse(req.query.sort)
        : [["id", "DESC"]];

      const include = Model.associations
        ? Object.values(Model.associations).map((assoc) => ({
            association: assoc,
          }))
        : [];

      const { count, rows } = await Model.findAndCountAll({
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
  },

  //--------------------------------------
  // GET ONE
  //--------------------------------------
  async getOne(req, res) {
    try {
      const include = Model.associations
        ? Object.values(Model.associations).map((assoc) => ({
            association: assoc,
          }))
        : [];

      const item = await Model.findByPk(req.params.id, { include });

      if (!item) {
        return res.status(404).json({ message: "Not found" });
      }

      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //--------------------------------------
  // CREATE
  //--------------------------------------
  async create(req, res) {
    try {
      console.log("req.body:", req.body);
      const item = await Model.create(req.body);

      res.status(201).json(item);
      console.log(item);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  },

  //--------------------------------------
  // UPDATE
  //--------------------------------------
  async update(req, res) {
    try {
      const item = await Model.findByPk(req.params.id);
      console.log(req.body);
      if (!item) {
        return res.status(404).json({ message: "Not found" });
      }

      await item.update(req.body);

      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //--------------------------------------
  // DELETE
  //--------------------------------------
  async remove(req, res) {
    try {
      const item = await Model.findByPk(req.params.id);

      if (!item) {
        return res.status(404).json({ message: "Not found" });
      }

      await item.destroy();

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
});
