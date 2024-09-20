'use client'
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import { useTasks } from '@/contexts/taskContext';
export default function EditTask({ params }: { params: { userId: string } }) {
    const { userId } = params;
    const {allTasks,fetchAllTasks}  = useTasks();
    fetchAllTasks();
    console.log(allTasks);
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
                    taskId:3,
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
                    taskId:9,
                    title: "done-itme-1",
                    description: "this is the first item in done category"
                }
            ]
        }
    ]
    return (
        <DragDropContext onDragEnd={() => { }}>
            <div className='flex flex-row min-h-[100vh] w-ful p-10 bg-gray-500 gap-[20px]'>
                { data.map((category, ind) => (
                    <Droppable key={category.catId} droppableId={`droppable${category.catId}`  }>
                        {
                        (droppableProvided) => (
                            <div className='flex flex-col gap-[10px] h-fit w-fit p-5 border-black border-2 border-solid rounded-sm'
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef} >
                                <h1>{category.category}</h1>
                                {
                                    category.tasks.map((task, index) => (
                                        <Draggable key = {task.taskId} draggableId = {`${task.taskId}`} index={index}>
                                            {(provided) => (
                                                <div className='flex flex-col gap-5 w-fit h-fit p-5'
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref = {provided.innerRef} >
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>{task.title}</CardTitle>
                                                            <CardDescription>{task.description} </CardDescription>
                                                        </CardHeader>
                                                    </Card>
                                                </div>
                                            )}

                                        </Draggable>
                                    ))
                                }
                                {droppableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))
                }
            </div>
        </DragDropContext>
    )
}
