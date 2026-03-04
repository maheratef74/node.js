const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/CategoriesController');

router.get('/', ctrl.getAll);
router.post('/', ctrl.createCategory);

module.exports = router;
