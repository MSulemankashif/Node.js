var express = require('express')
var router = express.Router()
var controller = require('../controllers/todo_controller')
var protect = require("../middleware/auth_middleware")


router.use(protect)

router.route('/')
 .get(controller.getAllTodos)
 .post(controller.postTodo)



router.route('/:id')
 .get(controller.getTodoById)
 .put(controller.updateTodo)
 .delete(controller.deleteTodos)


module.exports = router