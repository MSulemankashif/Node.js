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

})


//MODEL
var TodoModel = mongoose.model("Todos", todoSchema)

module.exports = TodoModel