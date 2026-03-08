const { body } = require('express-validator');

const createCategoryRequest = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .trim()
];

module.exports = {
    createCategoryRequest
};
