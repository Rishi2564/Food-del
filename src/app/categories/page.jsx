"use client";
import UserTabs from "@/components/layout/UserTabs";

import { useProfile } from "@/components/useProfile";
const CategoriesPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile();
  if (profileLoading) {
    return "Loading user info";
  }
  if (!profileData.admin) {
    return "Not an Admin..";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" action="">
        <div className="flex gap-2">
          <div className="grow">
            {" "}
            <label htmlFor="">New Category Name</label>
            <input type="text" name="" id="" />
          </div>
          <div className="flex items-center mt-3">
            <button type="submit" className="bg-primary px-6">Create</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CategoriesPage;
