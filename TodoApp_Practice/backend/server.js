// Imports
let express = require('express')
let app = express
let env = require('dotenv').config()
let cors = require('cors')
let todoRouter = require('./routes/todo_routes')

// Middleware Calls
app.use(express.json())
app.use(cors())
app.use("/todos", todoRouter)
app.use(require("./middlewares/error_handler"))


// For Server Running
app.listen(process.env.PORT, ()=>{
    console.log("Server is Running");
})