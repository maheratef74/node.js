const User = require('../models/User');

async function getAll(req, res, next) {
  try {
    const users = await User.find().sort({ id: 1 });
    res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email })));
  } catch (err) { next(err); }
}

async function getById(req, res, next) {
  try {
    const u = await User.findOne({ id: Number(req.params.id) });
    if (!u) return res.status(404).json({ message: 'User not found' });
    res.json({ id: u.id, name: u.name, email: u.email });
  } catch (err) { next(err); }
}

async function createUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const max = await User.findOne().sort({ id: -1 });
    const id = max ? max.id + 1 : 1;
    const user = new User({ id, name, email, password });
    await user.save();
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) { if (err.code === 11000) return res.status(400).json({ message: 'Email or id already exists' }); next(err); }
}

async function patchPassword(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password required' });
    const user = await User.findOne({ id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.password = password;
    await user.save();
    res.json({ id, message: 'Password updated' });
  } catch (err) { next(err); }
}

async function deleteUser(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await User.deleteOne({ id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = { getAll, getById, createUser, patchPassword, deleteUser };

