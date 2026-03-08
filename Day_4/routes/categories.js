const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/CategoriesController');
const { createCategoryRequest } = require('../requests/CategoryRequest');
const validateRequest = require('../middleware/validateRequest');

router.get('/', ctrl.getAll);
router.post('/', createCategoryRequest, validateRequest, ctrl.createCategory);

module.exports = router;
