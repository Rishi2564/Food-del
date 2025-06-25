"use client";
import Trash from "@/components/icons/Trash";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();
  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);
  if (loading) {
    return "Loading user info";
  }
  if (!data.admin) {
    return "You are not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto ">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div className="bg-gray-100 rounded-lg mb-2 px-4 p-1 flex items-center gap-4 shadow-md">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {" "}
                  {!!user.name && <span className=""><b>{user.name}</b></span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div className="">
                <Link className="button" href={'/users/'+user._id}>Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
