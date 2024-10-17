"use client";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";




const Navbar = () => {

 

  
    const {UserInfo} = useContext(UserContext);

    const router = useRouter()
   
    const handleLogout = () => {
      localStorage.clear();
      router.push("/")

      setTimeout(() => {
        window.location.reload();
      }, 50);  
    };
    
    return (
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-bold text-black py-2 ">
          <Link href="/">NoteEasy</Link>
        </h2>
        
  
        {UserInfo ? (
          <ul className="md:flex gap-5">
            <li className="md:flex   ">
              <p className="mr-1 max-sm:hidden">Welcome, </p>
              <p className="text-blue-600 font-semibold">{UserInfo.userName}</p>
            </li>
            
               
            
            
            <li>
              <button
                
                className="hover:bg-black hover:rounded-full hover:px-2 hover:text-white duration-300 font-semibold text-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex gap-5">
            <li>
              <Link
                className="hover:bg-black hover:rounded-full hover:p-2 hover:text-white duration-300 font-semibold "
                href="/register"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-black  hover:rounded-full hover:p-2 hover:text-white duration-300 font-semibold "
                href="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    );
  };
  
  export default Navbar;
