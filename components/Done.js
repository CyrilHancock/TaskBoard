import { CheckCircleIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

function Done() {
  const [done, setdone] = useState(false)
  function change(){
    if(done)
    {
      setdone(false)
    }
    else
    {
      setdone(true)
    }
  }
  return (
    <div>
        {done?(
       <CheckCircleIcon onClick={change} className={`h-7 ${done&&"text-green-600"}`}/>  

     ):(
      <CheckCircleIcon onClick={change}className={`h-7`}/>  
     )}
    </div>
  )
}

export default Done