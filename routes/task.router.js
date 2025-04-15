const Router = require('express')
const taskController = require('../controllers/task.controller')
const authentication = require('../middleware/authentication')
const logging = require('../middleware/LoggingReq')
const ErrorHandling = require('../middleware/ErrorHandling')

const router = Router()

router.post('/api/tasks', authentication, logging,ErrorHandling, taskController.createTask)
router.put('/api/tasks/:id', authentication, logging,ErrorHandling,  taskController.UpdateTask)
router.get('/api/tasks', authentication, logging, ErrorHandling, taskController.getAllTasks)
router.get('/api/tasks/:id', authentication, logging,ErrorHandling, taskController.getOneTask)
router.delete('/api/tasks/:id', authentication, logging, ErrorHandling, taskController.DeleteTask) 

module.exports = router