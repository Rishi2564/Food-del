"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

import React from "react";

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  console.log(session);
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
      <form className="max-w-md mx-auto " action="">
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
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-400 !text-white text-sm !px-1 rounded mb-1 shadow-md hover:bg-gray-700 transition"
                  type="button"
                >
                  Change Avatar
                </button>
              </div>
            </div>
          </div>
          <div className="grow ml-2">
            <input
              type="text"
              name=""
              placeholder="First and last name"
              id=""
            />
            <button className="bg-primary" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
