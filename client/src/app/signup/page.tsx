import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from 'react'

export default function SignUp() {
  return (
   <main className="sm:w-[350px] md:w-[800px] h-screen flex flex-col justify-center items-center p-3 m-auto">
    <section className="w-4/5 max-w-5xl">
        <div className=" flex flex-col gap-4 mt-5">
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <SignUpForm/>
            <div className="text-lg text-neutral-500">Alread have an account?
                 <Link href='/login' className="underline underline-offset-4">Login</Link></div>
        </div>
    </section>
   </main>
  )
}
