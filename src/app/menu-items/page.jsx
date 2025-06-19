"use client";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import React, { useState } from "react";
import toast from "react-hot-toast";

const MenuItemsPage = () => {
  const { loading, data } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { name, description, basePrice, image };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Saved",
      error: "Error",
    });
  }
  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "You are not an admin";
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <form
        onSubmit={handleFormSubmit}
        action=""
        className="mt-8 max-w-md mx-auto"
      >
        <div
          className="grid grid-cols-2 items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div className="">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label htmlFor="">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <label htmlFor="">Base Price</label>
            <input
              type="number"
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MenuItemsPage;
