"use client";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MenuItemsPage = () => {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems]= useState([]);
  useEffect(()=>{
    fetch('/api/menu-items').then(res=>{
      res.json().then(menuItems=>{
        setMenuItems(menuItems);
      }
    )
    })
  },[])
  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "You are not an admin";
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>Create New Menu Items <Right /></Link>
      </div>
      <div className="">
        {menuItems?.length>0 && menuItems.map(item=>{
          return(
          <div className="">
            {item.name};
          </div>
        )})}


      </div>
    </section>
  );
};

export default MenuItemsPage;
