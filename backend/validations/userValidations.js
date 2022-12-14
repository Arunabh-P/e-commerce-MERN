const {body}  = require("express-validator")

module.exports.registerValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('email is required'),
    body('password').isLength({min:5}).withMessage('Password should be more than 4 characters')
]

module.exports.loginValidations = [
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('email is required'),
    body('password').not().isEmpty().isLength({min:5}).trim().withMessage('Password is required')
]