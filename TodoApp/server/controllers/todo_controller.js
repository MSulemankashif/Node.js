var TodoModel = require('../models/todo_models')

 //======================================
// GET ALL TODOS
//======================================
async function getAllTodos(req,res){
    var todos = await TodoModel.find()
    res.status(200).json(todos)
}


//======================================
// GET TODO BY ID
//======================================
async function getTodoById(req,res){
  
  // first we will get id
  var id = req.params.id

  // now we will search by this id in our database
  var todo = await TodoModel.findById(id)

  // now check if the todo exist or not
  if (!todo) {
    res.status(404)
    throw new Error("Todo not Found")
  }

  // if it exist?
  res.status(200).json(todo);

}


//======================================
// POST A TODO
//======================================
async function postTodo(req,res){
  var {title,desc} = req.body
  
  if(!title || !desc){
    res.status(400);
    throw new Error("title and description is required")
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