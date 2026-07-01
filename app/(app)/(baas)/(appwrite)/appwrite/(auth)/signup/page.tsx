import React from "react";
import Link from "next/link";
import { SignUpForm } from "./SignUpForm";
import GithubOauth from "../GithubOauth";

export default function Signin() {
  return (
    <section className="max-w-md mx-auto my-18">
      <div className="text-center space-y-2 mb-4">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm">Sign up to get started with our platform</p>
      </div>
      <div className="mb-4">
        <GithubOauth />
      </div>
      <SignUpForm />
      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/appwrite/signin" className="text-link">
          Sign in
        </Link>
      </p>
    </section>
  );
}
