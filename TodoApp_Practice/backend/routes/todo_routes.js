let express = require("express")
let router = express.Router()
let controller = require('../controllers/todo_controller')

router.route('/')
.get(controller.getAllTodos)
.post(controller.postTodo)

router.route('/:id')
.get(controller.getTodoById)
.put(controller.updateTodo)
.delete(controller.deleteTodos)

module.exports = router