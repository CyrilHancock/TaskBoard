import type { NextPage } from 'next'
import Head from 'next/head'

import Task from './Task'
import Modal from "../components/Modal"
import ModalAddTask from "../components/ModalAddTask"
import AddTaskList from "../components/AddTaskList"
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from '../firebase'
import Main from './Main'
const Home: NextPage = () => {                          
  const [user,loading]=useAuthState(auth)                           
  return (
    <div>

      <Head>
        <title>TasksBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user?
      <Main/>
   :<>
   
   <Task/> 
   <Modal/>
  <ModalAddTask/>
    <AddTaskList/>
   
   
   </> 
      
    }
      
    </div>
  )
}

export default Home
