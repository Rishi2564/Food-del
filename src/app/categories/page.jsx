"use client";
import DeleteButton from "@/components/DeleteButton";
import Trash from "@/components/icons/Trash";
import UserTabs from "@/components/layout/UserTabs";

import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }
  async function handleDeleteClick(_id) {
    console.log();
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting category",
      success: "Category deleted",
      error: "Error",
    });
    fetchCategories();
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    toast.promise(creationPromise, {
      loading: editedCategory ? "Updating Category" : "Creating category",
      success: editedCategory ? "Category Updated" : "Category created",
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
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" action="" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label htmlFor="">
              {editedCategory ? "Update Category" : "New Category Name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
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
          <div className="pb-2 flex gap-1">
            <button type="submit" className="bg-primary border-primary">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div className="">
        <h2 className="mt-8 text-sm text-gray-500">Existing Category:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-2  mb-2 shadow-md"
            >
              <div className="flex items-center grow ">{c.name}</div>
              <div className="flex gap-2">
                {" "}
                <button
                  className="text-sm items-center transition-transform duration-200 hover:scale-110"
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label={<Trash />}
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
