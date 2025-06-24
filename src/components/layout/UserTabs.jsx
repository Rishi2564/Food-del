"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const UserTabs = ({ isAdmin }) => {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = (href) =>
    (path === href || path.includes(href)) ? "active" : "";

  return (
    <div className="px-4">
      {/* Hamburger for small screens */}
      <div className="hidden max-[425px]:block">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-2 text-center mb-4 md:hidden tabs">
          <Link className={linkClass("/profile")+" transition-transform duration-200 hover:scale-110"} href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          {isAdmin && (
            <>
              <Link className={linkClass("/categories")+" transition-transform duration-200 hover:scale-110"} href="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
              <Link className={linkClass("/menu-item")+" transition-transform duration-200 hover:scale-110"} href="/menu-items" onClick={() => setMenuOpen(false)}>Menu Items</Link>
              <Link className={linkClass("/users")+" transition-transform duration-200 hover:scale-110"} href="/users" onClick={() => setMenuOpen(false)}>Users</Link>
              <Link className={linkClass("/orders")+" transition-transform duration-200 hover:scale-110"} href="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
            </>
          )}
        </div>
      )}

      {/* Desktop Tabs */}
      <div className="hidden min-[426px]:flex gap-3 justify-center tabs">
        <Link className={linkClass("/profile")+" transition-transform duration-200 hover:scale-110"} href="/profile">Profile</Link>
        {isAdmin && (
          <>
            <Link className={linkClass("/categories")+" transition-transform duration-200 hover:scale-110"} href="/categories">Categories</Link>
            <Link className={linkClass("/menu-item")+" transition-transform duration-200 hover:scale-110"} href="/menu-items">Menu Items</Link>
            <Link className={linkClass("/users")+" transition-transform duration-200 hover:scale-110"} href="/users">Users</Link>
            <Link className={linkClass("/orders")+" transition-transform duration-200 hover:scale-110"} href="/orders">Orders</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserTabs;
