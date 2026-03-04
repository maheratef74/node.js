const store = require('../models/dataStore');

async function getAll(req, res, next) {
  try {
    const products = await store.getCollection('products');
    res.json(products);
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const p = await store.findById('products', id);

    if (!p) return res.status(404).json({ message: 'Product not found' });
    
    res.json(p);
  } catch (err) { next(err); }
}

async function putById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const products = await store.getCollection('products');
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Product not found' });
    const replacement = Object.assign({}, req.body, { id });
    products[idx] = replacement;
    await store.saveCollection('products', products);
    res.json(replacement);
  } catch (err) { next(err); }
}

async function patchById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const products = await store.getCollection('products');
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Product not found' });
    const updated = Object.assign({}, products[idx], req.body);
    products[idx] = updated;
    await store.saveCollection('products', products);
    res.json(updated);
  } catch (err) { next(err); }
}

async function deleteById(req, res, next) {
  try {
    const id = Number(req.params.id);
    let products = await store.getCollection('products');
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Product not found' });
    products = products.filter(p => p.id !== id);
    await store.saveCollection('products', products);
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, putById, patchById, deleteById };
