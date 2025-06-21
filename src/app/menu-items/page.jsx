"use client";
import Right from "@/components/icons/Right";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MenuItemsPage = () => {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
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
        <Link className="button" href={"/menu-items/new"}>
          Create New Menu Items <Right />
        </Link>
      </div>
      <div className="">
        <h2>Edit Menu Item</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => {
              return (
                <Link
                  href={"/menu-items/edit/" + item._id}
                  className="bg-gray-200 rounded-lg p-4"
                >
                  <div className="relative ">
                    <Image className="rounded-md" src={item.image} alt={""} width={200} height={200} />
                  </div>
                  <div className="text-center">{item.name}</div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default MenuItemsPage;
