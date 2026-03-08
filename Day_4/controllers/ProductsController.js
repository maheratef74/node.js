const Product = require('../models/Product');

async function getAll(req, res, next) {
  try {
    const products = await Product.find().sort({ id: 1 });
    res.json(products);
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const p = await Product.findOne({ id: Number(req.params.id) });
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) { next(err); }
}

async function putById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const doc = await Product.findOne({ id });
    if (!doc) return res.status(404).json({ message: 'Product not found' });
    doc.name = req.body.name;
    doc.price = req.body.price;
    doc.categoryId = req.body.categoryId;
    await doc.save();
    res.json(doc);
  } catch (err) { next(err); }
}

async function patchById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updates = req.body;
    const doc = await Product.findOneAndUpdate({ id }, updates, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Product not found' });
    res.json(doc);
  } catch (err) { next(err); }
}

async function deleteById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await Product.deleteOne({ id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, putById, patchById, deleteById };

