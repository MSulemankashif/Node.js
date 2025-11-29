var express = require('express')
var router = express.Router()
var controller = require('../controllers/product_controller')

router.route('/').get(controller.getAllproducts)

module.exports = router