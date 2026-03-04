const store = require('../models/dataStore');

async function getAll(req, res, next) {
  try {
    const categories = await store.getCollection('categories');
    res.json(categories);
  } catch (err) { next(err); }
}

async function createCategory(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const id = await store.nextId('categories');
    const categories = await store.getCollection('categories');
    const newCat = { id, name };
    categories.push(newCat);
    await store.saveCollection('categories', categories);
    res.status(201).json(newCat);
  } catch (err) { next(err); }
}

module.exports = { getAll, createCategory };
