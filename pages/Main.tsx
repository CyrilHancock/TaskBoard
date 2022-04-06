import { useRouter } from 'next/router'
import React from 'react'

function Main() {
  const router=useRouter()

  return (
    <div  className='flex flex-col place-items-center text-white bg-blue-600 h-screen pt-40'>
         
         <h1 className='text-4xl font-semibold pb-10'>
         TasksBoard
        
    </h1>
   
    <h1 className='text-4xl font-semibold pb-10'>
        Sign Up! Or Login In!
    </h1>
   
<div className='flex space-x-8'>

    <button onClick={()=>router.push("/Signup")} className='bg-white text-blue-600 pt-4 pb-4 font-bold w-[150px]'>Sign Up</button>
    <button onClick={()=>router.push("/Login")} className='bg-white text-blue-600 pt-4 pb-4 font-bold w-[150px]'>Login In</button>
</div>

</div>
    
  )
}

export default Main