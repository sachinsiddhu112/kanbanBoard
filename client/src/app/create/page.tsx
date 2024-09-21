import React from 'react'
import CreateTaskForm from '@/components/CreateTaskForm'
export default function CreateTask() {
  return (
    <div className=' sm:w-[350px] md:w-[800px] h-screen flex flex-col justify-center items-center p-5 m-auto'>
    <h2 className=' sm:text-[25px] md:text-[35px] lg:text-[30px]'>Creat New Task</h2>
    <div className=' sm:w-[350px] md:w-[700px] lg:w-full p-5 '>
    <CreateTaskForm />
    </div>
</div>

  )
}
