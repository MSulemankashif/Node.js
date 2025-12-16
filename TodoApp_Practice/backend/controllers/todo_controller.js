let TodoModel = require("../models/todo_models")

// Get All Todos
async function getAllTodos(req, res){
    let todos = await TodoModel.find()
    res.status(200).json(todos)
}

// Get Todo by ID
async function getTodoById(req, res){
    
    // First we fetch the Id
    let id = req.params.id

    // Now we will search by this id in our database
    let todo = await TodoModel.findById(id)

    // Now check if the todo exist or not 
    if(!todo){
        res.status(404)
        throw new Error("Todo not found")
    }

    // If It Exists
    res.staus(200).json(todo);

}

 // Post a TODO
    async function postTodo(req, res){
        let {title, desc} = req.body

        if(!title || !desc){
            res.staus(400);
            throw new Error("Title and description is required");
        }
        
        let newTodo = await TodoModel.create({
            title: title,
            desc: desc
        });

        res.status(201).json({message: "Todo is posted", todo: newTodo})
    }

    // Update Todo by ID
    async function updateTodo(req, res){
    // get id from parameter
    let id = req.params.id

    // get the updated data from request body
    let updateData = req.body


    // Now Update the data
    await TodoModel.findbyIdAndUpdate(id, updateData)

    res.staus(200).json({message: "Todo Updated"})
    
}

async function deleteTodos(req, res) {
    // Get id from parameter
    let id = req.params.id

    // Now update the data
    await TodoModel.findbyIdAndDelete(id)

    res.status(200).json({message: "Todo Deleted"})
}

module.exports = {
    getAllTodos,
    getTodoById,
    postTodo,
    updateTodo,
    deleteTodos
}