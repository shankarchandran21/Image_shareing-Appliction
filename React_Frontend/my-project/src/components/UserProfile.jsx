import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams,useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
function UserProfile() {
  
  return (
    <div>UserProfile
    <button className='p-5 bg-slate-900 text-cyan-50' onClick={()=>{
      console.log('HI')
      localStorage.clear()
    }}>Click</button>
    </div>
  )
}

export default UserProfile