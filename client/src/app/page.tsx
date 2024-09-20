'use client'

import React, { useEffect, useState } from 'react';
import { useTasks } from '@/contexts/taskContext';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      const fetchTasks = async () => {
        const fetchedTasks = await fetchAllTasks();
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
    <div className="flex flex-col gap-10 w-full h-screen">
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
      <section className='flex flex-wrap justify-start'>
        {
          tasks.map((task,ind) => (
            <div>

            </div>
          ))
        }
      </section>

    </div>
  );
}
