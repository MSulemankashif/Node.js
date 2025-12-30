import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoTile from '../components/TodoTile'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function FetchTodosPage() {

  var navigate =  useNavigate()
  var {removeTokenAndUserData} = useAuth()

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




  async function deleteTodo(id){
    try {
        setError('')
        await axios.delete(`http://localhost:3000/todos/${id}`)
        fetchTodos()
    } catch (error) {
        setError(error || "Something went wrong")
    }
  }


  function logout() {
    removeTokenAndUserData()
    navigate('/auth/login', {replace:true})
  }

  useEffect( ()=>{fetchTodos()},  []   )



  return (
    <div className='container mt-3' >
        <div className='card p-5 shadow'>

            <div className='d-flex justify-content-between'>
                <h3>My Todo List</h3>
                <div>
                    <button className='btn btn-primary' onClick={ ()=>{ navigate("/add_todo", {replace:true})  }  }  >Add Todo</button>
                    <button className='btn btn-danger' onClick={ ()=>{ logout() }  }  >Logout</button>
                </div>
            </div>

            {loading && <div className='alert alert-info'> Loading Todos... </div> }
            {error && <div className='alert alert-danger'>{error}</div> }

            { !loading  && todoList.length === 0  && (  <div className='alert alert-warning'>No Todos Found</div>  )}


            <ul className='list-group mt-3'>

                {
                    todoList.map(
                        todo => {
                           return <TodoTile  
                             todo={todo} 
                             onEdit={ ()=>{ navigate(`/edit_todo/${todo._id}`)  }   }    
                             onDelete={ ()=>{ deleteTodo(todo._id)  }}
                           
                           />
                        }
                    )
                }
                

            </ul>

        </div>

    </div>
  )
}

export default FetchTodosPage