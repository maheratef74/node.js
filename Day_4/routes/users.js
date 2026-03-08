const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/UsersController');
const { createUserRequest, patchPasswordRequest } = require('../requests/UserRequest');
const validateRequest = require('../middleware/validateRequest');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', createUserRequest, validateRequest, ctrl.createUser);
router.patch('/:id', patchPasswordRequest, validateRequest, ctrl.patchPassword);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
