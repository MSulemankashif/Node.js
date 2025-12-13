// IMPORTS
var express = require('express')
var app = express()
var env = require('dotenv').config()
var cors = require('cors')
var connectDB = require('./config/db')
var todoRouter = require('./routes/todo_routes')


//MIDDLEWARE CALLS
app.use(express.json())
connectDB()
app.use(cors())
app.use("/todos",todoRouter)
app.use(require('./middleware/error_handler'))





// SERVER RUN
app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})
