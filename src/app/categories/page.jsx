"use client";
import UserTabs from "@/components/layout/UserTabs";

import { useProfile } from "@/components/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editedCategory, setEditedCategory]= useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();
  useEffect(() => {
    fetchCategories();

  }, []);
  function fetchCategories(){
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }
  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data={name:categoryName};
      if(editedCategory){
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method:editedCategory?"PUT": "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setCategoryName('');
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    toast.promise(creationPromise, {
      loading: editedCategory?"Updating Category"
      :"Creating category",
      success: editedCategory?"Category Updated": "Category created",
      error: "Error creating category",
    });
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
      <form className="mt-8" action="" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="">{editedCategory? 'Update Category':'New Category Name'}
              {editedCategory&&(
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              name=""
              id=""
            />
          </div>
          <div className="pb-2">
            <button type="submit" className="bg-primary border-primary">
              {editedCategory? 'Update': 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div className="">
        <h2 className="mt-8 text-sm text-gray-500">Edit Category:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <button onClick={()=> {setEditedCategory(c);
              setCategoryName(c.name);
            }} className="bg-gray-200 rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-1">
              <span>{c.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
