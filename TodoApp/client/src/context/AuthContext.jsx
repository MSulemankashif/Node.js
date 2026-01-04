import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, use, useContext, useEffect, useState } from "react";

// source of global data for authentication
var AuthContext =  createContext();



// custom hook for AuthContext access all over the application
export function useAuth(){
    return useContext(AuthContext)
}





// component for AuthProvider
export function AuthProvider({children}) {
    

    //state variables
    var [user, setUser] = useState(null)
    var [loading, setLoading] = useState(true)



    // check token expiry
    function checkTokenExpiry(token){
        try {
            var decodedToken = jwtDecode(token)
            var currentTime = Date.now() / 1000

            if (decodedToken.exp < currentTime) {
                return true
            }
            return false
        } catch (error) {
            return true
        }
    }



    function checkTokenAndGetUserData(){
        // get token from local storage
        var token = localStorage.getItem('token')

        // get user from local storage
        var user = localStorage.getItem('user')

        // check if token and user exists in the local storage
        if (!token ||  !user  ) {
            return null;
        }
        
        // if the token exists now check if it is expired?
        var isExpired =  checkTokenExpiry(token)
        if (isExpired) {
            removeTokenAndUserData()
            return null
        }

        // if not expired then return the user data
        try {
            return JSON.parse(user)
        } catch (error) {
            // other wise return null
            return null
        }
    }

    // fetch profile
     var fetchProfile = async ()=>{
        var token = localStorage.getItem('token')
        
        if (  !token  ||  checkTokenExpiry(token)==true )  {
           throw Error("Please login again to access profile") 
        }

        try {
            
            var userProfileData = await axios.get("http://localhost:3000/auth/profile",{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(userProfileData.data.user)
            setUser(userProfileData.data.user)
        } catch (error) {
            console.log(error)
        }
    }










    useEffect(
        ()=>{
            var validUser = checkTokenAndGetUserData()
            if (validUser) {
               setUser(validUser) 
            }
            setLoading(false)
        },
        []
    )



    // save token and user data
    var saveTokenAndUserData = (token, userData)=>{
        localStorage.setItem('token', token )
        localStorage.setItem('user', JSON.stringify(userData)  )
        setUser(userData)
    }





    // remove token
    var removeTokenAndUserData = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }





    // what to provide?
    var value = {
        user,
        saveTokenAndUserData,
        removeTokenAndUserData,
        isAuthenticated: user?  true : false,
        fetchProfile,
        checkTokenExpiry
    }


    return (
        <AuthContext.Provider  value={value}   >   
          { !loading && children  }
        </AuthContext.Provider>
    )



}

export default AuthProvider



