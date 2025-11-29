var productList = [
    {
        id: 1,
        title: "Nvidia RTX 4090",
        price: 4000
    },
    {
        id: 2,
        title: "Platstation 5",
        price: 3000
    }
]


function getAllproducts(req, res){
    return res.status(200).json(productList)
}

module.exports = {
    getAllproducts
}