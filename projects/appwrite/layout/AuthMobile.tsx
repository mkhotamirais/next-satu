"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useUser } from "../hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SheetClose } from "@/components/ui/sheet";

export default function AuthMobile() {
  const { user, loading } = useUser();
  let content = null;

  if (loading) content = null;

  if (user) {
    content = (
      <div>
        <div className="flex flex-col gap-1">
          <SheetClose asChild>
            <Button variant="outline" asChild>
              <Link href="/appwrite/account" className="justify-start block py-5">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="grayscale" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                Profile
              </Link>
            </Button>
          </SheetClose>
          {user.role === "admin" && (
            <SheetClose asChild>
              <Button asChild variant={"outline"}>
                <Link href="/appwrite/dashboard" className="justify-start">
                  Dashboard
                </Link>
              </Button>
            </SheetClose>
          )}
        </div>
        <Separator className="my-2" />
      </div>
    );
  } else
    content = (
      <div>
        <div className="flex flex-col gap-1">
          <SheetClose asChild>
            <Button variant={"secondary"} asChild>
              <Link href="/appwrite/signin" className="">
                Sign in
              </Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild>
              <Link href="/appwrite/signup" className="">
                Sign up
              </Link>
            </Button>
          </SheetClose>
        </div>
        <Separator className="my-2" />
      </div>
    );

  return <>{content}</>;
}
