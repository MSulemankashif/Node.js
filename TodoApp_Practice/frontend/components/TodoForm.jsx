import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {replace, useNavigate} from 'react-router-dom'

function TodoForm() {

    let navigate = useNavigate();

    let [title, setTitle] = useState('');
    let [desc, setDesc] = useState('');
    let [error, setError] = useState("");
    let [success, setSuccess] = useState('');
    let [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault()
        if(!title || !desc){
            setError("All Fields are required");
        }


        try{
            setLoading(true);
            setError("");
            setSuccess("")

            await axios.post("http://localhost:3000/todos/", {title, desc});

            setError("")
            setSuccess("Todo Added Successfully")
            setTitle("")
            setDesc("")

            setTimeout(()=>{
                navigate('', {replace: true})
            }, 1000);
        }

        catch(err){
            setError(error || "Something went wrong")
        }

        finally{
            setLoading(false);
        }
    }

  return (
    <div className='container mt-5'>
      <div className="card" style={{maxWidth: "500px", margin: "0 auto"}}>
        <h3 className='mb-3 text-center'>Add Todo</h3>

      {error && <div className='alert alert-danger'>{error}</div>}
      {success && <div className='alert alert-success'>{success}</div>}

      <form action="" onSubmit={(e) => handleSubmit(e)}>

        <div className="mb-3">
          <label htmlFor="title" className='form-label'>Title</label>
          <input 
          className='form-control mb-3'
          type="text"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          placeholder='Enter Title' 
          />
        </div>

      <div className="mb-3">
        <label htmlFor="desc" className='form-label'>Description</label>
        <input 
        type="text" 
        className='form-control mb-3'
        value={desc}
        onChange={(e) => {setDesc(e.target.value)}}
        placeholder='Enter Description'
        />
      </div>


          <button className='btn btn-success mb-3 w-100'>{loading? "Posting...": "Add Todo"}</button>
      </form>
      </div>
    </div>
  )
}

export default TodoForm
