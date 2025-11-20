var express = require('express')
var app = express()
const PORT = 4000
app.use(express.json())

// DB
var productList = [
    {
        id: 1,
        title: "Laptop",
        price: "20000"
    },
    {
        id: 2,
        title: "Keyboard",
        price: "2000"
    },
    {
        id: 3,
        title: "Mouse",
        price: "200"
    },
    {
        id: 4,
        title: "Charger",
        price: "2000"
    },
]

// GET ALL Products
app.get('/products', (req,res)=> {
    res.status(200).json(productList)
})

// GET Single Products by Parameter
app.get("products/:id", (req,res)=>{

    // Get ID From Parameter
    var paramID = req.params.id

    // Search Product by ID in DB
    var singleProduct = productList.find((product)=> product.id == paramID)

    // IF the product does not exist?
    if (!singleProduct) {
        return res.status(404).json({message: "Product Not Found"})
    }

    // If the item exist then  send as response
    res.status(200).json(singleProduct)
})

app.listen(PORT, ()=>{console.log("Server is running at ", PORT)})