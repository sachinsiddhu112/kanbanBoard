"use client"

import React, {useCallback, createContext, useState, ReactNode, useContext, useEffect } from "react";
import { useRouter ,usePathname} from 'next/navigation'
// Interface for a single Task
interface Task {
  title: string;
  description: string;
  status: string;
  priority: string;
  _id: string;
  dueDate: Date;
}

interface TaskPropsType {
  title?: string,
  description?: string,
  status?: string,
  priority?: string,
  dueDate?: Date | null 
}

// Interface for the context
interface TasksContextType {
  loading:boolean;
  allTasks: Task[];  // Array of tasks
  setAllTasks: (tasks: Task[]) => void;
  fetchAllTasks: () => Promise<Task[]>;
  updateTask: (id: string, { title, description, status, priority, dueDate }:
    TaskPropsType) => void;
  updateMultipleTasksStatus:(tasks:Task[]) => void;
  deleteTask: (id: string) => void;
  createTask: ({ title, description, status, priority, dueDate }:
    TaskPropsType) => void
}

// Create the context with a default of undefined
const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error("useTasksContext must be used within a TasksContextProvider");
  }

  return context;
}

interface TasksContextProviderProps {
  children: ReactNode;  // Type for children prop
}

// The context provider component
export const TasksContextProvider: React.FC<TasksContextProviderProps> = ({ children }) => {
  const storedTasks = sessionStorage.getItem('allTasks') 
  let parsedTasks: Task[] = [];
 
  if (storedTasks) {
    try {
      parsedTasks = JSON.parse(storedTasks);
      if (!Array.isArray(parsedTasks)) {
        parsedTasks = [];  // Ensure it's an array
        console.log('not array')
      }
    } catch (error) {
      parsedTasks = []; 
      console.log('error in parsing') // In case JSON parsing fails
    }
  }
 
  const [allTasks, setAllTasks] = useState<Task[]>(parsedTasks);  // Typing for tasks array
  const currentPath = usePathname(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Fetch all tasks from the server
  const fetchAllTasks = useCallback(async () => {
    console.log('fetching tasks')
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/tasks/getAllTasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": sessionStorage.getItem('auth-token') || "",
        },
      });
      const json = await response.json();
      setAllTasks(json);
      sessionStorage.setItem('allTasks',JSON.stringify(json));
      return json;
    }
    catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
    
    // Assuming response is an array of tasks
  }
  ,[]
  )

  // Placeholder for updateTask

  const updateTask = useCallback( async (id: string, { title, description, status, priority, dueDate }: TaskPropsType) => {
   
    try {
       await fetch(`${process.env.NEXT_PUBLIC_HOST}/tasks/updateTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ title, description, status, priority, dueDate })
      })
     fetchAllTasks();
    }
    catch (err) {
      console.log(err)
      alert(err)
      
    }
   
  },[])
  const updateMultipleTasksStatus = useCallback( async (tasks:Task[]) => {
    try{
       await fetch(`${process.env.NEXT_PUBLIC_HOST}/tasks/updateMultipleTasks`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token':sessionStorage.getItem('auth-token') || ''
        },
        body:JSON.stringify(tasks)
      })
      router.push("/");
  }
  catch(err){
    alert(err);
  }
  },[])

  // Placeholder for deleteTask
  const deleteTask = useCallback( async (id: string) => {
    console.log("id in deleteTask",id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}/tasks/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token") || ""
        },
        
      })
      fetchAllTasks();
    }
    catch (err) {
      console.log(err)
      alert(err)
    }
  },[])
  const createTask = useCallback( async ({ title, description, status, priority, dueDate }: TaskPropsType) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}/tasks/createTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ title, description, status, priority, dueDate })
      })
        router.push("/")
    }
    catch (err) {
      console.log(err)
      alert(err)
      return false;
    }
  },[])
  useEffect(() => {
    if (!sessionStorage.getItem('auth-token') && currentPath !== '/login' && currentPath !== '/signup') {
      router.push("/login");
    }
  }, [])

  // Return the provider with the proper value prop and children
  return (
    <TasksContext.Provider value={{loading, allTasks,setAllTasks, fetchAllTasks, updateTask,updateMultipleTasksStatus, createTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
