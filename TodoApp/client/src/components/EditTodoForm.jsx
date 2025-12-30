import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { replace, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function EditTodoForm() {
  
   var navigate = useNavigate()
   var params =  useParams()

   var [title,setTitle] = useState("")
   var [desc,setDesc] = useState("")
   var [error,setError] = useState("")
   var [success,setSuccess] = useState("")
   var [loading,setLoading] = useState(false)
   var [fetching,setFetching] = useState(false)




   async function fetchTodoById(){
    try {
        setFetching(true)
        var response = await axios.get(`http://localhost:3000/todos/${params.id}`)
        setTitle(response.data.title)
        setDesc(response.data.desc)
    } catch (error) {
        setError(error || "Something went wrong")   
    }
    finally{
        setFetching(false)
    }
   }


   useEffect( ()=>{ fetchTodoById()  }, []  )








   async function submit(e){
    e.preventDefault()
    if (!title || !desc ) {
        setError("Please provide title and desc")
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      await axios.put(`http://localhost:3000/todos/${params.id}`, {title,desc})

      setError("")
      setSuccess("Todo updated successfully")
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
            <h3 className='mb-3 text-center' >Edit Todo</h3>

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
                    {loading? "Updating..." : "Update Todo"   }
                </button>
            </form>
        

        </div>

    </div>
  )
}

export default EditTodoForm 