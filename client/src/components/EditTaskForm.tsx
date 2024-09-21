"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React,{useState} from 'react'
import { useForm, FieldPath, Control, Controller } from 'react-hook-form'

import { z } from 'zod'
import { Button } from './ui/button'
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
import { DatePickerDemo } from './DatePicker'
import { Matcher } from 'react-day-picker'
import { Match } from 'date-fns'
export const formSchema = z.object({
    title: z.string().max(60),
    description: z.string().min(10),
    status: z.string().min(1),
    priority: z.string(),
   
})
export default function EditTaskForm() {
    const router = useRouter();
    const [date,setDate] = useState<Matcher | null>(null)
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

        console.log(values)
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
                <InputFormField
                    name='title'
                    label="Title"
                    placeholder='Task Title'
                    inputType='text'
                    formControl={form.control}
                />
                <InputFormField
                    name='description'
                    label="Description"
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
                    name="status"
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
               <DatePickerDemo date={date ?? null} setDate ={setDate}/>

                <Button type='submit'>Save</Button>

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
