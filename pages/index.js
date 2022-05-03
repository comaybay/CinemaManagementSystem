import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import supabase from '../utils/supabase'

export default function Home() {
  const [userEmail, setUserEmail] = useState("loading...");

  useEffect(() => {
    setUserEmail(supabase.auth.user()?.email);
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold">
          Hello {userEmail ?? "anon"}!
        </h1>
      </div>
      <div className='bg-green-300 w-full flex space-x-3 justify-center'>
        <Link href="/sign-in">Login</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </>
  )
}
