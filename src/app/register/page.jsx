"use client";

import Image from "next/image";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
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
    <div>
      <section>
        <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
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
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
             disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <button type="submit" className="bg-primary"  disabled={creatingUser}>
            Register
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button className="flex items-center gap-2  justify-center">
            <Image src="/google.png" width={24} height={24} alt="" />
            Login with google
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
