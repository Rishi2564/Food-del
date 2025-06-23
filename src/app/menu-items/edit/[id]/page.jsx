"use client";
import { useProfile } from "@/components/useProfile";
import React, { useEffect } from "react";

import UserTabs from "@/components/layout/UserTabs";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import MenuItemsForm from "@/components/layout/MenuItemsForm";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import Trash from "@/components/icons/Trash";
const EditMenuItemPage = () => {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(promise, {
      loading: "Deleting",
      success: "Menu item deleted",
      error: "Error deleting menu item",
    });
    setRedirectToItems(true);
  }
  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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
    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }
  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an Admin...";
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          Show all menu items
        </Link>
      </div>
      <MenuItemsForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-4">
        <div className="max-w-xs ml-auto pl-4">
          {" "}
          <button
            onClick={handleDeleteClick}
            className="mt-4 text-white "
          >
            <Trash />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditMenuItemPage;
