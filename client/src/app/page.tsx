'use client'

import React, { useEffect, useState } from 'react';
import { useTasks } from '@/contexts/taskContext';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EditTaskForm from '@/components/EditTaskForm';
export default function Home() {
  interface Task {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: Date;
  }
  const [tasks, setTasks] = useState<Task[]>([]);
  const [noOfToDoTasks, setNoOfToDoTasks] = useState(0);
  const [noOfInProgTasks, setNoOfInProgTasks] = useState(0);
  const [noOfDoneTasks, setNoOfDoneTasks] = useState(0);
  const { fetchAllTasks } = useTasks();
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);


  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      const fetchTasks = async () => {
        const fetchedTasks = await fetchAllTasks();
        console.log(fetchedTasks)
        setTasks(fetchedTasks);
        let todo = 0, inProg = 0, done = 0;
        fetchedTasks.map((task) => {

          if (task.status == 'To Do') {
            todo++;
          }
          else if (task.status == 'In Progress') {
            inProg++;
          }
          else {
            done++;
          }
        })
        setNoOfDoneTasks(done);
        setNoOfInProgTasks(inProg);
        setNoOfToDoTasks(todo);
      }
      fetchTasks();
    }

  }, [])
  return (
    <div className='w-full h-screen'>

      { !isEditingTask ? <div className="flex flex-col gap-10 w-full h-screen">
        <nav className='w-full h-fit p-5'>
          <span className='hover:bg-slate-900 cursor-pointer p-3 m-7 rounded-md'>Task Manager</span>
        </nav>
        <section className='flex w-[90%] h-fit bg-[#232536] p-2 m-auto 
      justify-between  items-center gap-5 rounded-md '>
          <div className='flex flex-col gap-2 w-fit h-fit p-5 m-3 bg-gray-900 rounded-md'>
            <span>{`All Tasks : ${tasks.length}`}</span>
            <span>{`To Do : ${noOfToDoTasks}`}</span>
            <span>{`In Progress : ${noOfInProgTasks}`}</span>
            <span>{`Done : ${noOfDoneTasks}`}</span>
          </div>
          <div className='flex gap-5 m-2'>
            <Button variant='outline'>
              New
            </Button>
            <Button variant="outline" >
              Manage
            </Button>
          </div>
        </section>
        <section className='flex flex-wrap justify-start m-auto gap-5'>
          {
            tasks.map((task, ind) => (
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
                       hover:scale-110' onClick={() => setIsEditingTask(true)}><FiEdit /></span>

                        <span className='cursor-pointer 
                       hover:scale-110'><RiDeleteBin6Line /></span>


                      </div>
                    </CardTitle>
                    <CardDescription>
                      <div className='flex flex-col gap-1'>
                        <span>{task.description}</span>
                        <span className='bg-slate-200 w-fit px-1 rounded-md'>{task.status}</span>
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
      <div className='w-[800px] h-fit flex flex-col justify-center items-center p-5 m-auto'>
           <h2 >Edit Task</h2>
           <div className='w-full p-5'>
           <EditTaskForm/>
           </div>
       </div>
    
    }
    </div>
  );
}

