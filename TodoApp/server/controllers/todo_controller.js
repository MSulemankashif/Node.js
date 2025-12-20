var TodoModel = require('../models/todo_models')

 //======================================
// GET ALL TODOS
//======================================
async function getAllTodos(req,res){
    var todos = await TodoModel.find()
    res.status(200).json(todos)
}


  var newTodo = await TodoModel.create({
    title: title,
    desc: desc
  });

  res.status(201).json({message: "todo is posted", todo: newTodo})
}




//======================================
// UPDATE TODO BY ID
//======================================
async function updateTodo(req,res){
  
  // get id from parameter
  var id =  req.params.id


  // get the updated data from request body
  var updatedData = req.body


  // now update the data
  await TodoModel.findByIdAndUpdate(id, updatedData)


  res.status(200).json({message: "todo updated"})
  
}


async function deleteTodos(req,res){
  // get id from parameter
  var id =  req.params.id

  // now update the data
  await TodoModel.findByIdAndDelete(id)

  res.status(200).json({message: "todo deleted"})

}


module.exports = {
    getAllTodos,
    getTodoById,
    postTodo,
    updateTodo,
    deleteTodos
}