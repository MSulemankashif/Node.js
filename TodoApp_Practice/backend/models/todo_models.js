let mongoose = require('mongoose')

// Database Schema
let todoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title is required']
    },

    desc:{
        type: String,
        required: [true, 'Description is required']
    }
})

var todoModel = mongoose.model("Todos", todoSchema)

module.exports = todoModel