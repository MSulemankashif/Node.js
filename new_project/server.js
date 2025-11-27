var express = require('express')
var app = express()
var PORT = 4000
var logger = require('./middleware/logger')
var employeeRoutes = require('./routes/employee_routes')
app.use('/employees', employeeRoutes  )
app.use(logger)



app.listen(PORT, ()=>{
    console.log("Server is running at PORT:", PORT)
})