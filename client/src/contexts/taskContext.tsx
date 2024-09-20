"use client"

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Interface for a single Task
interface Task {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
}
interface updateTaskPropsType {
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
  updateTask: (id:String, { title, description, status, priority, dueDate }: updateTaskPropsType) => Promise<boolean>;
  deleteTask: () => void;
}

// Create the context with a default of undefined
const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = () =>{ 
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


 
  // Fetch all tasks from the server
  const fetchAllTasks = async () => {
    const response = await fetch(`${host}/getAllTasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": sessionStorage.getItem('auth-token') || "",
      },
    });

    const json = await response.json();
    setAllTasks(json); 
    return json; // Assuming response is an array of tasks
  };

  console.log('taskcontext',allTasks)
  // Placeholder for updateTask

  const updateTask = async (id: String, { title, description, status, priority, dueDate }: updateTaskPropsType) => {
    const response = await fetch(`${host}/updateTask/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("auth-token") || ""
      },
      body: JSON.stringify({ title, description, status, priority, dueDate })
    })
     if(response.status == 200){
      return true;
     }
     return false;
  };

  // Placeholder for deleteTask
  const deleteTask = () => {
    // Add logic here for deleting a task
  };

  // Return the provider with the proper value prop and children
  return (
    <TasksContext.Provider value={{ allTasks, fetchAllTasks, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
