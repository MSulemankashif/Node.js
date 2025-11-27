function getAllProducts(req, res){
    res.status(200).json(productList)
}


function getProductById(req, res){
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
}


function addEmployee(req, res){
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
}


function updateEmployee(req, res){
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
}


function deleteEmployee(req, res){
    // Check Existance
    var paramId = req.params.id;
    var product = productList.find(product => product.id != paramId)

    // npw send the response
    res.status(200).json({message: "Product deleted"})
}

module.exports = {
    getAllProducts,
    getProductById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}