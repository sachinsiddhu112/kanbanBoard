"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {  useForm,FieldPath, Control } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useRouter } from 'next/navigation';
export const formSchema = z.object({
    email: z.string().email(),
    username: z.string().max(20),
    password: z.string().min(5),
    confirmPassword: z.string().min(5)
})
export default function SignUpForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        },
    })
   
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        
        const host = process.env.NEXT_PUBLIC_HOST;
        try{
            const response = await fetch(`${host}/auth/signup`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(values)
            })
            const data = await response.json();
            if(response.status == 200){
                sessionStorage.setItem('user',data.user);
                sessionStorage.setItem('auth-token',data.authToken);
                router.push('/');
            }else{
                alert(data.error);
            }
        }
        catch(err){
            alert(err);
        }
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

interface InputFormFieldProps {
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string,
    placeholder: string,
    description?: string,
    inputType?: string,
    formControl: Control<z.infer<typeof formSchema>>
}
const InputFormField: React.FC<InputFormFieldProps> = ({
    name, label, description, inputType, formControl
}) => {
    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input  type={inputType || 'text'} {...field} />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )} />
    )
}
