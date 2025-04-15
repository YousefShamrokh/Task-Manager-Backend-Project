const { body, validationResult } = require('express-validator')

module.exports = [
        body('name').isString().isLength({min : 6}).withMessage('Name must be at least 6 characters long.'),
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isString().isLength({min : 5}).withMessage('Password must be at least 5 characters long.'),
        (req, res, next) => {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors : errors.array() })
            }
            next()
            }
    ]