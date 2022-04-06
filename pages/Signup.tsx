import React, { useRef } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
import { useRouter } from 'next/router';
function Signup() {
  const emailRef=useRef<any>(null)
  const passwordRef=useRef<any>(null)  
                  const router=useRouter()
  function signup(){
    createUserWithEmailAndPassword(auth,emailRef?.current?.value, passwordRef?.current?.value)
    .then((userCredential) => {
      // Signed in 
      // ...
      router.push("/")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    
  }
  return (
    <div className='flex flex-col place-items-center text-white bg-blue-600 h-screen pt-40'>
    <h1 className='text-4xl font-semibold pb-10'>
        Sign Up!
    </h1>
    <form className='flex flex-col space-y-6 w-1/3'>
    <input className='h-14 outline-none border border-white bg-inherit'placeholder='Enter Username' type="text"/>
        <input ref={emailRef} className='h-14 outline-none  border  border-white bg-inherit'placeholder='Enter E-mail' type="email"/>
        <input ref={passwordRef} className='h-14 outline-none border border-white bg-inherit'placeholder='Enter Password'type="password"/>
    
    <div className='flex pb-10'>
     <input type="checkbox"/><p className='text-xs cursor-pointer'>
           I agree to terms & conditions</p>      
       

    </div>

    </form>
    <button onClick={()=>signup()} className='bg-white text-blue-600 pt-4 pb-4 font-bold w-1/6'>Sign Up</button>

</div>
  )
}

export default Signup