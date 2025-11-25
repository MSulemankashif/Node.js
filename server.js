var express = require('express')
var app = express()
const PORT = 4000
var fs = require('fs');
app.use(express.json())

app.use(logger)


// App Level Middle Ware
function logger(req, res, next){
    const logText = `${new Date().getDate().toString()} ${req.method} ${req.url} \n`;

    fs.appendFile("server_logs.txt", logText, (err)=>{
        if(err){
            console.error("Failed to wrtie to log file: ", err)
        }
        next();
    });
}

// Route Specific Middle Ware

function validateId(req, res, next){
    var id = req.params.id

    if (!id || isNaN(id) || id<0){
        res.status(400).json({message: "Please provide valid Id"})
    }
    next()
}

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
app.put("/products/:id", (req, res)=>{

    var paramId  = req.params.id;
    var existingProduct  = productList.find( product => product.id == paramId)
    if(!existingProduct){
        return res.status(404).json({message: "Product does not exist on this Id"})
    }

    // Now get the updated title and price 
    var {title, price} = req.body

    // After this now update the existing product
    existingProduct.title = title ?? existingProduct.title
    existingProduct.price = title ?? existingProduct.price

    // Now send the response 
    res.status(200).json({message: "Product Updated", updatedProduct: existingProduct})
})

// Delete a Product
app.delete("/products/:id", (req,res)=>{

    // Check Existance
    var paramId = req.params.id;
    var product = productList.find(product => product.id != paramId)

    // npw send the response
    res.status(200).json({message: "Product deleted"})
})

app.listen(PORT, ()=>{ console.log("Server is running at", PORT)})