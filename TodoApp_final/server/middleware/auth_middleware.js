var jwt = require("jsonwebtoken")
var UserModel = require("../models/user_model")


async function protect(req,res,next){
    var token

    // check for token in authorization header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized to access this route")
    }


    try {
        // verify token
        var decodedToken = jwt.verify(token, process.env.SECRET_KEY);
       
        // get the user details from the database
        req.user =  await UserModel.findById(decodedToken.id)

        if(!req.user){
            res.status(401)
            throw new Error("User not found or invalid token")
        }

        next()



    } catch (error) {
        res.status(401)
        throw new Error("Not authorized to access this route")
    }
} 



module.exports = protect