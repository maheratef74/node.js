const Category = require('../models/Category');

async function getAll(req, res, next) {
  try {
    const categories = await Category.find().sort({ id: 1 });
    res.json(categories);
  } catch (err) { next(err); }
}

async function createCategory(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const max = await Category.findOne().sort({ id: -1 });
    const id = max ? max.id + 1 : 1;
    const cat = new Category({ id, name });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) { next(err); }
}

module.exports = { getAll, createCategory };

