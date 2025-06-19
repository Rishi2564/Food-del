"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
const ProfilePage = () => {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [isAdmin, setIsAdmin]= useState(false);
  const [profileFetched, setProfileFetched]= useState(false);
  const { status } = session;
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCountry(data.country);
          setCity(data.city);
          setIsAdmin(data.admin)
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          image,
          phone,
          streetAddress,
          postalCode,
          country,
          city,
        }),
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

  

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  const userImage = session.data.user.image;
  return (
    <section className="mt-4">
      <UserTabs isAdmin={isAdmin} />
      
      <div className="max-w-lg mx-auto mt-8 ">
        <div className="flex ">
          <div className="">
            {" "}
            <div className=" p-2 rounded-lg flex-col justify-center">
              <div className="">
                <EditableImage link={image} setLink={setImage}/>
              </div>
            </div>
          </div>
          <form className="grow ml-2" onSubmit={handleProfileInfoUpdate}>
            <label htmlFor="">First and Last Name</label>
            <input
              type="text"
              name=""
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              placeholder="First and last name"
              id=""
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              name=""
              value={session.data.user.email}
              id=""
              placeholder="email"
              disabled
            />
            <label htmlFor="">Phone</label>
            <input
              type="text"
              placeholder="Ph no"
              name=""
              id=""
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label htmlFor="">Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              name=""
              id=""
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-1">
              <div className="">
                {" "}
                <label htmlFor="">Postal Code</label>
                <input
                  
                  type="text"
                  placeholder="Postal Code"
                  name=""
                  id=""
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="">City</label>
                <input
                  
                  type="text"
                  placeholder="City"
                  name=""
                  id=""
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
            </div>
            <label htmlFor="">Country</label>
            <input
              type="text"
              placeholder="Country"
              name=""
              id=""
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
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
