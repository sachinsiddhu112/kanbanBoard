'use client'

import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from 'react'

export default function Login() {
  return (
   <main className="sm:w-[350px] md:w-[800px] h-screen flex flex-col justify-center items-center p-5 m-auto">
    <section className="w-4/5 max-w-5xl">
        <div className="mb-8 flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">Login</h1>
            <LoginForm/>
            <div className="text-sm text-neutral-500">Do not have any account?
                 <Link href='/signup' className="underline underline-offset-4">Sign Up</Link></div>
        </div>
    </section>
   </main>
  )
}
