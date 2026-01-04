var mongoose = require('mongoose')


//SCHEMA
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "name is required"]
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"],
        lowercase: true,
        trim: true,
        match : [emailRegex, "Email should have a valid format"]
    },

    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        minLength: 6
    }

})


//MODEL
var UserModel = mongoose.model("Users", userSchema)

module.exports = UserModel