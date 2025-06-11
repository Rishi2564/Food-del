"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <div className="mt-10">
      <section>
        <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
        {userCreated && (
          <div className="my-4 text-center">
            User Created. Now you can{" "}
            <Link className="underline" href={"/login"}>
              {" "}
              Login &raquo;
            </Link>{" "}
            .
          </div>
        )}
        {error && (
          <div className="my-4 text-center">
            Error creating user. Please try again.
          </div>
        )}
        <form
          action=""
          className="block max-w-xs mx-auto "
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            placeholder="email"
            disabled={creatingUser}
            
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
            
          />
          <button
            type="submit"
            className="bg-primary mt-3"
            disabled={creatingUser}
          >
            Register
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button onClick={()=>signIn('google', {callbackUrl:'/'})} className="flex items-center gap-2  justify-center">
            <Image src="/google.png" width={24} height={24} alt="" />
            Login with google
          </button>
          <div className="text-center my-4 text-gray-500 border-t border-gray-300 pt-4">
            Existing account?{" "}
            <Link className="underline" href="/login">
              Login here &raquo;
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
