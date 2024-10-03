'use client'
import React, { useState } from 'react'
import { CirclesWithBar } from 'react-loader-spinner';
import CreateTaskForm from '@/components/CreateTaskForm'
import { useTasks } from '@/contexts/taskContext';
export default function CreateTask() {
  const { loading } = useTasks();
  return (
    <div className=' sm:w-[350px] md:w-[800px] lg:w-full h-screen flex flex-col justify-center items-center p-5 '>
      {!loading ?
      <>
      <h2 className=' sm:text-[25px] md:text-[35px] lg:text-[30px]'>Creat New Task</h2>
      <div className=' sm:w-[350px] md:w-[700px]  p-5 m-auto '>
        <CreateTaskForm />
      </div>
      </>
      :
      <div className="flex w-full h-screen justify-center items-center bg-slate-800">
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true} />
    </div>
}
    </div>

  )
}
