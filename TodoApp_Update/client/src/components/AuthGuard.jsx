import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function AuthGuard({ children, type="protected" }) {
    var {isAuthenticated} =  useAuth()

    if (type == "protected" && !isAuthenticated) {
        return <Navigate  to={'/auth/login'}  replace   />
    }


    if (type == "public" && isAuthenticated) {
        return <Navigate  to={'/'}  replace   />
    }

    return children;

}

export default AuthGuard