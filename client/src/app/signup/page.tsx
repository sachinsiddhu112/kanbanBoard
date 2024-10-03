'use client'

import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React, { useState } from 'react'
import { CirclesWithBar } from "react-loader-spinner";
import { useTasks } from '@/contexts/taskContext';
export default function SignUp() {
 const {loading} = useTasks();
  return (
   <main className="sm:w-[350px] md:w-[800px] lg:w-full h-screen flex flex-col justify-center items-center p-3 m-auto">
    {!loading ?
    <section className="w-fit">
        <div className=" flex flex-col gap-4 mt-5">
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <SignUpForm />
            <div className="text-lg text-neutral-500">Alread have an account?
                 <Link href='/login' className="underline underline-offset-4">Login</Link></div>
        </div>
    </section>
    :
    <div className="flex w-full h-screen justify-center items-center bg-slate-800">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true} />
        </div>
}
   </main>
  )
}
