"use client";

import { oauthGithub } from "@/actions/appwrite/oauth";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaGithub } from "react-icons/fa6";

export default function GithubOauth() {
  const handleSignInGithub = () => {
    oauthGithub();
  };

  return (
    <Button type="button" onClick={handleSignInGithub} className="w-full py-4">
      <FaGithub className="mr-2" /> Signin with Github
    </Button>
  );
}
