const Router = require('express')
const userController = require('../controllers/user.controller')
const authentication = require('../middleware/authentication')
const validation = require('../middleware/registerValidation')
const logging = require('../middleware/LoggingReq')
const ErrorHandling = require('../middleware/ErrorHandling')

const router = Router()

router.post('/api/users/register', validation ,logging, ErrorHandling, userController.register)
router.post('/api/users/login', logging, ErrorHandling, userController.login)
router.post('/api/users/logout', logging, ErrorHandling, userController.logout) 
router.delete('/api/users/:id', authentication, logging, ErrorHandling, userController.deleteUser)

module.exports = router