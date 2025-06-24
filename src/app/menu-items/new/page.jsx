"use client";
import { useProfile } from "@/components/useProfile";
import React from "react";

import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

import Left from "@/components/icons/Left";
import {redirect} from "next/navigation";
import MenuItemsForm from "@/components/layout/MenuItemsForm";
const NewMenuItemPage = () => {
  const { loading, data } = useProfile();

  const [redirectToItems, setRedirectToItems]= useState(false);
  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
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
   setRedirectToItems(true);
  }
  if(redirectToItems){
    return redirect('/menu-items');
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
      <div className="max-w-lg mx-auto mt-8">
     
        <Link href={"/menu-items"} className="button">
        <Left />
          Show all menu items
         
        </Link>
      </div>
     
      <MenuItemsForm menuItem={""} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default NewMenuItemPage;
