import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from '@mui/material/Slider'
import TodoTile from '../components/TodoTile'
import axios from 'axios'

function FetchTodosPage() {

  var navigate =  useNavigate()

  var [loading, setLoading] =  useState(false)  
  var [error, setError] =  useState("")
  var [todoList, setTodoList] =  useState([])


  async function fetchTodos(){
    try {
        setLoading(true)
        setError("")
        var response = await axios.get("http://localhost:3000/todos")
        setTodoList(response.data)
    } 
    catch (error) {
        setError(error || "Something went wrong")
    }
    finally{
        setLoading(false)
    }
  }


  useEffect( ()=>{fetchTodos()},  []   )






  return (
    <div className='container mt-3' >
        <div className='card p-5 shadow'>

            <div className='d-flex justify-content-between'>
                <h3>My Todo List</h3>
                <button className='btn btn-primary' onClick={ ()=>{ navigate("/add_todo", {replace:true})  }  }  >Add Todo</button>
            </div>

            {loading && <div className='alert alert-info'> Loading Todos... </div> }
            {error && <div className='alert alert-danger'>{error}</div> }

            { !loading  && todoList.length === 0  && (  <div className='alert alert-warning'>No Todos Found</div>  )}


            <ul className='list-group mt-3'>

                {
                    todoList.map(
                        todo => {return <TodoTile  todo={todo}  /> }
                    )
                }
                

            </ul>

        </div>

    </div>
  )
}

export default FetchTodosPage