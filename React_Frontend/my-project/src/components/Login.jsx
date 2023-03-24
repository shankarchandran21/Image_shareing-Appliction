import React from 'react'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'
import shareVideo from "../assets/share.mp4"
import whitelogo from "../assets/whitelogo.png"
import{ client } from "../client"
function Login() {
    const navigate =useNavigate();
  const responseGoogle=(detail,credentialResponse)=>{
    console.log(detail)
     localStorage.setItem('user', JSON.stringify(detail));
    const {name,sub,picture} = detail;
    const doc={
      _id:sub,
      _type:'user',
      userName:name,
      image:picture,
    }

    client.createIfNotExists(doc).then(()=>{
      navigate('/',{replace:true})
    })



  }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video className='w-full h-full object-cover' src={shareVideo} type="video/mp4" loop controls={false} muted autoPlay></video>
                <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                    <div className='p-5'>
                        <img width='250px' src={whitelogo} alt="logo" />
                    </div>
                    <div className='shadow-2xl' >
                           <GoogleOAuthProvider  clientId="1004545684557-gsrgnmkah13necnubsg70spm29t1id5n.apps.googleusercontent.com">
                               <GoogleLogin 
                                   onSuccess={(credentialResponse) => {
                                   const details = jwt_decode(credentialResponse.credential);
                                   responseGoogle(details,credentialResponse)
                                  
                                  }}
                                   shape='pill'
                                    onError={() => {
                                      responseGoogle('Login Failed');
                                  }}
                                 />
                            </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Login