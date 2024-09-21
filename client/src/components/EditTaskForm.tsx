"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React ,{ Dispatch, SetStateAction} from 'react'
import { useForm, FieldPath, Control, Controller } from 'react-hook-form'

import { Button } from "@/components/ui/button"

import { z } from 'zod'
import { Input } from './ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation';

import { DatePicker } from './DatePicker'
import { useTasks } from '@/contexts/taskContext'
export const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    priority: z.string(),

})
interface EditTaskFormProps {
    taskId: string;
    setIsEditingTask: Dispatch<SetStateAction<boolean>>;
  }

export default function EditTaskForm({taskId ,setIsEditingTask}:EditTaskFormProps) {
    const router = useRouter();
    const [date, setDate] = React.useState<Date | null>(null)
    const {updateTask} = useTasks();
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
        const data = { ...values, date };
        try{   
        const response = await updateTask(taskId,data);
        setIsEditingTask(false);
    }
        catch(err){
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
                    description='Min 10 and max 100 characters.'
                    placeholder='Task Description'
                    inputType='text'
                    formControl={form.control}
                />

                <Controller
                    name="status"
                    control={form.control}
                    render={({ field }) => (
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
                            <FormMessage />
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DatePicker selectedDate={date} setDate={setDate} />

                <div className='w-[250px] h-11 '>
                <Button type='submit'>Save</Button>
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
    formControl: Control<z.infer<typeof formSchema>, any>
}
const InputFormField: React.FC<InputFormFieldProps> = ({
    name, label, placeholder, description, inputType, formControl
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