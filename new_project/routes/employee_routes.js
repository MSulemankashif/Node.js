var express = require('express')
var router = express.Router()
var controller = require('../controllers/employee_controller')




router.route("/")
.get( controller.getAllEmployees )
.post( controller.addEmployee  )

router.route('/:id')
.get(controller.getEmployeeById)
.put(controller.updateEmployee)
.delete(controller.deleteEmployee)




// router.get("/:id", controller.getEmployeeById )
// router.get("/", controller.getAllEmployees )
// router.post("/", controller.addEmployee )
// router.put("/:id", controller.updateEmployee )
// router.delete("/:id", controller.deleteEmployee )


module.exports = router
