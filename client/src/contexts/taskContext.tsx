"use client"

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { useRouter } from 'next/navigation'
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
  title?: String,
  description?: String,
  status?: String,
  priority?: String,
  dueDate?: Date
}

// Interface for the context
interface TasksContextType {
  allTasks: Task[];  // Array of tasks
  fetchAllTasks: () => Promise<Task[]>;
  updateTask: (id: string, { title, description, status, priority, dueDate }:
    TaskPropsType) => void;
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
  const [allTasks, setAllTasks] = useState<Task[]>([]);  // Typing for tasks array
  const host = "http://localhost:8001/tasks";
  const router = useRouter();
  
  // Fetch all tasks from the server
  const fetchAllTasks = async () => {
    try {
      const response = await fetch(`${host}/getAllTasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": sessionStorage.getItem('auth-token') || "",
        },
      });
      const json = await response.json();
      setAllTasks(json);
      return json;
    }
    catch (err) {
      console.log(err);
    }
    // Assuming response is an array of tasks
  };


  // Placeholder for updateTask

  const updateTask = async (id: string, { title, description, status, priority, dueDate }: TaskPropsType) => {
    console.log("update task")
    try {
      const response = await fetch(`http://localhost:8001/tasks/updateTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ title, description, status, priority, dueDate })
      })
     
    }
    catch (err) {
      console.log(err)
      alert(err)
      
    }
  };

  // Placeholder for deleteTask
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8001/tasks/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token") || ""
        },

      })
    }
    catch (err) {
      console.log(err)
      alert(err)
      
    }
  };
  const createTask = async ({ title, description, status, priority, dueDate }: TaskPropsType) => {
    try {
      const response = await fetch(`http://localhost:8001/tasks/createTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token") || ""
        },
        body: JSON.stringify({ title, description, status, priority, dueDate })
      })
      
      if(response){
        router.push("/")
      }
    }
    catch (err) {
      console.log(err)
      alert(err)
      return false;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      fetchAllTasks()
    }
    else {
      router.push("/login")
    }
  }, [updateTask,deleteTask,createTask])

  // Return the provider with the proper value prop and children
  return (
    <TasksContext.Provider value={{ allTasks, fetchAllTasks, updateTask, createTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
