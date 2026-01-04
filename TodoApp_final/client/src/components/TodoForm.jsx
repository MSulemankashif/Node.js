import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { replace, useNavigate } from 'react-router-dom';

function TodoForm() {
  
   var navigate = useNavigate()

   var [title,setTitle] = useState("")
   var [desc,setDesc] = useState("")
   var [error,setError] = useState("")
   var [success,setSuccess] = useState("")
   var [loading,setLoading] = useState(false)


   async function submit(e){


    e.preventDefault()
    if (!title || !desc ) {
        setError("Please provide title and desc")
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      var token = localStorage.getItem("token")

      await axios.post("http://localhost:3000/todos/", {title,desc}, {headers:{
        "Authorization": `Bearer ${token}`
      }})

      setError("")
      setSuccess("Todo posted successfully")
      setTitle("")
      setDesc("")

      setTimeout(() => {
        navigate('/', {replace:true})
      }, 1000);

      
      
      
    } 
    catch (error) {
        setError(error || "Something went wrong")
    }

    finally{
        setLoading(false)
    }



   }



  return (
    <div className='container mt-5'>

        <div className='card p-4 shadow' style={{ maxWidth: "500px", margin: "0 auto"  }} >
            <h3 className='mb-3 text-center' >Add Todo</h3>

            {error &&   <div className='alert alert-danger'> {error}</div>  }
            {success &&   <div className='alert alert-success'> {success}</div>  }

            <form action="" onSubmit={ (e)=>{ submit(e)} }>
                <div className='mb-3'>
                    <label className='form-label' >Title</label>
                    <input
                      className='form-control'
                      type="text"
                      value={title}
                      onChange={ (e)=>{ setTitle(e.target.value)  } }
                      placeholder='Enter title'
                    />
                </div>


                <div className='mb-3'>
                    <label className='form-label' >Description</label>
                    <textarea
                      className='form-control'
                      rows={3}
                      value={desc}
                      onChange={ (e)=>{ setDesc(e.target.value)  } }
                      type="text"
                      placeholder='Enter title'
                    />
                </div>


                <button className='btn btn-primary w-100'>
                    {loading? "Posting..." : "Post Todo"   }
                </button>
            </form>
        

        </div>

    </div>
  )
}

export default TodoForm