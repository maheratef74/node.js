const store = require('../models/dataStore');

async function getAll(req, res, next) {
  try {
    const users = await store.getCollection('users');
    res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email })));
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const u = await store.findById('users', req.params.id);
    if (!u) return res.status(404).json({ message: 'User not found' });
    const user = { id: u.id, name: u.name, email: u.email };
    res.json(user);
  } catch (err) { next(err); }
}

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing data' });
    const id = await store.nextId('users');
    const users = await store.getCollection('users');
    const newUser = { id, name, email, password };
    users.push(newUser);
    await store.saveCollection('users', users);
    res.status(201).json({ id: newUser.id});
  } catch (err) { next(err); }
}

async function patchPassword(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password required' });
    const users = await store.getCollection('users');
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ message: 'User not found' });
    users[idx].password = password;
    await store.saveCollection('users', users);
    res.json({ id, message: 'Password updated' });
  } catch (err) { next(err); }
}

async function deleteUser(req, res, next) {
  try {
    const id = Number(req.params.id);
    let users = await store.getCollection('users');
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ message: 'User not found' });
    users = users.filter(u => u.id !== id);
    await store.saveCollection('users', users);
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, createUser, patchPassword, deleteUser };
