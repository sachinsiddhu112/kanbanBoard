import LoginForm from "@/components/SignUpForm";
import Link from "next/link";
import React from 'react'

export default function Login() {
  return (
   <main className="flex min-h-screen flex-col items-center justify-between p-20">
    <section className="w-4/5 max-w-5xl">
        <div className="mb-8 flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">Login</h1>
            <LoginForm/>
            <p className="text-sm text-neutral-500">Alread have an account?
                 <Link href='/signup' className="underline underline-offset-4">Login</Link></p>
        </div>
    </section>
   </main>
  )
}
