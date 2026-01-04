import React from 'react'
import axios from 'axios'

function TodoTile({todo, onDelete, onEdit}) {

  async function handleDelete(){
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try{
      await axios.delete(`http://localhost:3000/todos/${todo._id}`);
      onDelete(todo._id);
    }catch(error){
      console.error(error);
      alert("Failed to delete todo");
    }
  }
  return (
    <>
        <div className='list-group-item d-flex align-items-center justify-content-between'>
        <div>
            <h5>{todo.title}</h5>
            <div>{todo.desc}</div>

            </div>

        <div className='d-flex gap-3'>
            <button className='btn btn-sm btn-warning'>Edit</button>
            <button className='btn btn-sm btn-danger' onClick={handleDelete}>Delete</button>
        </div>

        </div>
    </>  
  )
}

export default TodoTile
