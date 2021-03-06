import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { text } from 'node:stream/consumers';
import React, { useRef } from 'react'
import { auth } from '../firebase';

function Login() {
  const emailRef=useRef<any>()
  const passwordRef=useRef<any>(null)  
  const router=useRouter()
  const loginIn=()=>{
    signInWithEmailAndPassword(auth,emailRef?.current?.value, passwordRef?.current?.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.push("/")

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
  return (
    <div className='flex flex-col place-items-center text-white bg-blue-600 h-screen pt-40'>
        <h1 className='text-4xl font-semibold pb-10'>
            Log in!
        </h1>
        <form className='flex flex-col space-y-5 w-1/3'>
            <input ref={emailRef} 
            className='h-12 outline-none border border-white bg-inherit' 
            placeholder='Enter E-mail' 
            type="text"/>
            <input 
            ref={passwordRef} 
            className='h-12 outline-none border border-white bg-inherit' 
            placeholder='Enter Password'type="password"/>
        
        <div className='flex pb-10'>
        <div className='flex flex-row flex-1'>
         <input type="checkbox"/><p className='text-xs cursor-pointer'>
               Remeber Me</p>      
        </div>          
            <p className='text-xs cursor-pointer'>Forgot Password?</p>    

        </div>

        </form>
        <button onClick={loginIn}   className='bg-white text-blue-600 pt-4 pb-4 font-bold w-1/5'>Login</button>

    </div>
  )
}

export default Login