// Imports
let express = require('express')
let app = express()
var env = require('dotenv').config()
let cors = require('cors')
let connectDB = require('./config/database')
let todoRouter = require('./routes/todo_routes')


// Middleware Calls
app.use(express.json())
connectDB()
app.use(cors())
app.use("/todos", todoRouter)
app.use(require('../backend/middleware/error_handler'))


// For Server Running
app.listen(process.env.PORT, ()=>{
    console.log("Server is Running");
})