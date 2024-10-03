"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, FieldPath, Control, Controller } from 'react-hook-form'

import { Button } from "@/components/ui/button"

import { z } from 'zod'
import { Input } from './ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from './ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { DatePicker } from './DatePicker'
import { useTasks } from '@/contexts/taskContext'
import { useRouter } from 'next/navigation'
export const formSchema = z.object({
    title: z.string().min(5).max(60),
    description: z.string().min(10).max(100),
    status: z.string().min(5),
    priority: z.string()
})

export default function CreateTaskForm() {
    const router = useRouter();
    const [dueDate, setDueDate] = React.useState<Date | null>(null)
    const { createTask } = useTasks();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "",
            priority: "",

        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const data = { ...values, dueDate };
        try {

            await createTask(data);
        }
        catch (err) {
            alert(err);
        }

    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
                <InputFormField
                    name='title'
                    label="Title"
                    placeholder='Task Title'
                    inputType='text'
                    description='Max 60 characters.'
                    formControl={form.control}
                />
                <InputFormField
                    name='description'
                    label="Description"
                    placeholder='Task Description'
                    inputType='text'
                    description='Min 10 and max 100 characters.'
                    formControl={form.control}
                />
                <Controller
                    name="status"
                    control={form.control}
                    rules={{ required: "Status is required" }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="To Do">To Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            {error && <FormMessage>Status is required</FormMessage>}
                        </FormItem>
                    )}
                />
                <Controller
                    name="priority"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <DatePicker dueDate={dueDate} setDueDate={setDueDate} />
                <div className=' flex gap-5 '>
                    <Button variant='outline' onClick={() => router.back()}>Back</Button>
                    <Button type='submit' variant='outline'>Save</Button>
                </div>
            </form>
        </Form>
    )
}

interface InputFormFieldProps {
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string,
    placeholder: string,
    description?: string,
    inputType?: string,
    formControl: Control<z.infer<typeof formSchema>>
}
const InputFormField: React.FC<InputFormFieldProps> = ({
    name, placeholder, description, inputType, formControl
}) => {
    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem>

                    <FormControl>
                        <Input type={inputType || 'text'} placeholder={placeholder} {...field} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )} />
    )
}