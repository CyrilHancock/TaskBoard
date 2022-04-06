import React, { useEffect, useState } from 'react'
import { DotsVerticalIcon, PencilIcon } from '@heroicons/react/outline'
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { modalStateforTask } from '../atoms/modalAtom2'
import { auth, db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import Done from './Done'
import { modalState } from '../atoms/modalAtom'
import { modalTask } from '../atoms/modalTask'
import { modalTaskListid } from '../atoms/modalTaskListid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { modalAdd } from '../atoms/modalAdd'
function TasksBoard({ caption, idi }) {
  const [open, setOpen] = useRecoilState(modalStateforTask)
  const [openEdit, setOpenEdit] = useRecoilState(modalState)
  const [taska, setTaska] = useRecoilState(modalTask)
  const [taskListId, settaskListId] = useRecoilState(modalTaskListid)
  const [user,loading]=useAuthState(auth) 
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, `users/${user.email}`, 'taskList', idi, 'tasks'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setTasks(
          snapshot.docs.map((snap) => ({ id: snap.id, data: snap.data() }))
        )
      }
    )
    return () => {
      unsubscribe()
    }
  }, [db])
  function taskeditor(id) {
    setOpenEdit(true)
    setTaska(id)
    settaskListId(idi)
  }
  function setId(idi) {
    setOpen(true)
    settaskListId(idi)
  }

  return (
    <div className="mb-10  w-full   border border-gray-500 p-4 lg:max-w-sm ">
      <div className="flex justify-between">
        <p className="text-gray-500">Taskname : {caption}</p>
        <DotsVerticalIcon className="h-5" />
      </div>
      {tasks && (
        <div className="flex  place-items-center pt-5">
          <PlusIcon
            onClick={() => setId(idi)}
            className="h-10 cursor-pointer rounded-full bg-blue-600 p-2  text-white"
          />
          <p className="ml-3">Add Task</p>
        </div>
      )}
      {tasks ? (
        tasks.map(({ id, data }) => (
          <div key={id} className="flex flex-col justify-between pt-5">
            <div className="flex justify-between p-3">
              <Done />
              <div className="flex flex-col justify-evenly">
                <p className='w-full break-all'>{data.taskName}</p>
                <span className=" break-all text-[11px]">
                  {data?.details}
                </span>
                <span className=" bg-gray-300 text-center text-xs">
                  {data?.date}
                </span>
              </div>
              <PencilIcon
                onClick={() => taskeditor(id)}
                className="h-5 text-green-600"
              />
            </div>
          </div>
        ))
      ) : (
        <>
          <input
            type="text"
            className="h-10 w-1/2 outline-none"
            placeholder="Add Tasks"
          />
          <PlusIcon
            onClick={() => setOpen(true)}
            className="h-10 cursor-pointer rounded-full bg-blue-600 p-2  text-white"
          />
        </>
      )}
    </div>
  )
}

export default TasksBoard
