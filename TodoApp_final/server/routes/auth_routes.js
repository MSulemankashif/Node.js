var express = require('express')
var router = express.Router()
var authController = require('../controllers/auth_controller')
var protect = require("../middleware/auth_middleware")


router.route("/register").post(authController.registerUser)
router.route("/login").post(authController.loginUser)

router.get("/profile",  protect,  authController.getProfile   )


module.exports = router