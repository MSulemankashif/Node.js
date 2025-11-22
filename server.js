var express = require('express')
var app = express()
const PORT = 4000
app.use(express.json())

// Local DB
var productList = [
    {
        id:1,
        title: "Laptop",
        price: 12000
    },

    {
        id:2,
        title: "Sony TV",
        price: 15000
    },
    {
        id:3,
        title: "Keyboard",
        price: 1000
    }
]

// GET All Products
app.get('/products', (req, res)=>{
    res.status(200).json(productList)
})

// GET Single Products by Paramter
app.get("/products/:id", (req, res)=>{

    // Get ID From Parameter
    var paramID =  req.params.id

    // Search Product by id in db
    var singleProduct = productList.find( (product)=> product.id == paramID)

    // IF the product does not exist
    if (!singleProduct){
        return res.status(404).json({message: "Product not found"})
    }

    // If the item exist then send as response
    res.status(200).json(singleProduct)
})

// Post a Product
app.post("/products", (req, res)=> {
    
    // Get data from the request body

    var {title, price} = req.body

    // Now check if the user provides all the details
    if(!title || !price){
        return res.status(400).json({message: "Title and price are required"})
    }

    // now if the data is provided we will create a new product
    var newProduct = {
        id: productList.length.length+1,
        title: title,
        price:price
    }

    // Now upload the new product in the database
    productList.push(newProduct)

    // and send a response to the client for acknowledgement
    res.status(201).json({message: "Product Uploaded"})
})


// Update a product
