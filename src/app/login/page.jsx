"use client";
import Image from "next/image";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" action="">
        <input
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="email"
          disabled={false}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={false}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <button type="submit" className="bg-primary mt-3" disabled={false}>
          Login
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
  );
};

export default LoginPage;
