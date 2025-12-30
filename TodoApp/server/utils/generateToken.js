var jwt = require("jsonwebtoken")


function generateToken(userId){
    var token = jwt.sign(
        {id: userId},
        process.env.SECRET_KEY,
        {expiresIn: process.env.EXPIRY}
    )

    return token;

}



module.exports = generateToken

