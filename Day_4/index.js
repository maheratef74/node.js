require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');

const app = express();
app.use(express.json());
app.use(logger);

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://maheratef600_db_user:3L390PtrdjHM0i0X@cluster0.wsy0fny.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI, { dbName: 'lab3' })
  .then(async () => {
    console.log('Connected to MongoDB');
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server (Day_4) running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });
module.exports = app;
