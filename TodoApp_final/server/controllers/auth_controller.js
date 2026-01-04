var UserModel = require("../models/user_model")
var bcrypt = require("bcrypt")
var generateToken = require("../utils/generateToken")


//======================================
// REGISTER USER ACCOUNT
//======================================
async function registerUser(req,res){

    // get all the fields data from the body name, email, password
    var {name,email,password} = req.body
    
    // check if all the fields are provided or not
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please provide all the fields")
    }

    // check if the user is already registered
    var userExist =  await UserModel.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error("This email is already registered")
    }


    // password encryption
    var salt =  await bcrypt.genSalt(10)
    var encryptedPassword = await bcrypt.hash(password,salt)


    // create the user data in the database
    var userData = await UserModel.create({
        name,
        email,
        password: encryptedPassword 
    })


    // return success response to the frontend
    res.status(201).json({
        success: true,
        message: "account created!",
        data: userData
    })
}




//======================================
// LOGIN USER
//======================================
async function loginUser(req,res){

    // get all the fields data from the body email, password
    var {email,password} = req.body
    
    // check if all the fields are provided or not
    if (!email || !password) {
        res.status(400)
        throw new Error("Please provide all the fields")
    }

    // check if the user is registered?
    var user =  await UserModel.findOne({email})
    
    if (!user) {
        res.status(400)
        throw new Error("This email is not registered")
    }


    // password check
    var isMatched =  await bcrypt.compare(password,  user.password )
    
    if(!isMatched){
        res.status(400)
        throw new Error("Incorrect Password")
    }

    // generate token
    var token = generateToken(user._id)
    


    // return success response to the frontend
    res.status(200).json({
        success: true,
        message: "Login Successful!",
        token: token,
        userData: user
    })
}





//======================================
// GET USER PROFILE
//======================================

async function getProfile(req,res){
    var userData =  req.user;

    res.status(200).json({
        success: true,
        message: "authroized",
        user: userData
    })
    

}




module.exports = {
    registerUser,
    loginUser,
    getProfile
}