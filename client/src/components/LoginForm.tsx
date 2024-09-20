"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {  useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './ui/form'
import { Button } from './ui/button'
import {InputFormField} from "./InputFormField"


export const formSchema = z.object({
    username: z.string().max(20),
    password: z.string().min(5),
})
export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <InputFormField
                    name='username'
                    label="Username"
                    placeholder='Username'
                    inputType='text'
                    formControl={form.control}
                />
                <InputFormField
                    name='password'
                    label="Password"
                    placeholder='Password'
                    inputType='password'
                    description='At least 5 characters'
                    formControl={form.control}
                />
                <Button type='submit'>Login</Button>
            </form>
        </Form>
    )
}
