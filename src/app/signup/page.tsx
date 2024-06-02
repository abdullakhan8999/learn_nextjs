"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import visible from "@/Assets/Images/visible.png";
import hide from "@/Assets/Images/hide.png";
import Image from 'next/image';

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);

  const onSignUp = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error) {
      console.log("Error while signup: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.username && user.password) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Signup</h1>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder='username'
          className='p-2 mb-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder='email'
          className='p-2 mb-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-600'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder='password'
            className='p-2 mb-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 pr-8'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className='absolute z-20 right-2 top-1'
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              height={30}
              width={30}
              src={showPassword ? hide : visible}
              alt='password_icon'
            />
          </button>
        </div>
        <button
          type="submit"
          disabled={buttonDisable || isLoading}
          className={`p-2 mb-2 border text-white rounded-lg focus:outline-none focus:border-gray-600 ${isLoading ? "bg-green-600" : "bg-slate-400"}`}
          onClick={onSignUp}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
      <Link href="/login" className='hover:underline hover:text-blue-800'>Login, If you have an account</Link>
    </div>
  );
};

export default Signup;
