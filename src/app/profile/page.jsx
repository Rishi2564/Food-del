"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { status } = session;
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);
  console.log(session);
  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName, image }),
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }
  async function handleFileChange(ev) {
    console.log(ev);
    const files = ev?.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      data.set("files", files);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await response.json();
      setImage(link);
    }
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
      <h1 className="text-center text-primary text-4xl mb-4 ">Profile</h1>
      <div className="max-w-md mx-auto ">
        {saved && (
          <h2 className="text-center bg-green-100 rounded-lg p-4 border border-green-300">
            Profile saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-100 rounded-lg p-4 border border-blue-300">
            Saving...
          </h2>
        )}
        <div className="flex items-center">
          <div className="">
            {" "}
            <div className=" p-2 rounded-lg flex-col justify-center">
              <div className="relative w-fit mx-auto group">
                {image && (
                  <Image
                    className="rounded-lg"
                    src={image}
                    width={180}
                    height={180}
                    alt="avatar"
                  />
                )}

                <label className="absolute bottom-0 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-400 text-white text-sm rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition cursor-pointer mb-3">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <span className="px-8 ">Edit</span>
                </label>
              </div>
            </div>
          </div>
          <form className="grow ml-2" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              name=""
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="First and last name"
              id=""
            />
            <input
              type="email"
              name=""
              value={session.data.user.email}
              id=""
              disabled
            />
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
