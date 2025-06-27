"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";

const Header = () => {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const {cartProducts}= useContext(CartContext);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border border-transparent mt-2 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          className="text-primary font-bold text-2xl pl-3 transition-transform duration-200 hover:scale-110"
          href="/"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          ST PIZZA
        </Link>

        {/* Hamburger - small screens only */}
        <div className="md:hidden">
          <button
            className="text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Nav - hidden on mobile */}
        <nav className="hidden md:flex gap-8 text-gray-500 font-semibold items-center">
          <Link className="transition-transform duration-200 hover:scale-110" href="/">Home</Link>
          <Link className="transition-transform duration-200 hover:scale-110" href="/menu">Menu</Link>
          <Link className="transition-transform duration-200 hover:scale-110" href="/#about">About</Link>
          <Link className="transition-transform duration-200 hover:scale-110" href="/#contact">Contact</Link>
          {status === "authenticated" && (
            <>
              <Link href="/profile" className="whitespace-nowrap transition-transform duration-200 hover:scale-110">
                Hello, {userName}
              </Link>
              <button
                className="bg-primary submit rounded-full text-white px-6 py-2 transition-transform duration-200 hover:scale-110"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-primary rounded-full text-white px-6 py-2 transition-transform duration-200 hover:scale-110"
              >
                Register
              </Link>
            </>
          )}
          
            <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
          
        </nav>
      </div>

      {/* Mobile Nav - shown only when menuOpen */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 mt-4 text-gray-500 font-semibold">
          <Link onClick={() => setMenuOpen(false)} href="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} href="">Menu</Link>
          <Link onClick={() => setMenuOpen(false)} href="">About</Link>
          <Link onClick={() => setMenuOpen(false)} href="">Contact</Link>
          {status === "unauthenticated" && (
            <>
              <Link onClick={() => setMenuOpen(false)} href="/login">Login</Link>
              <Link
                onClick={() => setMenuOpen(false)}
                href="/register"
                className="bg-primary rounded-full text-white px-4 py-2 transition-transform duration-200 hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
           {status === "authenticated" && (
            <>
              <Link href="/profile" className="whitespace-nowrap transition-transform duration-200 hover:scale-110">
                Hello, {userName}
              </Link>
              <button
                className="bg-primary submit rounded-full  text-white px-8 py-2  transition-transform duration-200 hover:scale-110"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          )}
         
            <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
          
        </nav>
      )}
    </header>
  );
};

export default Header;
