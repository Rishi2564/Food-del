"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName]= useState('');
  const { status } = session;
  useEffect(()=>{
    if (status === "authenticated") {
      setUserName(session.data.user.name);
    }
  },[session,status])
  console.log(session);
  function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    fetch('/api/profile',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({name: userName})
    } );
    }
  
  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  const userImage = session.data.user.image;
  return (
    <section className="mt-4">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto ">
        <div className="flex items-center">
          <div className="">
            {" "}
            <div className="bg-gray-200 p-2 rounded-lg flex-col justify-center">
              <div className="relative w-fit mx-auto">
                <Image
                  className="rounded-lg"
                  src={userImage}
                  width={180}
                  height={180}
                  alt="avatar"
                />
                <button
                  className="absolute bottom-0 px-1 bg-gray-400 !text-white text-sm  rounded mb-1.5 shadow-md opacity-0 hover:opacity-85 transition"
                  type="button"
                >
                 Edit
                </button>
              </div>
            </div>
          </div>
          <form className="grow ml-2" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              name=""
              value={userName}
              onChange={(ev)=>setUserName(ev.target.value)}
              placeholder="First and last name"
              id=""
            />
            <input type="email" name="" value={session.data.user.email} id="" disabled/>
            <button className="bg-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
