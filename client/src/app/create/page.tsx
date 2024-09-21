import React from 'react'
import CreateTaskForm from '@/components/CreateTaskForm'
export default function CreateTask() {
  return (
    <div className='w-[800px] h-fit flex flex-col justify-center items-center p-5 m-auto'>
    <h2 >Creat New Task</h2>
    <div className='w-full p-5 m-auto'>
    <CreateTaskForm />
    </div>
</div>

  )
}
