import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from 'react'

export default function SignUp() {
  return (
   <main className="sm:w-[350px] md:w-[800px] h-screen flex flex-col justify-center items-center p-5 m-auto">
    <section className="w-4/5 max-w-5xl">
        <div className=" flex flex-col gap-5 mt-10">
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <SignUpForm/>
            <div className="text-lg text-neutral-500">Alread have an account?
                 <Link href='/login' className="underline underline-offset-4">Login</Link></div>
        </div>
    </section>
   </main>
  )
}
