const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '../data/data.json');

async function readAll() {
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeAll(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

async function getCollection(name) {
  const data = await readAll();
  return data[name] || [];
}

async function saveCollection(name, items) {
  const data = await readAll();
  data[name] = items;
  await writeAll(data);
}

async function findById(name, id) {
  const items = await getCollection(name);
  return items.find(i => i.id === Number(id));
}

async function nextId(name) {
  const items = await getCollection(name);
  const max = items.reduce((m, it) => (it.id > m ? it.id : m), 0);
  return max + 1;
}

module.exports = { readAll, writeAll, getCollection, saveCollection, findById, nextId };
