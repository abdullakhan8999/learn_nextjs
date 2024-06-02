"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { axios } from 'axios';
import visible from "@/Assets/Images/visible.png"
import hide from "@/Assets/Images/hide.png"
import Image from 'next/image';

const Login = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onLoginUp = async () => { };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Login</h1>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" placeholder='email' className='p-2 mb-2 border text-black border-gray-3000 rounded-lg focus:outline-none focus:border-gray-600'
          value={user.email}
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder='password' className='p-2 mb-2 border text-black border-gray-3000 rounded-lg focus:outline-none focus:border-gray-600 pr-8' value={user.password}
            onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
          <button className='absolute z-20 right-2 top-1' onClick={() => { setShowPassword(!showPassword) }}><Image className='' height={30} width={30} src={
            showPassword ? hide : visible
          } alt='password_icon' /></button>
        </div>
        <button type="submit" className='p-2 mb-2 border text-white bg-slate-400 border-gray-3000 rounded-lg focus:outline-none focus:border-gray-600'>Submit</button>
      </div>
      <Link href="/signup" className='hover:underline  hover:text-blue-800'>SignUp</Link>
    </div>
  )
}

export default Login;