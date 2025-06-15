"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");

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

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName, image }),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving profile info",
      success: "Profile info saved",
      error: "Error saving profile info",
    });
  }

 async function handleFileChange(ev) {
  console.log(ev);
  const files = ev?.target?.files;
  if (files?.length === 1) {
    const data = new FormData();
    data.set("file", files[0]);

    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          throw new Error("Something went wrong during upload");
        }

        const link = await response.json();
        setImage(link);
        resolve(); // Resolve only if everything went fine
      } catch (err) {
        reject(err); // This will be caught by toast.promise
      }
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading file...",
      success: "File uploaded!",
      error: "Failed to upload file.",
    });
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
