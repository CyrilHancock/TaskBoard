import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { modalTask } from '../atoms/modalTask'
import { modalTaskListid } from '../atoms/modalTaskListid'

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState)
  const [taskListId, settaskListId] = useRecoilState(modalTaskListid)

  const [taska, setTaska] = useRecoilState(modalTask)
  const taskRef = useRef()
  const detailsRef = useRef()
  const timeRef = useRef()
  const [name, setname] = useState()
  async function update() {
    const washingtonRef = doc(db, `users/${'Cyril'}/taskList/${taskListId}`, "tasks",taska);

    const docRef = await updateDoc(
      washingtonRef,
      
      {
        details: detailsRef.current.value,
        date: timeRef.current.value,
        timestamp: serverTimestamp(),
      }
    )
    setOpen(false)
  }
  useEffect(async () => {
    try {
      const docRef = doc(db, 'tasks', taska)
      const docSnap = await getDoc(docRef)
      setname(docSnap.data())
    } catch (e) {
      console.log(e)
    }
  }, [db])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex  min-h-[800px] items-end justify-center px-4 pt-4 pb-20  text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#0203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block transform overflow-hidden  rounded-lg bg-white px-4 pt-5 text-left align-bottom 
                        shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
            >
              <div>
                <div>
                  <div className="mt-3  sm:mt-5">
                    <div className="mt-2">
                      <h1 className="pb-5 text-gray-600">{name?.caption}</h1>
                      <input
                        className="h-20 w-full border-none   bg-gray-300 outline-none focus:ring-0"
                        type="text"
                        ref={detailsRef}
                        placeholder="Add Details"
                      />
                      <input
                        className="h-5   border-none   outline-none focus:ring-0"
                        type="date"
                        ref={timeRef}
                        placeholder="Add Details"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium
                                     text-white shadow-sm hover:bg-red-700  focus:outline-none focus:ring-2 
                                    focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed  disabled:bg-gray-300  hover:disabled:bg-gray-300 sm:text-sm  "
                    onClick={update}
                  >
                    Edit Task
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
