var express = require('express')
var router = express.Router()
var controller = require('../controllers/products_controller')

// Same Route but Different Methods
router.route("/").get(controller.getAllProducts).post(controller.addEmployee)


router.route('/:id').get(controller.getProductById).put(controller.updateEmployee).delete(controller.deleteEmployee)

module.exports = router


