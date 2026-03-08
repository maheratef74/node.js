const { body } = require('express-validator');

const putProductRequest = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim(),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number')
        .isFloat({ min: 0 }).withMessage('Price cannot be negative'),

    body('categoryId')
        .notEmpty().withMessage('Category ID is required')
        .isNumeric().withMessage('Category ID must be a number')
];

const patchProductRequest = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string')
        .trim(),

    body('price')
        .optional()
        .isNumeric().withMessage('Price must be a number')
        .isFloat({ min: 0 }).withMessage('Price cannot be negative'),

    body('categoryId')
        .optional()
        .isNumeric().withMessage('Category ID must be a number')
];

module.exports = {
    putProductRequest,
    patchProductRequest
};
