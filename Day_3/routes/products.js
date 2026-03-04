const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ProductsController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.putById);
router.patch('/:id', ctrl.patchById);
router.delete('/:id', ctrl.deleteById);

module.exports = router;
