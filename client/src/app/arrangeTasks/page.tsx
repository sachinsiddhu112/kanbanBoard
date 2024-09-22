'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';

import { useTasks } from '@/contexts/taskContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function EditTask() {
    interface Task {
        title: string;
        description: string;
        status: string;
        priority: string;
        dueDate: Date;
        _id: string;
    }
    
    const { allTasks, updateMultipleTasksStatus,setAllTasks } = useTasks();
    const [toDoTasks, setTodoTasks] = useState<Task[]>([]);
    const [inProgTasks, setInProgTasks] = useState<Task[]>([]);
    const [comTasks, setComTasks] = useState<Task[]>([]);
    const router = useRouter();

    useEffect(() => {

        const todo = allTasks.filter((task) => task.status == 'To Do');
        setTodoTasks(todo);
        const inProg = allTasks.filter((task) => task.status == 'In Progress');
        setInProgTasks(inProg);
        const com = allTasks.filter((task) => task.status == "Completed");
        setComTasks(com);

    }, [])
    console.log('hello')

    const onDragEndHandle = (e: DropResult) => {
        const { source, destination } = e;
        console.log(e);
        if (!destination) return;
        if (source.droppableId === destination.droppableId) {
            return;
        }
        else if (source.droppableId == 'droppabletodo') {
            const todoCopy = JSON.parse(JSON.stringify(toDoTasks))
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
            const inProgCopy = JSON.parse(JSON.stringify(inProgTasks))
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
            const comCopy = JSON.parse(JSON.stringify(comTasks))
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
    const handleSaveChanges = async () => {
        setAllTasks([...toDoTasks,...inProgTasks,...comTasks])
        await updateMultipleTasksStatus([...toDoTasks,...inProgTasks,...comTasks]);

    }

    return (
        <div>
            <section className='flex  justify-between p-11 m-auto'>
               
                <div className='flex gap-9'>
               <Button variant='outline' onClick={() => router.back()}>Back</Button>
               <Button variant='outline' onClick={handleSaveChanges}>Save Changes</Button>
               </div>
            </section>
            <DragDropContext onDragEnd={onDragEndHandle}>
                <div className='flex  flex-col  lg:flex-row min-h-[100vh] w-ful p-10  gap-[20px] justify-center'>

                    <Droppable key="todo" droppableId={`droppabletodo`}>
                        {
                            (droppableProvided) => (
                                <div className='flex flex-col gap-[10px] sm:w-[250px] overflow-hidden md:w-[700px] .no-scrollbar no-scrollbar::-webkit-scrollbar  lg:h-fit lg:w-fit p-5 shadow-md shadow-slate-300 rounded-sm justify-center'
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef} >
                                    <h1 className='w-fit m-auto '>To Do</h1>
                                    <div className='flex flex-row w-[250px] md:w-[700px] lg:w-[270px] overflow-auto lg:flex-col md:justify-center lg:justify-cent '>
                                        { toDoTasks.length > 0 ?
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
                                            :
                                            <h2 className='m-auto text-amber-500 '>NO TASK TO SHOW.</h2>
                                        }
                                    </div>
                                    {droppableProvided.placeholder}
                                </div>
                            )}
                    </Droppable>
                    <Droppable key="inprogess" droppableId={`droppableinprogress`}>
                        {
                            (droppableProvided) => (
                                <div className='flex flex-col gap-[10px] sm:w-[250px] overflow-hidden md:w-[700px] .no-scrollbar no-scrollbar::-webkit-scrollbar  lg:h-fit lg:w-fit p-5 shadow-md shadow-slate-300 rounded-sm justify-center'
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef} >
                                    <h1 className='w-fit m-auto'>In Progress</h1>
                                    <div className='flex flex-row w-[250px] md:w-[700px] lg:w-[270px] overflow-auto lg:flex-col md:justify-center lg:justify-center'>
                                        {inProgTasks.length > 0 ?
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
                                            :
                                            <h2 className='m-auto text-amber-500'>NO TASK TO SHOW.</h2>
                                        }
                                    </div>
                                    {droppableProvided.placeholder}
                                </div>
                            )}
                    </Droppable>
                    <Droppable key="complete" droppableId={`droppablecomplete`}>
                        {
                            (droppableProvided) => (
                                <div className='flex flex-col gap-[10px] sm:w-[250px] overflow-hidden md:w-[700px] .no-scrollbar no-scrollbar::-webkit-scrollbar  lg:h-fit lg:w-fit p-5 shadow-md shadow-slate-300 rounded-sm justify-center'
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef} >
                                    <h1 className='w-fit m-auto'>Completed</h1>
                                    <div className='flex flex-row w-[250px] md:w-[700px] lg:w-[270px] overflow-auto lg:flex-col md:justify-center lg:justify-cent'>
                                        { comTasks.length > 0 ?
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
                                            :
                                            <h2 className='m-auto text-amber-500'>NO TASK TO SHOW.</h2>
                                        }
                                    </div>
                                    {droppableProvided.placeholder}
                                </div>
                            )}
                    </Droppable>

                </div>
            </DragDropContext>
        </div>
    )
}
