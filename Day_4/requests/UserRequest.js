const { body } = require('express-validator');

const createUserRequest = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim(),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const patchPasswordRequest = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

module.exports = {
    createUserRequest,
    patchPasswordRequest
};
