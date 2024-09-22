'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useTasks } from '@/contexts/taskContext';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EditTaskForm from '@/components/EditTaskForm';
import { useRouter } from 'next/navigation';

export default function Home() {
 
  const [noOfToDoTasks, setNoOfToDoTasks] = useState(0);
  const [noOfInProgTasks, setNoOfInProgTasks] = useState(0);
  const [noOfDoneTasks, setNoOfDoneTasks] = useState(0);
  const {  deleteTask, allTasks } = useTasks();
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const router = useRouter();
  const taskId = useRef<string>("");
  

  useEffect(() => {
    let todo =0,inProg =0,done=0;
  allTasks.map((task) => {
    if(task.status == "To Do"){
      todo++;
    }
    else if(task.status == 'In Progress'){
      inProg++;
    }
    else{
      done++;
    }
  })
  setNoOfDoneTasks(done);
  setNoOfInProgTasks(inProg)
  setNoOfToDoTasks(todo)
  },[allTasks])
  //handling deleting of task.
  const handleDelete: React.MouseEventHandler<HTMLSpanElement> = () => {
    handleAsyncDelete();
  }
  const handleAsyncDelete = async () => {
     await deleteTask(taskId.current);
  }
//handling the date formate.
  const handleDateFormate = (date:Date) => {
    const taskDueDate = new Date(date); // Ensure it's a Date object
    const formattedDate = taskDueDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short', // e.g., Jan, Feb
        year: 'numeric'
    });
    return formattedDate;
  }
  
  return (
    <div className='w-full h-screen'>

      {!isEditingTask ? <div className="flex flex-col gap-10 w-full h-screen">
        <nav className='w-full h-fit p-5'>
          <span className='hover:bg-slate-900 cursor-pointer p-3 m-7 rounded-md'>Task Manager</span>
        </nav>
        <section className='flex flex-col md:flex-row w-[90%] h-fit bg-[#232536] p-2 m-auto 
      justify-between  items-center gap-5 rounded-md '>
          <div className='flex flex-wrap md:flex-col gap-2 w-fit h-fit p-5 m-3 bg-gray-900 rounded-md'>
            <span>{`All Tasks : ${allTasks?.length}`}</span>
            <span>{`To Do : ${noOfToDoTasks}`}</span>
            <span>{`In Progress : ${noOfInProgTasks}`}</span>
            <span>{`Done : ${noOfDoneTasks}`}</span>
          </div>
          <div className='flex gap-5 m-2'>
            <Button variant='outline' onClick={() => router.push("/create")}>
              New
            </Button>
            <Button variant="outline" onClick={() => router.push('/arrangeTasks')}>
              Manage
            </Button>
          </div>
        </section>
        <section className='flex flex-wrap justify-center lg:justify-start m-auto gap-5 p-5'>
          {
            allTasks?.map((task, ind) => (
              <div className='' key={ind}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className='flex gap-2'>
                        <span>{task.title}</span>
                        <Badge variant={task.priority == "Low" ?
                          'low' : task.priority == 'Medium' ?
                            'medium' : 'high'}>{task.priority}

                        </Badge>
                        <span className='cursor-pointer
                       hover:scale-110' onClick={() => {
                            taskId.current = task._id
                            setIsEditingTask(true)
                          }}><FiEdit /></span>

                        <span className='cursor-pointer 
                       hover:scale-110' onClick={(e) => {
                            taskId.current = task._id
                            handleDelete(e)
                          }}><RiDeleteBin6Line /></span>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <div className='flex flex-col gap-1'>
                        <span>{task.description}</span>
                        <span className='bg-slate-200 w-fit px-1 rounded-md'>{task.status}</span>
                        <span>{handleDateFormate(task.dueDate)}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>

                </Card>
              </div>
            ))
          }
        </section>

      </div>
        :
        <div className='sm:w-[350px] md:w-[800px] h-screen flex flex-col justify-center items-center p-5 m-auto'>
          <h2 className='sm:text-[25px] md:text-[35px] lg:text-[30px]'>Edit Task</h2>
          <div className='sm:w-[350px] md:w-[700px] lg:w-full p-5'>
            <EditTaskForm taskId={taskId.current} setIsEditingTask={setIsEditingTask}/>
          </div>
        </div>
      }
    </div>
  );
}

