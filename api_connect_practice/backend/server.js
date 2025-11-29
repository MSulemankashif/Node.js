var express = require('express')
var app = express()
var cors = require('cors')
var PORT = 4000;
var productRouter = require('./routes/product_routes')
app.use(cors())
app.use("/products", productRouter)

app.listen(PORT, ()=>{
    console.log("Server is running");
    })
