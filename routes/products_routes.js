var express = require('express')
var router = express.Router()
var controller = require('../controllers/products_controller')

// Same Route but Different Methods
router.route("/").get(controller.getAllProducts).post(controller.addProduct)


router.route('/:id').get(controller.getProductById).put(controller.updateProduct).delete(controller.deleteProduct)

module.exports = router


