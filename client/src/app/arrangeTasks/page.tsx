'use client'
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';

import { useTasks } from '@/contexts/taskContext';
import { SortAsc } from 'lucide-react';
export default function EditTask() {
    interface Task {
        title: string;
        description: string;
        status: string;
        priority: string;
        dueDate: Date;
    }
    const { allTasks, fetchAllTasks } = useTasks();
    const [toDoTasks, setTodoTasks] = useState<Task[]>([]);
    const [inProgTasks, setInProgTasks] = useState<Task[]>([]);
    const [comTasks, setComTasks] = useState<Task[]>([]);

    useEffect(() => {

        const todo = allTasks.filter((task) => task.status == 'To Do');
        setTodoTasks(todo);
        const inProg = allTasks.filter((task) => task.status == 'In Progress');
        setInProgTasks(inProg);
        const com = allTasks.filter((task) => task.status == "Completed");
        setComTasks(com);
    }, [])

    const onDragEndHandle = (e: DropResult) => {
        const { source, destination } = e;
        console.log(e);
        if (!destination) return;
        if (source.droppableId === destination.droppableId) {
            return;
        }
        else if (source.droppableId == 'droppabletodo') {
            let todoCopy = JSON.parse(JSON.stringify(toDoTasks))
            if (destination.droppableId == 'droppableinprogress') {
                const inProgCopy = JSON.parse(JSON.stringify(inProgTasks))
                todoCopy[source.index].status = "In Progress";
                inProgCopy.splice(destination.index, 0, todoCopy[source.index])
                setInProgTasks(inProgCopy)
            } else {
                const inComCopy = JSON.parse(JSON.stringify(comTasks))
                todoCopy[source.index].status = "Completed";
                inComCopy.splice(destination.index, 0, todoCopy[source.index])
                setComTasks(inComCopy)
            }
            todoCopy?.splice(source.index, 1);
            setTodoTasks(todoCopy);
        }
        else if (source.droppableId == 'droppableinprogress') {
            let inProgCopy = JSON.parse(JSON.stringify(inProgTasks))
            if (destination.droppableId == 'droppabletodo') {
                const todoCopy = JSON.parse(JSON.stringify(toDoTasks))
                inProgCopy[source.index].status = "To Do";
                todoCopy.splice(destination.index, 0, inProgCopy[source.index])
                setTodoTasks(todoCopy);
            } else {
                const inComCopy = JSON.parse(JSON.stringify(comTasks))
                inProgCopy[source.index].status = "Completed";
                inComCopy.splice(destination.index, 0, inProgCopy[source.index])
                setComTasks(inComCopy)
            }
            inProgCopy?.splice(source.index, 1);
            setInProgTasks(inProgCopy)
        } else {
            let comCopy = JSON.parse(JSON.stringify(comTasks))
            if (destination.droppableId == 'droppableinprogress') {
                const inProgCopy = JSON.parse(JSON.stringify(inProgTasks))
                comCopy[source.index].status = "In Progress";
                inProgCopy.splice(destination.index, 0, comCopy[source.index])
                setInProgTasks(inProgCopy);
            } else {
                const todoCopy = JSON.parse(JSON.stringify(toDoTasks));
                comCopy[source.index].status = "To Do"
                todoCopy.splice(destination.index, 0, comCopy[source.index]);
                setTodoTasks(todoCopy)

            }
            comCopy?.splice(source.index, 1);
            setComTasks(comCopy)
        }
    }
    const data = [
        {
            catId: 1,
            category: "to do",
            tasks: [
                {
                    taskId: 1,
                    title: "to-do-item1",
                    description: "this is the first item in todo"
                },
                {
                    taskId: 2,
                    title: "to-do-item1",
                    description: "this is the first item in todo"
                },
                {
                    taskId: 3,
                    title: "to-do-item1",
                    description: "this is the first item in todo"
                }
            ]
        },
        {
            catId: 2,
            category: "in Progerss",
            tasks: [
                {
                    taskId: 4,
                    title: "in-progress-item1",
                    description: "this the first item in in-progerss"
                },
                {
                    taskId: 5,
                    title: "in-progress-item1",
                    description: "this the first item in in-progerss"
                },
                {
                    taskId: 6,
                    title: "in-progress-item1",
                    description: "this the first item in in-progerss"
                }
            ]
        },
        {
            catId: 3,
            category: 'done',
            tasks: [
                {
                    taskId: 7,
                    title: "done-itme-1",
                    description: "this is the first item in done category"
                },
                {
                    taskId: 8,
                    title: "done-itme-1",
                    description: "this is the first item in done category"
                },
                {
                    taskId: 9,
                    title: "done-itme-1",
                    description: "this is the first item in done category"
                }
            ]
        }
    ]
    return (
        <DragDropContext onDragEnd={onDragEndHandle}>
            <div className='flex  flex-col  lg:flex-row min-h-[100vh] w-ful p-10  gap-[20px]'>

                <Droppable key="todo" droppableId={`droppabletodo`}>
                    {
                        (droppableProvided) => (
                            <div className='flex flex-col gap-[10px] sm:w-[350px] sm:overflow-scroll md:w-[700px] md:overflow-scroll lg:h-fit lg:w-fit p-5 shadow-md shadow-slate-300 rounded-sm'
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef} >
                                <h1 className='w-fit m-auto '>To Do</h1>
                                <div className='flex flex-row lg:flex-col '>
                                {
                                    toDoTasks?.map((task, index) => (
                                        <Draggable key={`task${index}`} draggableId={`draggable${index}${task.status}`} index={index}>
                                            {(provided) => (
                                                <div className='flex flex-col gap-5 w-fit h-fit p-5'
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef} >
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>{task.title}</CardTitle>
                                                            <CardDescription>
                                                                <div className='flex flex-col gap-1'>
                                                                    <span>{task.description}</span>
                                                                    <span className='bg-slate-200 w-fit px-1 rounded-md'>{task.status}</span>
                                                                </div>
                                                            </CardDescription>
                                                        </CardHeader>
                                                    </Card>
                                                </div>
                                            )}

                                        </Draggable>
                                    ))
                                }
                                </div>
                                {droppableProvided.placeholder}
                            </div>
                        )}
                </Droppable>
                <Droppable key="inprogess" droppableId={`droppableinprogress`}>
                    {
                        (droppableProvided) => (
                            <div className='flex flex-col gap-[10px] sm:w-[350px] sm:overflow-scroll md:w-[700px] md:overflow-scroll  h-fit w-fit p-5 shadow-md shadow-slate-300 rounded-sm'
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef} >
                                <h1 className='w-fit m-auto'>In Progress</h1>
                                <div className='flex flex-row lg:flex-col '>
                                {
                                    inProgTasks?.map((task, index) => (
                                        <Draggable key={`task${index}`} draggableId={`draggable${index}${task.status}`} index={index}>
                                            {(provided) => (
                                                <div className='flex flex-col gap-5 w-fit h-fit p-5'
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef} >
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>{task.title}</CardTitle>
                                                            <CardDescription>
                                                                <div className='flex flex-col gap-1'>
                                                                    <span>{task.description}</span>
                                                                    <span className='bg-slate-200 w-fit px-1 rounded-md'>{task.status}</span>
                                                                </div>
                                                            </CardDescription>
                                                        </CardHeader>
                                                    </Card>
                                                </div>
                                            )}

                                        </Draggable>
                                    ))
                                }
                                </div>
                                {droppableProvided.placeholder}
                            </div>
                        )}
                </Droppable>
                <Droppable key="complete" droppableId={`droppablecomplete`}>
                    {
                        (droppableProvided) => (
                            <div className='flex flex-col gap-[10px] sm:w-[350px] sm:overflow-scroll md:w-[700px] md:overflow-scroll h-fit w-fit p-5 shadow-md shadow-slate-300 rounded-sm'
                                {...droppableProvided.droppableProps}
                                ref={droppableProvided.innerRef} >
                                <h1 className='w-fit m-auto'>Completed</h1>
                                <div className='flex flex-row lg:flex-col'>
                                {
                                    comTasks?.map((task, index) => (
                                        <Draggable key={`task${index}`} draggableId={`draggable${index}${task.status}`} index={index}>
                                            {(provided) => (
                                                <div className='flex flex-col gap-5 w-fit h-fit p-5'
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef} >
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>{task.title}</CardTitle>
                                                            <CardDescription>
                                                                <div className='flex flex-col gap-1'>
                                                                    <span>{task.description}</span>
                                                                    <span className='bg-slate-200 w-fit px-1 rounded-md'>{task.status}</span>
                                                                </div>
                                                            </CardDescription>
                                                        </CardHeader>
                                                    </Card>
                                                </div>
                                            )}

                                        </Draggable>
                                    ))
                                }
                                </div>
                                {droppableProvided.placeholder}
                            </div>
                        )}
                </Droppable>

            </div>
        </DragDropContext>
    )
}
