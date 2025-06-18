"use client";
import UserTabs from "@/components/layout/UserTabs";

import { useProfile } from "@/components/useProfile";
import { useState } from "react";
import toast from "react-hot-toast";
const CategoriesPage = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const { loading: profileLoading, data: profileData } = useProfile();
 
  async function handleNewCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise= new Promise(async (resolve, reject)=>{
 const response=await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategoryName }),
    });
    if(response.ok) resolve();
    else reject();
    });
    toast.promise(creationPromise,{
      loading: 'Creating category',
      success: 'Category created',
      error: 'Error creating category',
    })
   
  }

  if (profileLoading) {
    return "Loading user info";
  }
  if (!profileData.admin) {
    return "Not an Admin..";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" action="" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="">New Category Name</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(ev) => setNewCategoryName(ev.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="pb-2">
            <button type="submit" className="bg-primary border-primary">
              Create
            </button>
          </div>
        </div>
      </form>
      <ul>
        
      </ul>
    </section>
  );
};

export default CategoriesPage;
