import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function ProfilePage() {

    var {fetchProfile} = useAuth()

   useEffect(
        ()=>{ fetchProfile()  },
        []
    ) 



  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage