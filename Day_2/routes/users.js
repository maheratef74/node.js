const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/UsersController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.createUser);
router.patch('/:id', ctrl.patchPassword);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
