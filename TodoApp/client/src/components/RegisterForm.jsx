import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { replace, useNavigate } from 'react-router-dom';

function RegisterForm() {
  
   var navigate = useNavigate()

   var [formData,setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
   })



   var [error,setError] = useState("")
   var [success,setSuccess] = useState("")
   var [loading,setLoading] = useState(false)


   async function submit(e){
    e.preventDefault()

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name   || !formData.email || !formData.password || !formData.confirmPassword ) {
        setError("Please provide all the fields")
        return;
    }

    if ( !regex.test(formData.email)  ) {
        setError("Please provide a valid email address")
        return;
    }

    if ( formData.password.length < 6  ) {
        setError("Password must be atleast 6 digit long")
        return;
    }


    if ( formData.password !== formData.confirmPassword  ) {
        setError("Password does not match")
        return;
    }

    // attempt to register the user
    try {
        setLoading(true)
        setError("")
        setSuccess("")

        var response = await axios.post(
            "http://localhost:3000/auth/register",{
                name: formData.name,
                email: formData.email,
                password: formData.password
            }
        )

        setTimeout(() => {
                navigate('/auth/login', {replace:true})
        }, 1000);

        
        setSuccess("Account created!")
        setError("")

    } catch (error) {
        setError(error.response.data.message || "soemthing went wrong");
    }
     finally{
        setLoading(false)
     }    
   }



  return (
    <div className='container mt-5'>

        <div className='card p-4 shadow' style={{ maxWidth: "500px", margin: "0 auto"  }} >
            <h3 className='mb-3 text-center' >Register Now</h3>

            {error &&   <div className='alert alert-danger'> {error}</div>  }
            {success &&   <div className='alert alert-success'> {success}</div>  }

            <form action="" onSubmit={ (e)=>{ submit(e)} }>



                <div className='mb-3'>
                    <label className='form-label' >Name</label>
                    <input
                      className='form-control'
                      type="text"
                      value={formData.name}
                      onChange={ (e)=>{ setFormData( { ...formData , name: e.target.value} )  } }
                      placeholder='Enter full name'
                    />
                </div>


                <div className='mb-3'>
                    <label className='form-label' >Email</label>
                    <input
                      className='form-control'
                      rows={3}
                      value={formData.email}
                      onChange={ (e)=>{ setFormData( { ...formData , email: e.target.value} )  } }
                      type="email"
                      placeholder='Enter email address'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label' >Password</label>
                    <input
                      
                      className='form-control'
                      rows={3}
                      value={formData.password}
                      onChange={ (e)=>{ setFormData( { ...formData , password: e.target.value} )  } }
                      type="password"
                      placeholder='Enter password'
                    />
                </div>


                <div className='mb-3'>
                    <label className='form-label' >Confirm Password</label>
                    <input
                      className='form-control'
                      rows={3}
                      value={formData.confirmPassword}
                      onChange={ (e)=>{ setFormData( { ...formData , confirmPassword: e.target.value} )  } }
                      type="password"
                      placeholder='Enter confirm password'
                    />
                </div>


                <button className='btn btn-primary w-100'>
                    {loading? "Loading..." : "Create Account"   }
                </button>
            </form>
        

        </div>

    </div>
  )
}

export default RegisterForm