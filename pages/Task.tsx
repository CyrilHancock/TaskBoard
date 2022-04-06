import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import TasksCard from '../components/TasksCard.js'
import  {PlusIcon} from "@heroicons/react/outline"

import {modalAdd} from "../atoms/modalAdd"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'

function Task() {
  const [user,loading]=useAuthState(auth) 
  const [imgUrl,setImgUrl]=useState("")
  const [open,setOpen]=useRecoilState(modalAdd)
   const [taskLists,setTaskList]=useState([])
    useEffect(() => {
      const unsubscribe=onSnapshot(query(collection(db,"users",user.email,"taskList"),orderBy("timestamp","desc")),snapshot=>{
        setTaskList(snapshot.docs)
      })
      return ()=>{
        unsubscribe();
      }
    }, [db])
    useEffect(() => {
   setImgUrl(`https://picsum.photos/id/${Math.floor(Math.random()*1000)}/300/300`)   
    }, [])
    
    
  return (
    <div className='relative'>
        <div className='w-full bg-blue-600 flex  justify-between p-6'>
            <div className='flex place-items-center'>
          <img className='h-12 bg-blue-600' src='https://w7.pngwing.com/pngs/359/624/png-transparent-arrow-computer-icons-symbol-random-icons-angle-rectangle-triangle.png'alt='Icon'/>
            <p className='font-semi-bold text-4xl ml-4 text-white'>TasksBoard</p>
            </div>
          <img onClick={()=>auth.signOut()} className='cursor-pointer h-12 rounded-full' src={imgUrl} alt='Icon'/>

        </div>
        <div className='px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3  3xl:flex flex-wrap justify-center'>
            {
                taskLists.map(taskList=>(
                  <TasksCard idi={taskList.id} caption={taskList.data().taskListName}/>

                ))
            }
            
         

           
        
        </div>  

        <div className='absolute right-16 bottom-[50px] cursor-pointer '>
        <PlusIcon type='submit' onClick={()=>setOpen(true)} className='h-20 bg-blue-600 rounded-full text-white cursor-pointer'/>
        </div>

    </div>
  )
}

export default Task