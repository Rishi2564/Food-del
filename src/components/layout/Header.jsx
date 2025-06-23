"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData= session.data?.user;
  let userName= userData?.name|| userData?.email;
  if(userName&&userName.includes(' ')){
    userName= userName.split(' ')[0];
  }
  return (
    <header className="flex items-center justify-between border border-transparent mt-2">
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
        <Link className="text-primary font-semibold text-2xl pl-3  transition-transform duration-200 hover:scale-110" href="/">
          ST PIZZA
        </Link>
        <Link className=" transition-transform duration-200 hover:scale-110" href={"/"}>Home</Link>
        <Link className=" transition-transform duration-200 hover:scale-110" href={""}>Menu</Link>
        <Link className=" transition-transform duration-200 hover:scale-110" href={""}>About</Link>
        <Link className=" transition-transform duration-200 hover:scale-110" href={""}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 mr-3 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
          <Link href={'/profile'} className="whitespace-nowrap  transition-transform duration-200 hover:scale-110">Hello,{' '}{userName}</Link>
            <button
              className="bg-primary submit rounded-full  text-white px-8 py-2  transition-transform duration-200 hover:scale-110"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            {" "}
            <Link href="/login">Login</Link>
            <Link
              href="/register"
              className="bg-primary rounded-full  text-white px-8 py-2  transition-transform duration-200 hover:scale-110"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
