import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {replace, useNavigate} from 'react-router-dom';


function RegisterForm() {
  
  let navigate = useNavigate()

  let [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  

  let [error, setError] = useState("")
  let [loading, setLoading] = useState(false)
  let [success, setSuccess] = useState("")

  async function submit(e){
    e.preventDefault()

    const regex = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"

    if(!formData.name || !formData.email || !formData.password || !formData.confirmPassword){
      setError("Please fill all the fields")
      return;
    }

    if(!regex.text(formData.email)){
      setError("Please provide a valid Email Address")
      return;
    }

    if(formData.password !== formData.confirmPassword){
      setError("Password Does not match")
    }

    // Attempt to Register the User
      try{
        setLoading(true)
        setError("")
        setSuccess("")

        let response = await axios.post(
          "http://localhost:3000/auth/register"
        )
      }
  }
  
  
    return (
    <div>RegisterForm</div>
  )
}

export default RegisterForm