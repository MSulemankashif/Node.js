var mongoose = require('mongoose')


//SCHEMA
var todoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "title is required"]
    },

    desc: {
        type: String,
        required: [true, "description is required"]
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }

})


//MODEL
var TodoModel = mongoose.model("Todos", todoSchema)

module.exports = TodoModel