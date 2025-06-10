"use client";
import {signIn} from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials",{email, password,callbackUrl:'/'});
    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          value={email}
          name="email"
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="email"
          disabled={loginInProgress}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          type="submit"
          className="bg-primary mt-3"
          disabled={loginInProgress}
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={()=>signIn('google', {callbackUrl:'/'})} className="flex items-center gap-2  justify-center">
          <Image src="/google.png" width={24} height={24} alt="" />
          Login with google
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
