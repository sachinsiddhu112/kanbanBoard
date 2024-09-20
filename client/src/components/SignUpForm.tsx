"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {  useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './ui/form'
import { Button } from './ui/button'
import {InputFormField} from "./InputFormField"

export const formSchema = z.object({
    email: z.string().email(),
    username: z.string().max(20),
    password: z.string().min(5),
    confirmPassword: z.string().min(5)
})
export default function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
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
                    name='email'
                    label="Email"
                    placeholder='Email'
                    inputType='email'
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
                <InputFormField
                    name='confirmPassword'
                    label="Confirm Password"
                    placeholder='Confirm Password'
                    description='It should be same as Password.'
                    inputType='password'
                    formControl={form.control}
                />
                
                <Button type='submit'>SignUp</Button>
            </form>
        </Form>
    )
}
