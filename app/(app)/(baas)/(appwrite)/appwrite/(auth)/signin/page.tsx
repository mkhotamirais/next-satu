import React from "react";
import { SignInForm } from "./SignInForm";
import Link from "next/link";
import GithubOauth from "../GithubOauth";

export default function Signin() {
  return (
    <section className="max-w-md mx-auto my-18">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm">Enter your email and password</p>
      </div>
      <div className="mb-4">
        <GithubOauth />
      </div>
      <SignInForm />
      <p className="text-center mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/appwrite/signup" className="text-link">
          Sign up
        </Link>
      </p>
    </section>
  );
}
