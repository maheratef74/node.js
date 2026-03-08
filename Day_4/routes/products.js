const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ProductsController');
const { putProductRequest, patchProductRequest } = require('../requests/ProductRequest');
const validateRequest = require('../middleware/validateRequest');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.put('/:id', putProductRequest, validateRequest, ctrl.putById);
router.patch('/:id', patchProductRequest, validateRequest, ctrl.patchById);
router.delete('/:id', ctrl.deleteById);

module.exports = router;
